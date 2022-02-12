import Page from "./Page";
import {createHTMLElement} from "../../../utils/CommonFunctions";
import {TResultWord} from "../../../types/types";
import './SprintWordLine.scss';
import {SprintSettings, WordsSettings} from "./SprintSettings";

class SprintWordLine extends Page{
  constructor(className: string, word: TResultWord) {
    super(className, 'div')
    const speakButton = createHTMLElement('button', 'play-word');
    const englishWord = createHTMLElement('span', 'english-word', word.word);
    const translation = createHTMLElement('span', 'translation', ` - ${word.wordTranslate}`);
    speakButton.addEventListener('click', () => {
      new Audio(`${WordsSettings.endpoint}${word.audio}`).play();
    })
    this.page.append(speakButton, englishWord, translation);
  }
}

export default SprintWordLine;