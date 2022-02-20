import { createElement } from '../util/Util';
import { getGameBoxContent, getCommonBoxContent } from './dailyBuilder';

import './daily.scss';
import { getHiddenSvgs, getSvgs } from './imgBuilder';

export class DailyStatistics {
  commonBox: HTMLElement;

  gameBox: HTMLElement;

  private _root: HTMLElement;

  constructor(root: HTMLElement) {
    this._root = root;
    this.commonBox = createElement('div', ['statistics__daily-common-box', 'daily-common']);
    this.gameBox = createElement('div', ['statistics__daily-game-box']);
  }

  render(
    learnedWordsOverall: number,
    rightAnswerOverall: number,
    audio: { wordsLearned: number; rightAnswers: number; maxSequence: number },
    sprint: { wordsLearned: number; rightAnswers: number; maxSequence: number },
  ) {
    this.clear();
    const gameIcons = getSvgs();

    const audiocallBox = createElement('div', ['daily-stats__game_box', 'daily-audiocall']);
    const audioHeader = createElement('h3', ['daily-card__header'], [], 'Аудиовызов');
    audiocallBox.append(audioHeader, ...getGameBoxContent(audio), gameIcons[0]);

    const sprintBox = createElement('div', ['daily-stats__game_box', 'daily-sprint']);
    const sprintHeader = createElement('h3', ['daily-card__header'], [], 'Спринт');
    sprintBox.append(sprintHeader, ...getGameBoxContent(sprint), gameIcons[1]);

    this.commonBox.append(...getCommonBoxContent(learnedWordsOverall, rightAnswerOverall));
    this.gameBox.append(getHiddenSvgs());
    this.gameBox.append(audiocallBox, sprintBox);

    this._root.append(this.commonBox, this.gameBox);
  }

  clear() {
    this._root.replaceChildren();
    this.commonBox.replaceChildren();
    this.gameBox.replaceChildren();
  }
}
