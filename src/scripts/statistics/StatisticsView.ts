import { createElement } from '../util/Util';
import { DailyStatistics } from './DailyStatistics';

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
    this.contentBox.append(...new DailyStatistics().render(learnedWordsOverall, rightAnswerOverall, audio, sprint));
    root.append(this.stats);
  }
}
