import { StatisticsView } from '../statistics/StatisticsView';
import { HeaderView } from '../header/HeaderView';
import { MainView } from '../main/MainView';
import { FooterView } from '../footer/FooterView';
import { BurgerView } from '../burger/BurgerView';
import { HomeView } from '../home/home/HomeVIew';
import { HomeNavigation } from '../home/navigation/Navigation';
import Sprint from '../sprint/Sprint';
import { LocalStorage } from '../state/StorageSettings';
import Modal from '../api/Modal';
import Dictionary from '../dictionary/Dictionary';
import API from '../api/API';
import { State } from '../state/State';

export class ViewManager {
  header: HeaderView;

  main: MainView;

  footer: FooterView;

  burger: BurgerView;

  homeNavigation: HomeNavigation;

  home: HomeView;

  statistics: StatisticsView;

  readonly dictionary: Dictionary;

  readonly sprint: Sprint;

  readonly modal: Modal;

  private readonly api: API;

  manager: this;

  private readonly root: HTMLElement;

  constructor() {
    this.burger = new BurgerView();
    this.main = new MainView();
    this.home = new HomeView();
    this.homeNavigation = new HomeNavigation();
    this.header = new HeaderView();
    this.footer = new FooterView();
    this.statistics = new StatisticsView();
    this.api = new API();
    this.dictionary = new Dictionary(this.api);
    this.sprint = new Sprint(this.api);
    this.modal = new Modal(document.querySelector('body'));

    this.main.render();
    this.header.render(this);
    this.burger.render(this, this.dictionary);
    this.home.render(this);
    this.homeNavigation.render(this);
    this.manager = this;
    const state = new State();
    console.log(state);
    if (state.colorScheme === 'light') {
      this.main.mainBox.style.background = '#fff';
      this.main.mainBox.style.color = '#000';
      this.header.headerBox.style.color = '#000';
    } else {
      this.main.mainBox.style.background = '#191847';
      this.main.mainBox.style.color = '#fff';
      this.header.header.style.color = '#fff';
    }
  }

  async init() {
    await this.dictionary.init();
    await this.sprint.init();
    this.sprint.addDictionary(this.dictionary);
    this.dictionary.addSprint(this.sprint);
    this.dictionary.preSelectLevelAndPage(
      +localStorage.getItem(LocalStorage.dictionaryDifficultyLevel),
      +localStorage.getItem(LocalStorage.dictionaryPageNumber),
    );
    window.addEventListener('show-error', (event: CustomEvent) => {
      this.modal.setText(event.detail.error);
      this.modal.show();
    });
    window.addEventListener('hide-footer', () => {
      this.removeFooter();
    });
    window.addEventListener('show-footer', () => {
      this.renderFooter();
    });
    window.addEventListener('hide-nav', () => {
      this.removeHomeNavigation();
    });
    window.addEventListener('show-nav', () => {
      this.renderHomeNavigation();
    });
    const observer = new MutationObserver(function () {
      window.dispatchEvent(new CustomEvent('page-changed'));
    });
    observer.observe(this.root, { childList: true });
  }

  renderFooter() {
    if (!document.body.contains(this.footer.footer)) {
      this.footer.render();
    }
  }

  removeFooter() {
    if (document.body.contains(this.footer.footer)) {
      document.body.removeChild(this.footer.footer);
    }
  }

  renderHome() {
    this.home.render(this);
  }

  renderHomeNavigation() {
    if (!this.main.main.contains(this.homeNavigation.nav)) {
      this.main.main.append(this.homeNavigation.nav);
    }
  }

  removeHomeNavigation() {
    if (this.main.main.contains(this.homeNavigation.nav)) {
      this.main.main.removeChild(this.homeNavigation.nav);
    }
  }

  getDict() {
    return this.dictionary;
  }

  getAPI() {
    return this.api;
  }
}
