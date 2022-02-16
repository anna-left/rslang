import DictionaryView from "./DictionaryView";
import DictionaryModel from "./DictionaryModel";
import {WordsSettings} from "../sprint/SprintSettings";
import Sprint from "../sprint/Sprint";
import {LocalStorage, SessionStorage} from "../state/StorageSettings";
import {IAggregatedWordSchema, IWordSchema} from "../types/types";

class Dictionary {
  private readonly model: DictionaryModel;
  private readonly view: DictionaryView;
  private currentLevel: number;
  private currentPage: number;
  private sprint: Sprint;
  private authorized: boolean;

  constructor() {
    this.model = new DictionaryModel();
    this.view = new DictionaryView('dictionary');
    this.view.init()
    this.currentLevel = 0;
    this.currentPage = 0;
    this.sprint = null;
    this.authorized = false;
    this.checkAuthorization();
  }

  addSprint(sprint: Sprint) {
    this.sprint = sprint;
  }

  checkAuthorization() {
    if (sessionStorage.getItem(SessionStorage.userData)) {
      this.authorized = true;
      this.view.authorizeView();
    } else {
      this.authorized = false;
      this.view.unAuthorizeView();
    }
  }

  async getWords(level: number, page: number) {
    return this.authorized ?
      await this.model.getUserWords(level, page) as IAggregatedWordSchema[] :
      await this.model.fetchWords(level, page) as IWordSchema[];
  }

  async init() {
    window.addEventListener('dict-level', async (event: CustomEvent) => {
      this.currentLevel = event.detail.id;
      this.currentPage = 0;
      this.view.deactivateCurrentLevel();
      this.view.activateDifficultyLevel(this.currentLevel);
      const data: IAggregatedWordSchema[] | IWordSchema[] = await this.getWords(this.currentLevel, this.currentPage);
      this.view.updateData(data);
      this.view.activatePage(this.currentPage);
      if (this.currentLevel === WordsSettings.groups) {
        this.view.hidePagination();
      } else {
        this.view.showPagination();
      }
    })
    window.addEventListener('dict-page', async (event: CustomEvent) => {
      this.currentPage = event.detail.page;
      const data: IAggregatedWordSchema[] | IWordSchema[] = await this.getWords(this.currentLevel, this.currentPage);
      this.view.updateData(data);
      this.view.activatePage(this.currentPage);
    })
    window.addEventListener('page-to-left', async () => {
      this.currentPage = this.currentPage ? this.currentPage - 1 : 0;
      const data: IAggregatedWordSchema[] | IWordSchema[] = await this.getWords(this.currentLevel, this.currentPage);
      this.view.updateData(data);
      this.view.activatePage(this.currentPage);
    })
    window.addEventListener('page-to-right', async () => {
      this.currentPage = this.currentPage === WordsSettings.pages - 1 ? this.currentPage : this.currentPage + 1;
      const data: IAggregatedWordSchema[] | IWordSchema[] = await this.getWords(this.currentLevel, this.currentPage);
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
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(LocalStorage.dictionaryDifficultyLevel, this.currentLevel.toString());
      localStorage.setItem(LocalStorage.dictionaryPageNumber, this.currentPage.toString());
    })
    window.addEventListener('mark-hard', (event: CustomEvent) => {
      if (event.detail.hard) {
        this.view.cardUnmarkHard();
      } else {
        this.view.cardMarkHard();
        this.view.cardUnmarkKnown();
      }
    })
    window.addEventListener('mark-known', (event: CustomEvent) => {
      if (event.detail.known) {
        this.view.cardUnmarkKnown();
      } else {
        this.view.cardMarkKnown();
        this.view.cardUnmarkHard();
      }
    })
    window.addEventListener('login', () => {
      this.view.authorizeView();
      this.authorized = true;
    })
    window.addEventListener('logout', () => {
      this.view.unAuthorizeView();
      this.authorized = false;
    })
  }

  async start() {
    const data: IAggregatedWordSchema[] | IWordSchema[] = await this.getWords(this.currentLevel, this.currentPage);
    this.view.deactivateCurrentLevel();
    this.view.activateDifficultyLevel(this.currentLevel);
    this.view.updateData(data);
    this.view.activatePage(this.currentPage);
    const root = document.querySelector('.main-box');
    root.innerHTML = '';
    root.append(this.view.render());
  }

  preSelectLevelAndPage(level: number, page: number) {
    this.currentLevel = level;
    this.currentPage = page;
  }
}

export default Dictionary;
