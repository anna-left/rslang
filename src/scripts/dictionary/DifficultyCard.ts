import Page from "../sprint/Page";
import './DifficultyCard.scss';
import {createHTMLElement} from "../utils/CommonFunctions";

class DifficultyCard extends Page {
  private readonly className: string;
  private readonly right: HTMLElement;
  private readonly level: HTMLElement;
  private readonly range: HTMLElement;
  private readonly modifier: string;
  constructor(id: number, level: string, range: string, label: string) {
    super('difficulty-card', 'div');
    this.className = 'difficulty-card';
    this.modifier = 'active';
    const left = createHTMLElement('div');
    this.level = createHTMLElement('p', `${this.className}__level`, level);
    this.range = createHTMLElement('p', `${this.className}__range`, range);
    left.append(this.level, this.range);
    this.right = createHTMLElement('div', `${this.className}__label`, label);
    this.page.append(left, this.right);
    this.page.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('dict-level', {detail: {id: id}}))
    })
  }

  activate() {
    this.page.classList.add(`${this.className}--${this.modifier}`);
  }

  deactivate() {
    this.page.classList.remove(`${this.className}--${this.modifier}`);
  }
}

export default DifficultyCard;
