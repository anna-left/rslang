import DictionaryView from './DictionaryView';
import DictionaryModel from './DictionaryModel';
import { WordsSettings } from '../sprint/SprintSettings';
import Sprint from '../sprint/Sprint';
import { LocalStorage } from '../state/StorageSettings';
import { IAggregatedWordSchema, IWordSchema } from '../types/types';
import { startAudiocall } from '../audiocall/startAudiocall';
import API from '../api/API';

class Dictionary {
  private readonly model: DictionaryModel;

  private readonly view: DictionaryView;

  private currentLevel: number;

  private currentPage: number;

  private sprint: Sprint;

  private authorized: boolean;

  private static _instance: Dictionary;

  constructor(api: API) {
    if (Dictionary._instance) {
      return Dictionary._instance;
    }
    Dictionary._instance = this;
    this.model = new DictionaryModel(api);
    this.view = new DictionaryView('dictionary');
    this.view.init();
    this.currentLevel = 0;
    this.currentPage = 0;
    this.sprint = null;
    this.authorized = false;
  }

  addSprint(sprint: Sprint) {
    this.sprint = sprint;
  }

  async setAuthorizationLevel() {
    this.authorized = await this.model.checkAuthorizationStatus();
    if (this.authorized) {
      this.view.authorizeView();
    } else {
      this.view.unAuthorizeView();
    }
  }

  async getWords(level: number, page: number) {
    if (this.authorized && level === WordsSettings.groups) {
      return (await this.model.getAllUserWords()) as IAggregatedWordSchema[];
    }
    return this.authorized
      ? ((await this.model.getUserWords(level, page)) as IAggregatedWordSchema[])
      : ((await this.model.fetchWords(level, page)) as IWordSchema[]);
  }

  async init() {
    window.addEventListener('dict-level', async (event: CustomEvent) => {
      this.currentLevel = event.detail.id;
      this.currentPage = 0;
      this.view.deactivateLevel();
      this.view.activateLevel(this.currentLevel);
      const data: IAggregatedWordSchema[] | IWordSchema[] = await this.getWords(this.currentLevel, this.currentPage);
      this.view.updateData(data);
      this.view.activatePage(this.currentPage);
      if (this.currentLevel === WordsSettings.groups) {
        this.view.hidePagination();
      } else {
        this.view.showPagination();
      }
    });
    window.addEventListener('dict-page', async (event: CustomEvent) => {
      this.currentPage = event.detail.page;
      const data: IAggregatedWordSchema[] | IWordSchema[] = await this.getWords(this.currentLevel, this.currentPage);
      this.view.activatePage(this.currentPage);
      this.view.updateData(data);
    });
    window.addEventListener('page-to-left', async () => {
      this.currentPage = this.currentPage ? this.currentPage - 1 : 0;
      const data: IAggregatedWordSchema[] | IWordSchema[] = await this.getWords(this.currentLevel, this.currentPage);
      this.view.activatePage(this.currentPage);
      this.view.updateData(data);
    });
    window.addEventListener('page-to-right', async () => {
      this.currentPage = this.currentPage === WordsSettings.pages - 1 ? this.currentPage : this.currentPage + 1;
      const data: IAggregatedWordSchema[] | IWordSchema[] = await this.getWords(this.currentLevel, this.currentPage);
      this.view.activatePage(this.currentPage);
      this.view.updateData(data);
    });
    window.addEventListener('activate-word', (event: CustomEvent) => {
      this.view.deactivateWord();
      this.view.setCurrentWordId(event.detail.id);
      this.view.emptyActiveWord();
      this.view.displayActiveWord();
      this.view.activateWord();
    });
    window.addEventListener('audiocall-dict-start', () => {
      startAudiocall(this.currentLevel, this.currentPage);
    });
    window.addEventListener('sprint-dict-start', () => {
      this.sprint.start(this.currentLevel, this.currentPage);
    });
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(LocalStorage.dictionaryDifficultyLevel, this.currentLevel.toString());
      localStorage.setItem(LocalStorage.dictionaryPageNumber, this.currentPage.toString());
    });
    window.addEventListener('mark-hard', (event: CustomEvent) => {
      if (event.detail.hard) {
        this.view.cardUnmarkHard();
        this.model.setUserWord(event.detail.wordId, 'unset');
        this.view.changeDataWordStatus('unset');
      } else {
        this.view.cardMarkHard();
        this.model.setUserWord(event.detail.wordId, 'hard');
        this.view.changeDataWordStatus('hard');
      }
      if (event.detail.known) {
        this.view.cardUnmarkKnown();
        this.view.incrementKnownCount(-1);
      }
      this.view.setPageStatus();
      if (this.currentLevel === WordsSettings.groups) {
        this.view.removeWord();
      }
    });
    window.addEventListener('mark-known', (event: CustomEvent) => {
      if (event.detail.known) {
        this.view.cardUnmarkKnown();
        this.model.setUserWord(event.detail.wordId, 'unset');
        this.view.incrementKnownCount(-1);
        this.view.changeDataWordStatus('unset');
      } else {
        this.view.cardMarkKnown();
        this.model.setUserWord(event.detail.wordId, 'known');
        this.view.incrementKnownCount(1);
        this.view.changeDataWordStatus('known');
      }
      if (event.detail.hard) {
        this.view.cardUnmarkHard();
      }
      this.view.setPageStatus();
      if (this.currentLevel === WordsSettings.groups) {
        this.view.removeWord();
      }
    });
    window.addEventListener('login', () => {
      this.view.authorizeView();
      this.authorized = true;
    });
    window.addEventListener('logout', () => {
      this.view.unAuthorizeView();
      this.authorized = false;
    });
    window.addEventListener('page-changed', () => {
      this.view.stopPlaying();
    });
  }

  async start() {
    await this.setAuthorizationLevel();
    const data: IAggregatedWordSchema[] | IWordSchema[] = await this.getWords(this.currentLevel, this.currentPage);
    if (data) {
      window.dispatchEvent(new CustomEvent('show-footer'));
      window.dispatchEvent(new CustomEvent('hide-nav'));
      this.view.deactivateLevel();
      this.view.activateLevel(this.currentLevel);
      if (this.currentLevel === WordsSettings.groups) {
        this.view.hidePagination();
      }
      this.view.updateData(data);
      this.view.activatePage(this.currentPage);
      const root = document.querySelector('.main-box');
      root.innerHTML = '';
      root.append(this.view.render());
    }
  }

  preSelectLevelAndPage(level: number, page: number) {
    this.currentLevel = level;
    this.currentPage = page;
  }

  getLevel() {
    return this.currentLevel;
  }

  getPage() {
    return this.currentPage;
  }
}

export default Dictionary;
