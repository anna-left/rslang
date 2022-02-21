import { api } from '../app';
import { getUserIsAutorized } from './createArrayQuestions';
import { IOneDayStatistics, IGameStatistics, IGeneralStatistics, IUserStatistics, IUserWord } from '../types/types';

interface IAnswer {
  wordId: string;
  isRight: boolean;
  newWord?: boolean;
  knownWord?: boolean;
}

type TGameName = 'audiocall' | 'sprint';

async function writeStatistics(arrayWords: IAnswer[], gameName: TGameName, longestStreak: number) {
  const userIsAutorized = await getUserIsAutorized();
  if (!userIsAutorized) {
    return;
  }

  const userTokens = await api.getUserTokens;
  console.log(userTokens);
  // user/words
  const promises: Array<Promise<IUserWord | void>> = [];
  arrayWords.forEach((curWord) => {
    curWord.knownWord = false;
    const userWordAPI = api.getUserWord(curWord.wordId);
    promises.push(userWordAPI);
  });

  const answersAPI = await Promise.all(promises);
  arrayWords.forEach(async (curWord) => {
    const userWordAPI = answersAPI.find((item) => item && item.wordId === curWord.wordId);

    let countTowardsKnown = Number(curWord.isRight);
    let totalCountRight = Number(curWord.isRight);
    let totalCountWrong = curWord.isRight ? 0 : 1;
    if (userWordAPI) {
      curWord.newWord = false;
      if (userWordAPI.optional.totalCountRight !== undefined) {
        totalCountRight += userWordAPI.optional.totalCountRight;
        totalCountWrong += userWordAPI.optional.totalCountWrong;
        if (curWord.isRight) {
          countTowardsKnown += userWordAPI.optional.countTowardsKnown;
        } else {
          countTowardsKnown = 0;
        }
      }
      let difficulty = userWordAPI.difficulty;
      if (countTowardsKnown >= 3) {
        difficulty = 'known';
      } else if (!curWord.isRight && difficulty === 'known') {
        difficulty = 'unset';
      }
      if (difficulty === 'known') {
        curWord.knownWord = true;
      }
      await api.updateUserWord(curWord.wordId, {
        difficulty: difficulty,
        optional: {
          faced: 'yes',
          countTowardsKnown: countTowardsKnown,
          totalCountRight: totalCountRight,
          totalCountWrong: totalCountWrong,
        },
      });
    } else {
      curWord.newWord = true;
      await api.createUserWord(curWord.wordId, {
        difficulty: 'unset',
        optional: {
          faced: 'yes',
          countTowardsKnown: countTowardsKnown,
          totalCountRight: totalCountRight,
          totalCountWrong: totalCountWrong,
        },
      });
    }
  });

  // user statistics
  const curDate = new Date().toLocaleDateString();
  const userStatistics = await api.getUserStatistics();
  const newWordsCount = arrayWords.reduce((sum, curWord) => {
    let newSum = sum;
    return (newSum += Number(curWord.newWord));
  }, 0);
  const knownWordsCount = arrayWords.reduce((sum, curWord) => {
    let newSum = sum;
    return (newSum += Number(curWord.knownWord));
  }, 0);
  const rightWordsCount = arrayWords.reduce((sum, curWord) => {
    let newSum = sum;
    return (newSum += Number(curWord.isRight));
  }, 0);
  const wrongWordsCount = arrayWords.length - rightWordsCount;

  if (userStatistics) {
    const statistics: IOneDayStatistics[] = JSON.parse(userStatistics.optional.statistics);
    const registerCurDate = statistics.find((item) => item.date === curDate);
    //есть запись за эту дату
    if (registerCurDate) {
      const general = registerCurDate.general;
      general.newWordsCount += newWordsCount;
      general.knownWordsCount += knownWordsCount;
      general.rightWordsCount += rightWordsCount;
      general.wrongWordsCount += wrongWordsCount;
      if (gameName === 'audiocall') {
        const audiocall = registerCurDate.audiocall;
        audiocall.newWordsCount += newWordsCount;
        audiocall.longestStreak = Math.max(audiocall.longestStreak, longestStreak);
        audiocall.rightWordsCount += rightWordsCount;
        audiocall.wrongWordsCount += wrongWordsCount;
      } else {
        const sprint = registerCurDate.sprint;
        sprint.newWordsCount += newWordsCount;
        sprint.longestStreak = Math.max(registerCurDate.sprint.longestStreak, longestStreak);
        sprint.rightWordsCount += rightWordsCount;
        sprint.wrongWordsCount += wrongWordsCount;
      }
      const updateStatistics = {
        learnedWords: knownWordsCount,
        optional: { statistics: JSON.stringify(statistics) },
      };
      await api.updateUserStatistics(updateStatistics);
    } else {
      //нет записи за эту дату
      const general: IGeneralStatistics = {
        newWordsCount: newWordsCount,
        rightWordsCount: rightWordsCount,
        wrongWordsCount: wrongWordsCount,
        knownWordsCount: knownWordsCount,
      };
      const newRegisterCurDate: IOneDayStatistics = { date: curDate, general: general };
      const gameStatistics: IGameStatistics = {
        newWordsCount: newWordsCount,
        rightWordsCount: rightWordsCount,
        wrongWordsCount: wrongWordsCount,
        longestStreak: longestStreak,
      };
      if (gameName === 'audiocall') {
        newRegisterCurDate.audiocall = gameStatistics;
      } else {
        newRegisterCurDate.sprint = gameStatistics;
      }
      statistics.push(newRegisterCurDate);
      const updateStatistics = {
        learnedWords: knownWordsCount,
        optional: { statistics: JSON.stringify(statistics) },
      };
      await api.updateUserStatistics(updateStatistics);
    }
  } else {
    const generalStatistics: IGeneralStatistics = {
      newWordsCount: newWordsCount,
      rightWordsCount: rightWordsCount,
      wrongWordsCount: wrongWordsCount,
      knownWordsCount: knownWordsCount,
    };
    const dayStatistics: IOneDayStatistics = { date: curDate, general: generalStatistics };
    if (gameName === 'audiocall') {
      dayStatistics.audiocall = {
        newWordsCount: newWordsCount,
        rightWordsCount: rightWordsCount,
        wrongWordsCount: wrongWordsCount,
        longestStreak: longestStreak,
      };
    } else {
      dayStatistics.sprint = {
        newWordsCount: newWordsCount,
        rightWordsCount: rightWordsCount,
        wrongWordsCount: wrongWordsCount,
        longestStreak: longestStreak,
      };
    }
    const dayStatisticsArr = [dayStatistics];
    const statistics: IUserStatistics = {
      learnedWords: 1,
      optional: { statistics: JSON.stringify(dayStatisticsArr) },
    };
    await api.updateUserStatistics(statistics);
  }
}

export { IAnswer, writeStatistics };
