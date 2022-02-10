import {createHTMLElement} from "../../../utils/CommonFunctions";
import {SprintIntroText, WordsSettings} from "./SprintSettings";
import Page from "../../../view/games/Page";
import './SprintViewIntro.scss'

class SprintViewIntro extends Page {
  private readonly buttonsContainer: HTMLElement;
  constructor(className: string) {
    super(className);
    const clock = createHTMLElement('div', `${className}__clock`);
    const header = createHTMLElement('h2', `${className}__header`, SprintIntroText.header);
    const description = createHTMLElement('p', `${className}__description`, SprintIntroText.description);
    const selectLevel = createHTMLElement('div', `${className}__select-level`);
    const tooltip = createHTMLElement('h3', `${className}__tooltip`, SprintIntroText.tooltip);
    this.buttonsContainer = createHTMLElement('div', `${className}__buttons`);
    this.createButtons(className);
    selectLevel.append(tooltip, this.buttonsContainer);
    const start = createHTMLElement('button', `${className}__start button`, SprintIntroText.startButton);
    start.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('sprint-start'));
    })
    this.page.append(clock, header, description, selectLevel, start);
  }

  createButtons(className: string) {
    for (let i = 0; i < WordsSettings.groups; i += 1) {
      const button = createHTMLElement('button', `${className}__button button`, `${i + 1}`);
      button.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('sprint-group-select', {detail: `${i}`}));
      })
      this.buttonsContainer.append(button);
    }
  }
}

export default SprintViewIntro;
