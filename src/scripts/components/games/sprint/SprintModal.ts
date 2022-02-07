import SprintModalHeader from "./SprintModalHeader";
import {createHTMLElement} from "../../../utils/CommonFunctions";

class SprintModal {
  private readonly header: SprintModalHeader;
  private readonly modal: HTMLElement;
  private readonly foreign: HTMLElement;
  private readonly translation: HTMLElement;
  private readonly separationLine: HTMLElement;
  private readonly wrongButton: HTMLElement;
  private readonly rightButton: HTMLElement;
  constructor() {
    this.modal = createHTMLElement('div', 'modal');
    this.header = new SprintModalHeader();
    const footer = createHTMLElement('div', 'modal__footer');
    this.foreign = createHTMLElement('div', 'modal__foreign', 'Hello, world!');
    this.translation = createHTMLElement('div', 'modal__translation', 'Привет, мир!');
    this.separationLine = createHTMLElement('div', 'modal__separation');
    const buttons = createHTMLElement('div', 'modal__buttons');
    this.wrongButton = createHTMLElement('button', 'modal__button modal__wrong', 'Неверно');
    this.wrongButton.addEventListener('click', ((ev: MouseEvent) => {
      window.dispatchEvent(new CustomEvent('sprint-wrong'));
    }))
    this.rightButton = createHTMLElement('button', 'modal__button modal__right', 'Верно');
    this.rightButton.addEventListener('click', ((ev: MouseEvent) => {
      window.dispatchEvent(new CustomEvent('sprint-right'));
    }))
    buttons.append(this.wrongButton, this.rightButton);
    footer.append(this.foreign, this.translation, this.separationLine, buttons);
    this.modal.append(this.header.render(), footer);
  }

  onLevelUp() {
    this.header.increaseLevel();
    this.header.onLevelChange();
  }

  onRightAnswer() {
    this.header.onRightAnswer();
    this.displaySign(true);
  }

  onWrongAnswer() {
    this.header.resetLevel();
    this.header.onLevelChange();
    this.displaySign(false);
  }

  updateWords(foreign: string, translation: string) {
    this.foreign.innerText = foreign;
    this.translation.innerText = translation;
  }

  displaySign(isRight: boolean) {
    const sings = ['modal__sign-wrong', 'modal__sign-right'];
    const sign = createHTMLElement('div', `modal__sign ${sings[Number(isRight)]}`);
    setTimeout(() => {
      sign.remove();
    }, 200);
    this.separationLine.append(sign);
  }

  render() {
    return this.modal;
  }
}

export default SprintModal;
