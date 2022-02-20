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

    statDailyLink.addEventListener('click', () => {
      new DailyStatistics(this.contentBox).render(
        0,
        0,
        { wordsLearned: 0, rightAnswers: 0, maxSequence: 0 },
        { wordsLearned: 0, rightAnswers: 0, maxSequence: 0 },
      );
    });
    statGeneralLink.addEventListener('click', () => {
      new GeneralStatistics(this.contentBox).render([10, 20, 30, 40, 15, 22, 43, 17]);
    });
    statNav.append(statDailyLink, statGeneralLink);

    this.stats.append(statNav, this.contentBox);
  }

  renderDaily(
    root: HTMLElement,
    learnedWordsOverall: number,
    rightAnswerOverall: number,
    audio: { wordsLearned: number; rightAnswers: number; maxSequence: number },
    sprint: { wordsLearned: number; rightAnswers: number; maxSequence: number },
  ) {
    root.replaceChildren();
    this.contentBox.replaceChildren();
    new DailyStatistics(this.contentBox).render(learnedWordsOverall, rightAnswerOverall, audio, sprint);
    root.append(this.stats);
  }
}
