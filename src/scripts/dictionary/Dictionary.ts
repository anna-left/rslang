import DictionaryView from "./DictionaryView";
import DictionaryModel from "./DictionaryModel";
import {WordsSettings} from "../sprint/SprintSettings";

class Dictionary {
  private readonly model: DictionaryModel;
  private readonly view: DictionaryView;
  private currentLevel: number;
  private currentPage: number;
  constructor() {
    this.model = new DictionaryModel();
    this.view = new DictionaryView('dictionary');
    this.currentLevel = 0;
    this.currentPage = 0;
  }

  async init() {
    const data = await this.model.fetchWords(0, 0);
    this.view.init(data);
    this.view.displayActiveWord();
    const root = document.querySelector('.main-box');
    root.innerHTML = '';
    root.append(this.view.render());
    window.addEventListener('dict-level',  async (event: CustomEvent) => {
      this.currentLevel = event.detail.id;
      this.currentPage = 0;
      this.view.deactivateCurrentLevel();
      this.view.activateDifficultyLevel(this.currentLevel);
      const data = await this.model.fetchWords(this.currentLevel, this.currentPage);
      this.view.updateData(data);
      this.view.activatePage(this.currentPage);
      if (this.currentLevel === WordsSettings.groups) {
        this.view.hidePagination();
      } else {
        this.view.showPagination();
      }
    })
    window.addEventListener('dict-page',  async (event: CustomEvent) => {
      this.currentPage = event.detail.page;
      const data = await this.model.fetchWords(this.currentLevel, this.currentPage);
      this.view.updateData(data);
      this.view.activatePage(this.currentPage);
    })
    window.addEventListener('page-to-left',  async () => {
      this.currentPage = this.currentPage ? this.currentPage - 1 : 0;
      const data = await this.model.fetchWords(this.currentLevel, this.currentPage);
      this.view.updateData(data);
      this.view.activatePage(this.currentPage);
    })
    window.addEventListener('page-to-right',  async () => {
      this.currentPage = this.currentPage === WordsSettings.pages - 1 ? this.currentPage : this.currentPage + 1;
      const data = await this.model.fetchWords(this.currentLevel, this.currentPage);
      this.view.updateData(data);
      this.view.activatePage(this.currentPage);
    })
    window.addEventListener('activate-word', (event: CustomEvent) => {
      this.view.deactivateCurrentWord();
      this.view.activateWord(event.detail.id);
      this.view.emptyActiveWord();
      this.view.displayActiveWord();
    })
  }
}

export default Dictionary;
