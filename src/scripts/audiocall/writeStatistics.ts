import { api } from '../app';
// import { IOneDayStatistics, IGeneralStatistics, IUserStatistics } from '../types/types';
import { IOneDayStatistics, IGeneralStatistics } from '../types/types';

interface IAnswer {
  wordId: string;
  isRight: boolean;
}

async function writeStatistics(arrayWords: IAnswer[], gameName = 'audiocall' || 'sprint') {
  arrayWords.forEach(async (item) => {
    // user/word
    const userWordAPI = await api.getUserWord(item.wordId);
    let totalCountRight = item.isRight ? 1 : 0;
    let totalCountWrong = item.isRight ? 0 : 1;
    let countTowardsKnown = item.isRight ? 1 : 0;
    if (userWordAPI) {
      console.log(userWordAPI);
      if (userWordAPI.optional.totalCountRight !== undefined) {
        totalCountRight += userWordAPI.optional.totalCountRight;
        totalCountWrong += userWordAPI.optional.totalCountWrong;
        if (item.isRight) {
          countTowardsKnown += userWordAPI.optional.countTowardsKnown;
        } else {
          countTowardsKnown = 0;
        }
      }
      let difficulty = userWordAPI.difficulty;
      if (countTowardsKnown >= 3) {
        difficulty = 'known';
      } else if (!item.isRight && difficulty === 'known') {
        difficulty = 'unset';
      }
      await api.updateUserWord(item.wordId, {
        difficulty: difficulty,
        optional: {
          faced: 'yes',
          countTowardsKnown: countTowardsKnown,
          totalCountRight: totalCountRight,
          totalCountWrong: totalCountWrong,
        },
      });
    } else {
      await api.createUserWord(item.wordId, {
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
  const curDate = new Date();
  const formDate = curDate.toLocaleDateString();
  // let userStatistics: void | IUserStatistics;
  // userStatistics = await api.getUserStatistics();
  // if (userStatistics) {
  //   console.log(userStatistics);
  // } else {
  const generalStatistics: IGeneralStatistics = { newWordsCount: 0, percentRight: 0, knownWordsCount: 0 };
  const dayStatistics: IOneDayStatistics = { date: formDate, general: generalStatistics };
  if (gameName === 'audiocall') {
    dayStatistics.audiocall = { newWordsCount: 0, percentRight: 0, longestStreak: 0 };
  } else {
    dayStatistics.sprint = { newWordsCount: 0, percentRight: 0, longestStreak: 0 };
  }
  await api.updateUserStatistics({
    learnedWords: 1,
    optional: { statistics: [dayStatistics] },
  });
  // }
}

export { IAnswer, writeStatistics };
