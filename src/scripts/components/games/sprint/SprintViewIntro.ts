import {createHTMLElement} from "../../../utils/CommonFunctions";
import {SprintIntroText, WordsSettings} from "./SprintSettings";
import Page from "../../../view/games/Page";
import './SprintViewIntro.scss'

class SprintViewIntro extends Page {
  private readonly buttonsContainer: HTMLElement;
  private readonly selectLevel: HTMLElement;
  constructor(className: string) {
    super(className);
    const clock = createHTMLElement('div', `${className}__clock`);
    const header = createHTMLElement('h2', `${className}__header`, SprintIntroText.header);
    const description = createHTMLElement('p', `${className}__description`, SprintIntroText.description);
    this.selectLevel = createHTMLElement('div', `${className}__select-level`);
    const tooltip = createHTMLElement('h3', `${className}__tooltip`, SprintIntroText.tooltip);
    this.buttonsContainer = createHTMLElement('div', `${className}__buttons`);
    this.createButtons(className);
    this.selectLevel.append(tooltip, this.buttonsContainer);
    const start = createHTMLElement('button', `${className}__start button`, SprintIntroText.startButton);
    start.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('sprint-start'));
    })
    this.page.append(clock, header, description, this.selectLevel, start);
  }

  createButtons(className: string) {
    for (let i = 0; i < WordsSettings.groups; i += 1) {
      const button = createHTMLElement('button', `${className}__button button`, `${i + 1}`);
      button.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('sprint-group-select', {detail: {group: `${i}`}}));
      })
      this.buttonsContainer.append(button);
    }
  }

  disableLevelSelection() {
    this.selectLevel.classList.add('hide');
  }

  enableLevelSelection() {
    this.selectLevel.classList.remove('hide');
  }
}

export default SprintViewIntro;
