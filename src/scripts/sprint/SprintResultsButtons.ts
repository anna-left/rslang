import { createHTMLElement } from '../utils/CommonFunctions';
import { SprintResultText } from './SprintSettings';
import './SprintResultsButtons.scss';
import Page from './Page';

class SprintResultsButtons extends Page {
  private readonly className: string;

  constructor() {
    super('results-buttons', 'div');
    this.className = 'results-buttons';
    const again = createHTMLElement('button', `${this.className}__again`, `${SprintResultText.again}`);
    again.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('sprint-again'));
    });
    const workbook = createHTMLElement('button', `${this.className}__workbook`, `${SprintResultText.workbook}`);
    workbook.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('sprint-workbook'));
    });
    this.page.append(again, workbook);
  }
}

export default SprintResultsButtons;
