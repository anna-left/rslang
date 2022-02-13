import Page from "../games/sprint/Page";
import {IWordSchema} from "../../types/types";
import {createHTMLElement, removeTags} from "../../utils/CommonFunctions";
import {WordsSettings} from "../games/sprint/SprintSettings";
import {DictionaryText} from "./DictionarySettings";
import './WordCard.scss';

class WordCard extends Page {
  private readonly className: string;
  constructor(word: IWordSchema) {
    super('word-card');
    this.className = 'word-card';
    const image = createHTMLElement('img', `${this.className}__img`);
    image.setAttribute('src', WordsSettings.endpoint + word.image);
    const header = createHTMLElement('h2', `${this.className}__header`, word.word);
    const line  = createHTMLElement('div', `${this.className}__line`);
    const translation = createHTMLElement('span', `${this.className}__translation`, word.wordTranslate);
    const transcription = createHTMLElement('span', `${this.className}__transcription`,  word.transcription);
    const audio = createHTMLElement('button', `${this.className}__audio`);
    audio.addEventListener('click', () => {
      new Audio(WordsSettings.endpoint + word.audio).play();
    })
    line.append(translation, transcription, audio);
    const subheader = createHTMLElement('h3', `${this.className}__subheader`, DictionaryText.example);
    const container = createHTMLElement('div', `${this.className}__text`);
    const meaning = createHTMLElement('p', `${this.className}__meaning`, removeTags(word.textMeaning));
    const meaningTranslate = createHTMLElement('p', `${this.className}__meaning--translate`, removeTags(word.textMeaningTranslate));
    const example = createHTMLElement('p', `${this.className}__example`, removeTags(word.textExample));
    const exampleTranslate = createHTMLElement('p', `${this.className}__example--translate`, removeTags(word.textExampleTranslate));
    container.append(meaning, meaningTranslate, example, exampleTranslate);
    this.page.append(image, header, line, subheader, container);
  }
}

export default WordCard;
