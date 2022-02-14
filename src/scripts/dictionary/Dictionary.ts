import DictionaryView from "./DictionaryView";
import DictionaryModel from "./DictionaryModel";
import {WordsSettings} from "../sprint/SprintSettings";
import Sprint from "../sprint/Sprint";

class Dictionary {
  private readonly model: DictionaryModel;
  private readonly view: DictionaryView;
  private currentLevel: number;
  private currentPage: number;
  private sprint: Sprint;
  constructor() {
    this.model = new DictionaryModel();
    this.view = new DictionaryView('dictionary');
    this.view.init()
    this.currentLevel = 0;
    this.currentPage = 0;
    this.sprint = null;
  }

  addSprint(sprint: Sprint) {
    this.sprint = sprint;
  }

  async init() {
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
    window.addEventListener('audiocall-dict-start', () => {
      // TODO start audiocall with level and page parameters
    })
    window.addEventListener('sprint-dict-start', () => {
      this.sprint.start(this.currentLevel, this.currentPage);
    })
  }

  async start(level = 0, page = 0) {
    this.currentLevel = level;
    this.currentPage = page;
    const data = await this.model.fetchWords(this.currentLevel, this.currentPage);
    this.view.activateDifficultyLevel(level);
    this.view.updateData(data);
    this.view.activatePage(this.currentPage);
    const root = document.querySelector('.main-box');
    root.innerHTML = '';
    root.append(this.view.render());
  }
}

export default Dictionary;
