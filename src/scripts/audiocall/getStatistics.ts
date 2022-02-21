import { api } from '../app';
import { IOneDayStatistics, IGameStatistics, IGeneralStatistics } from '../types/types';

function getPercent(curGame: IGameStatistics | IGeneralStatistics) {
  let percent = 0;
  if (curGame.rightWordsCount) {
    percent = Math.round((100 * curGame.rightWordsCount) / (curGame.rightWordsCount + curGame.wrongWordsCount));
  }
  return percent;
}

async function getDailyGameStatistics() {
  const dailyStatistics = {
    newWordsCountAudiocall: 0,
    rightWordsPercentAudiocall: 0,
    longestStreakAudiocall: 0,
    newWordsCountSprint: 0,
    rightWordsPercentSprint: 0,
    longestStreakSprint: 0,
  };
  const curDate = new Date().toLocaleDateString();
  const userStatistics = await api.getUserStatistics();
  if (!userStatistics) {
    return dailyStatistics;
  }
  const statistics: IOneDayStatistics[] = JSON.parse(userStatistics.optional.statistics);
  const registerCurDate = statistics.find((item) => item.date === curDate);
  if (!registerCurDate) {
    return dailyStatistics;
  }

  const audiocall = registerCurDate.audiocall;
  if (audiocall) {
    dailyStatistics.newWordsCountAudiocall = audiocall.newWordsCount;
    dailyStatistics.rightWordsPercentAudiocall = getPercent(audiocall);
    dailyStatistics.longestStreakAudiocall = audiocall.longestStreak;
  }
  const sprint = registerCurDate.sprint;
  if (sprint) {
    dailyStatistics.newWordsCountSprint = sprint.newWordsCount;
    dailyStatistics.rightWordsPercentSprint = getPercent(sprint);
    dailyStatistics.longestStreakSprint = sprint.longestStreak;
  }
  return dailyStatistics;
}

async function getDailyStatistics() {
  const dailyStatistics = {
    newWordsCount: 0,
    knownWordsCount: 0,
    rightWordsPercent: 0,
  };
  const curDate = new Date().toLocaleDateString();
  const userStatistics = await api.getUserStatistics();
  if (!userStatistics) {
    return dailyStatistics;
  }
  const statistics: IOneDayStatistics[] = JSON.parse(userStatistics.optional.statistics);
  const registerCurDate = statistics.find((item) => item.date === curDate);
  if (!registerCurDate) {
    return dailyStatistics;
  }
  const general = registerCurDate.general;
  dailyStatistics.newWordsCount = general.newWordsCount;
  dailyStatistics.knownWordsCount = general.knownWordsCount;
  dailyStatistics.rightWordsPercent = getPercent(general);
  return dailyStatistics;
}

export { getDailyGameStatistics, getDailyStatistics };
