import { getDailyGameStatistics, getDailyStatistics } from '../audiocall/getStatistics';
import { createElement } from '../util/Util';
import { DailyStatistics } from './DailyStatistics';
import { GeneralStatistics } from './GeneralStatistics';

import './statistics.scss';

export class StatisticsView {
  root: HTMLElement;

  stats: HTMLElement;

  contentBox: HTMLElement;

  constructor() {
    this.stats = createElement('section', ['main-box__section', 'main-box__section_type_statistics', 'statistics']);
    this.contentBox = createElement('div', ['statistics__content_box', 'content-box']);

    const statNav = createElement('div', ['statistics__navigation_box']);
    const statDailyLink = createElement('span', ['statistics__navigation_link'], [], 'Статистика за сегодня');
    const statGeneralLink = createElement('span', ['statistics__navigation_link'], [], 'Статистика за все время');

    statDailyLink.addEventListener('click', async () => {
      const data = await getDailyStatistics();
      const gameData = await getDailyGameStatistics();
      const audioGameData = {
        newWordsLearned: gameData.newWordsCountAudiocall,
        rightAnswerNum: gameData.rightWordsPercentAudiocall,
        maxSequence: gameData.longestStreakAudiocall,
      };
      const sprintGameData = {
        newWordsLearned: gameData.newWordsCountSprint,
        rightAnswerNum: gameData.rightWordsPercentSprint,
        maxSequence: gameData.longestStreakSprint,
      };
      new DailyStatistics(this.contentBox).render(
        data.knownWordsCount,
        data.newWordsCount,
        data.rightWordsPercent,
        audioGameData,
        sprintGameData,
      );
    });
    statGeneralLink.addEventListener('click', () => {
      new GeneralStatistics(this.contentBox).render();
    });
    statNav.append(statDailyLink, statGeneralLink);

    this.stats.append(statNav, this.contentBox);
  }

  async renderDaily(root: HTMLElement) {
    root.replaceChildren();
    const data = await getDailyStatistics();
    const gameData = await getDailyGameStatistics();
    const audioGameData = {
      newWordsLearned: gameData.newWordsCountAudiocall,
      rightAnswerNum: gameData.rightWordsPercentAudiocall,
      maxSequence: gameData.longestStreakAudiocall,
    };
    const sprintGameData = {
      newWordsLearned: gameData.newWordsCountSprint,
      rightAnswerNum: gameData.rightWordsPercentSprint,
      maxSequence: gameData.longestStreakSprint,
    };
    this.contentBox.replaceChildren();
    new DailyStatistics(this.contentBox).render(
      data.knownWordsCount,
      data.newWordsCount,
      data.rightWordsPercent,
      audioGameData,
      sprintGameData,
    );
    root.append(this.stats);
  }
}
