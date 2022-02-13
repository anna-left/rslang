import Page from "../components/games/sprint/Page";
import {createHTMLElement} from "../utils/CommonFunctions";
import {DictionaryDifficulty, DictionaryText} from "../components/dictionary/DictionarySettings";
import {WordsSettings} from "../components/games/sprint/SprintSettings";
import DifficultyCard from "../components/dictionary/DifficultyCard";
import './DictionaryView.scss';
import WordCard from "../components/dictionary/WordCard";
import {IWordSchema} from "../types/types";
import SmallWordCard from "../components/dictionary/SmallWordCard";

class DictionaryView extends Page {
  private readonly className: string;
  private readonly levelsContainer: HTMLElement;
  private readonly wordsContainer: HTMLElement;
  private readonly currentWord: HTMLElement;
  private data: IWordSchema[];
  private difficultyCards: DifficultyCard[];
  private currentDifficultyLevel: number;
  private wordCards: SmallWordCard[];
  private currentWordId: number;
  constructor(className: string) {
    super(className);
    this.className = className;
    this.data = [];
    this.difficultyCards = [];
    this.currentDifficultyLevel = 0;
    this.wordCards = [];
    this.currentWordId = 0;
    const levelsSection = createHTMLElement('div', `${this.className}__section ${this.className}__section--first`);
    const header = createHTMLElement('h2', `${this.className}__header`, DictionaryText.header);
    const subheader = createHTMLElement('h3', `${this.className}__subheader`, DictionaryText.subheader);
    this.levelsContainer = createHTMLElement('div', `${this.className}__levels`);
    levelsSection.append(header, subheader, this.levelsContainer);

    const wordsSection = createHTMLElement('div', `${this.className}__section`);
    const wordHeader = createHTMLElement('h2', `${this.className}__header`, DictionaryText.wordHeader);
    const words = createHTMLElement('div', `${this.className}__all-words`);
    this.wordsContainer = createHTMLElement('div', `${this.className}__words`);
    this.currentWord = createHTMLElement('div', `${this.className}__word`);
    words.append(this.wordsContainer, this.currentWord);
    wordsSection.append(wordHeader, words);

    const pagination = createHTMLElement('div', `${this.className}__pagination`);
    const gamesSection = createHTMLElement('div', `${this.className}__section`);

    this.page.append(levelsSection, wordsSection, pagination, gamesSection);
  }

  init(data: IWordSchema[]) {
    this.data = data;
    this.createDifficultyLevels();
    this.createWordsCards();
    this.activateDifficultyLevel(0);
    this.activateWord(0);
  }

  createDifficultyLevels() {
    const structure = DictionaryDifficulty;
    for (let i = 0; i <= WordsSettings.groups; i += 1) {
      const levelCard = new DifficultyCard(
        i,
        structure[i.toString() as keyof typeof DictionaryDifficulty].level,
        structure[i.toString() as keyof typeof DictionaryDifficulty].range,
        structure[i.toString() as keyof typeof DictionaryDifficulty].label)
      this.difficultyCards.push(levelCard);
      this.levelsContainer.append(levelCard.render());
    }
  }

  activateDifficultyLevel(level: number) {
    this.currentDifficultyLevel = level;
    this.difficultyCards[level].activate();
  }

  deactivateCurrentLevel() {
    this.difficultyCards[this.currentDifficultyLevel].deactivate();
  }

  activateWord(id: number) {
    this.currentWordId = id;
    this.wordCards[id].activate();
  }

  deactivateCurrentWord() {
    this.wordCards[this.currentWordId].deactivate();
  }

  createWordsCards() {
    this.wordCards = [];
    this.wordsContainer.innerHTML = '';
    for (let i = 0; i < this.data.length; i += 1) {
      const card = new SmallWordCard(i, this.data[i]);
      this.wordsContainer.append(card.render());
      this.wordCards.push(card);
    }
  }

  displayActiveWord() {
    const currentWord = new WordCard(this.data[this.currentWordId]);
    this.currentWord.innerHTML = '';
    this.currentWord.append(currentWord.render());
  }

  updateData(data: IWordSchema[]) {
    this.data = data;
    this.createWordsCards();
    this.currentWordId = 0;
    this.activateWord(0);
    this.displayActiveWord();
  }
}

export default DictionaryView;
