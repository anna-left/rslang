import Page from "../sprint/Page";
import {createHTMLElement} from "../utils/CommonFunctions";
import {DictionaryDifficulty, DictionaryText} from "./DictionarySettings";
import {WordsSettings} from "../sprint/SprintSettings";
import DifficultyCard from "./DifficultyCard";
import './DictionaryView.scss';
import WordCard from "./WordCard";
import {IWordSchema} from "../types/types";
import SmallWordCard from "./SmallWordCard";
import ArrowButton from "../sprint/ArrowButton";
import Pagination from "./Pagination";

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
  private readonly paginationContainer: HTMLElement;
  private readonly pagination: Pagination;
  constructor(className: string) {
    super(className);
    this.className = className;
    this.data = [];
    this.difficultyCards = [];
    this.currentDifficultyLevel = 0;
    this.wordCards = [];
    this.currentWordId = 0;
    const levelsSection = createHTMLElement('div', `${this.className}__section`);
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

    this.paginationContainer = createHTMLElement('div', `${this.className}__pagination-container`);
    const arrowLeft = new ArrowButton(true, `${this.className}__left`, 'page-to-left');
    this.pagination = new Pagination(`pagination`, WordsSettings.pages);
    const arrowRight = new ArrowButton(false, `${this.className}__right`, 'page-to-right');
    this.paginationContainer.append(arrowLeft.render(), this.pagination.render(), arrowRight.render());

    const gamesSection = createHTMLElement('div', `${this.className}__section`);
    const gamesHeader = createHTMLElement('h2', `${this.className}__header`, DictionaryText.gamesHeader);
    const gamesContainer = createHTMLElement('div', `${this.className}__games-container`);
    const audioCall = createHTMLElement('div', `${this.className}__audiocall ${this.className}__game`);
    audioCall.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('audiocall-dict-start'));
    })
    const sprint = createHTMLElement('div', `${this.className}__sprint ${this.className}__game`);
    sprint.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('sprint-dict-start'));
    })
    gamesContainer.append(audioCall, sprint);
    gamesSection.append(gamesHeader, gamesContainer);

    const sprintHeader = createHTMLElement('h3', `${this.className}__game-header`, DictionaryText.sprint);
    const sprintText = createHTMLElement('h3', `${this.className}__game-desc`, DictionaryText.sprintDesc);
    sprint.append(sprintHeader, sprintText);

    const audioCallHeader = createHTMLElement('h3', `${this.className}__game-header`, DictionaryText.audioCall);
    const audioCallText = createHTMLElement('h3', `${this.className}__game-desc`, DictionaryText.audioCallDesc);
    audioCall.append(audioCallHeader, audioCallText);

    this.page.append(levelsSection, wordsSection, this.paginationContainer, gamesSection);
  }

  init() {
    this.createDifficultyLevels();
  }

  createDifficultyLevels() {
    const structure = DictionaryDifficulty;
    for (let i = 0; i <= WordsSettings.groups; i += 1) {
      const levelCard = new DifficultyCard(
        i,
        structure[i.toString() as keyof typeof DictionaryDifficulty].level,
        structure[i.toString() as keyof typeof DictionaryDifficulty].range,
        structure[i.toString() as keyof typeof DictionaryDifficulty].label,
        structure[i.toString() as keyof typeof DictionaryDifficulty].color)
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
      const card = new SmallWordCard(
        i,
        this.data[i],
        DictionaryDifficulty[this.currentDifficultyLevel.toString() as keyof typeof DictionaryDifficulty].color);
      this.wordsContainer.append(card.render());
      this.wordCards.push(card);
    }
  }

  displayActiveWord() {
    const currentWord = new WordCard(this.data[this.currentWordId]);
    this.currentWord.append(currentWord.render());
  }

  emptyActiveWord() {
    this.currentWord.innerHTML = '';
  }

  updateData(data: IWordSchema[]) {
    this.data = data;
    this.createWordsCards();
    this.currentWordId = 0;
    this.emptyActiveWord();
    if (data[0]) {
      this.activateWord(0);
      this.displayActiveWord();
    } else {
      this.wordsContainer.innerHTML = DictionaryText.noWords;
    }
  }

  hidePagination() {
    this.paginationContainer.classList.add('hidden');
  }

  showPagination() {
    this.paginationContainer.classList.remove('hidden');
  }

  activatePage(number: number) {
    this.pagination.deactivatePage();
    this.pagination.activatePage(number);
    this.pagination.collapseList();
    this.pagination.manageEllipsis();
  }

  cardMarkHard() {
    this.wordCards[this.currentWordId].render().classList.add('small-word-card--hard');
    (this.currentWord.firstChild as HTMLElement).classList.add(`word-card--hard`);
  }

  cardUnmarkHard() {
    this.wordCards[this.currentWordId].render().classList.remove('small-word-card--hard');
    (this.currentWord.firstChild as HTMLElement).classList.remove(`word-card--hard`);
  }

  cardMarkKnown() {
    this.wordCards[this.currentWordId].render().classList.add('small-word-card--known');
    (this.currentWord.firstChild as HTMLElement).classList.add(`word-card--known`);
  }

  cardUnmarkKnown() {
    this.wordCards[this.currentWordId].render().classList.remove('small-word-card--known');
    (this.currentWord.firstChild as HTMLElement).classList.remove(`word-card--known`);
  }
}

export default DictionaryView;