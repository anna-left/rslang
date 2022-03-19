import SprintGameDisplay from './SprintGameDisplay';
import { createHTMLElement } from '../utils/CommonFunctions';
import Page from './Page';
import SprintGameControls from './SprintGameControls';
import './SprintViewGame.scss';

class SprintViewGame extends Page {
  private readonly display: SprintGameDisplay;

  private readonly foreign: HTMLElement;

  private readonly translation: HTMLElement;

  private readonly invisibleLine: HTMLElement;

  private readonly className: string;

  constructor(className: string) {
    super(className);
    this.className = className;
    this.display = new SprintGameDisplay(className);
    const controls = new SprintGameControls(className);
    this.foreign = createHTMLElement('div', `${this.className}__foreign`);
    this.translation = createHTMLElement('div', `${this.className}__translation`);
    this.invisibleLine = createHTMLElement('div', `${this.className}__separation`);
    this.page.append(this.display.render(), this.foreign, this.translation, this.invisibleLine, controls.render());
  }

  onLevelUp() {
    this.display.increaseLevel();
    this.display.onLevelChange();
  }

  onRightAnswer() {
    this.display.onRightAnswer();
    this.displaySign(true);
  }

  onWrongAnswer() {
    this.display.resetLevel();
    this.display.onLevelChange();
    this.displaySign(false);
  }

  updateWords(foreign: string, translation: string) {
    this.foreign.innerText = foreign;
    this.translation.innerText = translation;
  }

  updateScore(score: number) {
    this.display.updateScore(score);
  }

  displaySign(isRight: boolean) {
    const sings = [`${this.className}__sign-wrong`, `${this.className}__sign-right`];
    const sign = createHTMLElement('div', `${this.className}__sign ${sings[Number(isRight)]}`);
    setTimeout(() => {
      sign.remove();
    }, 300);
    this.invisibleLine.append(sign);
  }

  startTimer() {
    this.display.startTimer();
  }

  clearTimer() {
    this.display.clearTimer();
  }
}

export default SprintViewGame;
