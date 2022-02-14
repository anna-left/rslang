import {createHTMLElement} from "../utils/CommonFunctions";
import {SprintGameText} from "./SprintSettings";
import './SprintGameControls.scss';

class SprintGameControls {
  private readonly className: string;
  private readonly buttons: HTMLElement;
  constructor(className: string) {
    this.className = `${className}-controls`;
    this.buttons = createHTMLElement('div', `${this.className}`);
    const leftContainer = createHTMLElement('div', `${this.className}__button-container`);
    const wrongButton = createHTMLElement('button', `${this.className}__button ${this.className}__wrong`, `${SprintGameText.wrong}`);
    wrongButton.addEventListener('click', (() => {
      window.dispatchEvent(new CustomEvent('sprint-wrong'));
    }))
    const leftSign = createHTMLElement('div', `${this.className}__info-button ${this.className}__info-left`);
    leftContainer.append(wrongButton, leftSign);

    const rightContainer = createHTMLElement('div', `${this.className}__button-container`);
    const rightButton = createHTMLElement('button', `${this.className}__button ${this.className}__right`, `${SprintGameText.right}`);
    rightButton.addEventListener('click', (() => {
      window.dispatchEvent(new CustomEvent('sprint-right'));
    }))
    const rightSign = createHTMLElement('div', `${this.className}__info-button ${this.className}__info-right`);
    rightContainer.append(rightButton, rightSign);

    this.buttons.append(leftContainer, rightContainer);
  }

  render() {
    return this.buttons;
  }
}

export default SprintGameControls;
