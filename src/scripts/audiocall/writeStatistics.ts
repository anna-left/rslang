import { api } from '../app';
// import { IOneDayStatistics, IGeneralStatistics, IUserStatistics } from '../types/types';
import { IOneDayStatistics, IGeneralStatistics, IUserStatistics } from '../types/types';
// import { words } from './startRound';

interface IAnswer {
  wordId: string;
  isRight: boolean;
  newWord?: boolean;
  knownWord?: boolean;
}

type TGameName = 'audiocall' | 'sprint';

// async function writeUserWords(arrayWords: IAnswer[]) {
//   arrayWords.forEach(async (curWord) => {
//     // user/word
//     curWord.knownWord = false;
//     const userWordAPI = await api.getUserWord(curWord.wordId);
//     let countTowardsKnown = Number(curWord.isRight);
//     let totalCountRight = Number(curWord.isRight);
//     let totalCountWrong = curWord.isRight ? 0 : 1;

//     if (userWordAPI) {
//       console.log(userWordAPI);
//       curWord.newWord = false;
//       if (userWordAPI.optional.totalCountRight !== undefined) {
//         totalCountRight += userWordAPI.optional.totalCountRight;
//         totalCountWrong += userWordAPI.optional.totalCountWrong;
//         if (curWord.isRight) {
//           countTowardsKnown += userWordAPI.optional.countTowardsKnown;
//         } else {
//           countTowardsKnown = 0;
//         }
//       }
//       let difficulty = userWordAPI.difficulty;
//       if (countTowardsKnown >= 3) {
//         difficulty = 'known';
//       } else if (!curWord.isRight && difficulty === 'known') {
//         difficulty = 'unset';
//       }
//       if (difficulty === 'known') {
//         curWord.knownWord = true;
//       }
//       await api.updateUserWord(curWord.wordId, {
//         difficulty: difficulty,
//         optional: {
//           faced: 'yes',
//           countTowardsKnown: countTowardsKnown,
//           totalCountRight: totalCountRight,
//           totalCountWrong: totalCountWrong,
//         },
//       });
//     } else {
//       curWord.newWord = true;
//       await api.createUserWord(curWord.wordId, {
//         difficulty: 'unset',
//         optional: {
//           faced: 'yes',
//           countTowardsKnown: countTowardsKnown,
//           totalCountRight: totalCountRight,
//           totalCountWrong: totalCountWrong,
//         },
//       });
//     }
//   });
//   return arrayWords;
// }

async function writeStatistics(arrayWords: IAnswer[], gameName: TGameName, longestStreak: number) {
  // word statistics
  // let totalCountRight = 0;
  // let totalCountWrong = 0;
  // let countTowardsKnown = 0;
  // const newArrayWords: IAnswer[] = await writeUserWords(arrayWords);
  const promises = [];
  arrayWords.forEach(async (curWord) => {
    // user/word
    curWord.knownWord = false;
    const userWordAPI = await api.getUserWord(curWord.wordId);
    let countTowardsKnown = Number(curWord.isRight);
    let totalCountRight = Number(curWord.isRight);
    let totalCountWrong = curWord.isRight ? 0 : 1;

    if (userWordAPI) {
      console.log(userWordAPI);
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
      const promise = await api.updateUserWord(curWord.wordId, {
        difficulty: difficulty,
        optional: {
          faced: 'yes',
          countTowardsKnown: countTowardsKnown,
          totalCountRight: totalCountRight,
          totalCountWrong: totalCountWrong,
        },
      });
      promises.push(promise);
    } else {
      curWord.newWord = true;
      const promise = await api.createUserWord(curWord.wordId, {
        difficulty: 'unset',
        optional: {
          faced: 'yes',
          countTowardsKnown: countTowardsKnown,
          totalCountRight: totalCountRight,
          totalCountWrong: totalCountWrong,
        },
      });
      promises.push(promise);
    }
  });
  const result = await Promise.all(promises);
  console.log(result);
  // arrayWords.forEach(async (item) => {
  //   // user/word
  //   item.knownWord = false;
  //   const userWordAPI = await api.getUserWord(item.wordId);
  //   totalCountRight += Number(item.isRight);
  //   totalCountWrong += item.isRight ? 0 : 1;

  //   if (userWordAPI) {
  //     console.log(userWordAPI);
  //     item.newWord = true;
  //     if (userWordAPI.optional.totalCountRight !== undefined) {
  //       totalCountRight += userWordAPI.optional.totalCountRight;
  //       totalCountWrong += userWordAPI.optional.totalCountWrong;
  //       if (item.isRight) {
  //         countTowardsKnown += userWordAPI.optional.countTowardsKnown;
  //       } else {
  //         countTowardsKnown = 0;
  //       }
  //     }
  //     let difficulty = userWordAPI.difficulty;
  //     if (countTowardsKnown >= 3) {
  //       difficulty = 'known';
  //     } else if (!item.isRight && difficulty === 'known') {
  //       difficulty = 'unset';
  //     }
  //     if (difficulty === 'known') {
  //       item.knownWord = true;
  //     }
  //     await api.updateUserWord(item.wordId, {
  //       difficulty: difficulty,
  //       optional: {
  //         faced: 'yes',
  //         countTowardsKnown: countTowardsKnown,
  //         totalCountRight: totalCountRight,
  //         totalCountWrong: totalCountWrong,
  //       },
  //     });
  //   } else {
  //     item.newWord = false;
  //     await api.createUserWord(item.wordId, {
  //       difficulty: 'unset',
  //       optional: {
  //         faced: 'yes',
  //         countTowardsKnown: countTowardsKnown,
  //         totalCountRight: totalCountRight,
  //         totalCountWrong: totalCountWrong,
  //       },
  //     });
  //   }
  // });
  // if (arrayWords) {
  //   return;
  // }

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
    console.log(userStatistics);
    const statistics: IOneDayStatistics[] = JSON.parse(userStatistics.optional.statistics);
    console.log(statistics);

    const registerCurDate = statistics.find((item) => item.date === curDate);
    console.log(registerCurDate);

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

        const updateStatistics = {
          learnedWords: knownWordsCount,
          optional: { statistics: JSON.stringify(statistics) },
        };
        await api.updateUserStatistics(updateStatistics);
      } else {
        registerCurDate.sprint.newWordsCount += newWordsCount;
        registerCurDate.sprint.longestStreak = Math.max(registerCurDate.sprint.longestStreak, longestStreak);
        registerCurDate.sprint.rightWordsCount += rightWordsCount;
        registerCurDate.sprint.wrongWordsCount += wrongWordsCount;
      }
    } else {
      // registerCurDate = { date: curDate, general: generalStatistics };
      // statistics.push();
    }
    await api.updateUserStatistics(userStatistics);
    // const gameRegister = register[gameName];
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
