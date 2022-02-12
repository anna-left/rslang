import Page from "./Page";
import {createHTMLElement} from "../../../utils/CommonFunctions";
import {BadResult, GoodResult, GreatResult, SprintResultText} from "./SprintSettings";
import './SprintViewResults.scss';
import ProgressRing from "./ProgressRing";
import SprintResultsButtons from "./SprintResultsButtons";
import ArrowButton from "./ArrowButton";

class SprintViewResults extends Page {
  private readonly className: string;
  private readonly result: HTMLElement;
  private readonly progressRing: ProgressRing;
  private readonly header: HTMLElement;
  constructor(className: string) {
    super(className);
    this.className = `${className}`
    this.header = createHTMLElement('h2', `${this.className}__header`);
    const forwardButton = new ArrowButton(false, `${this.className}__forward`, 'sprint-forward');
    this.result = createHTMLElement('p', `${this.className}__result`);
    this.progressRing = new ProgressRing('--progressRadius', '--timerBorderThickness', `${this.className}__progress`);
    const buttons = new SprintResultsButtons().render();
    this.page.append(this.header, forwardButton.render(), this.result, this.progressRing.render(),buttons);
  }

  showResults(learned: number, toLearn: number) {
    const percent = Math.round(learned / (learned + toLearn) * 100) || 0;
    this.result.innerText =  `${SprintResultText.learned} ${learned}, ${SprintResultText.toLearn} ${toLearn}`;
    this.progressRing.update(percent, SprintResultText.percentage);
    if (percent / 100 > 0.5) {
      this.header.innerText = GreatResult.congratulation;
    } else if (percent / 100 > 0.25) {
      this.header.innerText = GoodResult.congratulation;
    } else {
      this.header.innerText = BadResult.congratulation;
    }
  }
}

export default SprintViewResults;
