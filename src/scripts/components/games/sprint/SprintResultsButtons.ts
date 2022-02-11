import {createHTMLElement} from "../../../utils/CommonFunctions";
import {SprintResultText} from "./SprintSettings";

class SprintResultsButtons {
  private readonly buttons: HTMLElement;
  private readonly className: string;
  constructor() {
    this.className = 'results-buttons';
    this.buttons = createHTMLElement('div', `${this.className}__buttons`);
    const again = createHTMLElement('button', `${this.className}__again`, `${SprintResultText.again}`);
    again.addEventListener('click', ()=> {
      window.dispatchEvent(new CustomEvent('sprint-again'));
    })
    const workbook = createHTMLElement('button', `${this.className}__workbook`, `${SprintResultText.workbook}`);
    workbook.addEventListener('click', ()=> {
      window.dispatchEvent(new CustomEvent('sprint-workbook'));
    })
    this.buttons.append(again, workbook);
  }

  render() {
    return this.buttons;
  }
}

export default SprintResultsButtons;