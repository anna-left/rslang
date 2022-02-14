import Page from "../sprint/Page";
import {createHTMLElement} from "../utils/CommonFunctions";
import {IWordSchema} from "../types/types";
import './SmallWordCard.scss';

class SmallWordCard extends Page {
  private readonly className: string;
  private readonly word: HTMLElement;
  private readonly translation: HTMLElement;
  private readonly modifier: string;
  constructor(id: number, word: IWordSchema) {
    super('small-word-card');
    this.className = 'small-word-card';
    this.modifier = 'active';
    this.word = createHTMLElement('p', `${this.className}__word`, word.word);
    this.translation = createHTMLElement('p', `${this.className}__translation`, word.wordTranslate);
    this.page.append(this.word, this.translation);
    this.page.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('activate-word', {detail: {id: id}}));
    })
  }

  activate() {
    this.page.classList.add(`${this.className}--${this.modifier}`);
  }

  deactivate() {
    this.page.classList.remove(`${this.className}--${this.modifier}`);
  }

}

export default SmallWordCard;
