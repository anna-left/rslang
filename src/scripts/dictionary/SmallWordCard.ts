import Page from '../sprint/Page';
import { createHTMLElement } from '../utils/CommonFunctions';
import { IAggregatedWordSchema, IWordSchema } from '../types/types';
import './SmallWordCard.scss';

class SmallWordCard extends Page {
  private readonly className: string;

  private readonly word: HTMLElement;

  private readonly translation: HTMLElement;

  private readonly modifier: string;

  private readonly color: string;

  constructor(id: number, word: IWordSchema | IAggregatedWordSchema, color: string) {
    super('small-word-card');
    this.className = 'small-word-card';
    this.modifier = 'active';
    this.color = color;
    this.word = createHTMLElement('p', `${this.className}__word`, word.word);
    this.translation = createHTMLElement('p', `${this.className}__translation`, word.wordTranslate);
    const additionalInfoBox = createHTMLElement('div', `${this.className}__info`, '?');
    const additionalInfo = createHTMLElement('div', `${this.className}__info--text`);
    this.addInfo(additionalInfo, word);
    additionalInfoBox.append(additionalInfo);
    this.page.append(this.word, this.translation, additionalInfoBox);
    this.page.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('activate-word', { detail: { id: id } }));
    });
    this.page.style.backgroundColor = color;
  }

  activate() {
    this.page.classList.add(`${this.className}--${this.modifier}`);
    this.page.style.backgroundColor = '';
  }

  deactivate() {
    this.page.classList.remove(`${this.className}--${this.modifier}`);
    this.page.style.backgroundColor = this.color;
  }

  addInfo(element: HTMLElement, word: IAggregatedWordSchema) {
    element.innerHTML = `Угадано: ${word.userWord?.optional?.totalCountRight || 0}<br>
                         Ошибок: ${word.userWord?.optional?.totalCountWrong || 0}`;
  }
}

export default SmallWordCard;
