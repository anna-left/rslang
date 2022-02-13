import Page from "./Page";
import {createHTMLElement} from "../utils/CommonFunctions";
import {SprintResultText} from "./SprintSettings";
import SprintResultsButtons from "./SprintResultsButtons";
import './SprintViewShowWords.scss';
import {ISprintWord} from "../types/types";
import SprintWordLine from "./SprintWordLine";
import ArrowButton from "./ArrowButton";

class SprintViewShowWords extends Page {
  private readonly className: string;
  private readonly wrongContainer: HTMLElement;
  private readonly rightContainer: HTMLElement;
  private readonly wrongCount: HTMLElement;
  private readonly rightCount: HTMLElement;
  constructor(className: string) {
    super(className);
    this.className = `${className}`
    const backwardButton = new ArrowButton(true, `${this.className}__backward`, 'sprint-backward');
    const container = createHTMLElement('div', `${this.className}__container`);
    const wrong = createHTMLElement('h3', `${this.className}__subheader`, SprintResultText.subheaderWrong);
    this.wrongCount = createHTMLElement('div', 'word__count word__count--wrong');
    wrong.append(this.wrongCount);
    this.wrongContainer = createHTMLElement('div', `${this.className}__wrong-container`);
    const delimiter = createHTMLElement('div', `${this.className}__delimiter`);
    const right = createHTMLElement('h3', `${this.className}__subheader`, SprintResultText.subheaderRight);
    this.rightCount = createHTMLElement('div', 'word__count word__count--right');
    right.append(this.rightCount);
    this.rightContainer = createHTMLElement('div', `${this.className}__right-container`);
    container.append(wrong,this.wrongContainer, delimiter, right, this.rightContainer);
    const buttons = new SprintResultsButtons().render();
    this.page.append(backwardButton.render(), container, buttons);
  }

  showResults(rightWords: ISprintWord[], wrongWords: ISprintWord[]) {
    rightWords.forEach(word => {
      this.rightContainer.append(new SprintWordLine('word__info', word).render());
    })
    this.rightCount.innerText = `${rightWords.length}`;
    wrongWords.forEach(word => {
      this.wrongContainer.append(new SprintWordLine('word__info', word).render());
    })
    this.wrongCount.innerText = `${wrongWords.length}`;
  }
}

export default SprintViewShowWords;
