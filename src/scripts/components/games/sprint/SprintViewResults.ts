import Page from "../../../view/games/Page";
import {createHTMLElement} from "../../../utils/CommonFunctions";
import {SprintResultText} from "./SprintSettings";
import './SprintViewResults.scss';
import ProgressRing from "./ProgressRing";

class SprintViewResults extends Page {
  private readonly className: string;
  private readonly result: HTMLElement;
  private readonly progressRing: ProgressRing;
  constructor(className: string) {
    super(className);
    this.className = `${className}`
    const header = createHTMLElement('h2', `${this.className}__header`, SprintResultText.header);
    const forwardButton = createHTMLElement('button', `${this.className}__forward`, '🡢');
    forwardButton.addEventListener('click', ()=> {
      window.dispatchEvent(new CustomEvent('sprint-forward'));
    })
    this.result = createHTMLElement('p', `${this.className}__result`);
    this.progressRing = new ProgressRing('--progressRadius', '--timerBorderThickness', `${this.className}__progress`);
    const buttons = createHTMLElement('div', `${this.className}__buttons`);
    const again = createHTMLElement('button', `${this.className}__again`, `${SprintResultText.again}`);
    again.addEventListener('click', ()=> {
      window.dispatchEvent(new CustomEvent('sprint-again'));
    })
    const workbook = createHTMLElement('button', `${this.className}__workbook`, `${SprintResultText.workbook}`);
    workbook.addEventListener('click', ()=> {
      window.dispatchEvent(new CustomEvent('sprint-workbook'));
    })
    buttons.append(again, workbook);
    this.page.append(header, forwardButton, this.result, this.progressRing.render(),buttons);
  }

  showResults(learned: number, toLearn: number) {
    const percent = Math.round(learned / (learned + toLearn) * 100) || 0;
    this.result.innerText =  `${learned} ${SprintResultText.learned}, ${toLearn} ${SprintResultText.toLearn}`;
    this.progressRing.update(percent, SprintResultText.percentage)
  }
}

export default SprintViewResults;
