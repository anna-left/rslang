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

export class ViewManager {
  header: HeaderView;

  main: MainView;

  footer: FooterView;

  burger: BurgerView;

  homeNavigation: HomeNavigation;

  home: HomeView;

  readonly dictionary: Dictionary;

  readonly sprint: Sprint;

  readonly modal: Modal;

  private readonly api: API;

  constructor() {
    this.burger = new BurgerView();
    this.main = new MainView();
    this.home = new HomeView();
    this.homeNavigation = new HomeNavigation();
    this.header = new HeaderView();
    this.footer = new FooterView();
    this.api = new API();
    this.dictionary = new Dictionary(this.api);
    this.sprint = new Sprint(this.api);
    this.modal = new Modal(document.querySelector('body'));

    this.main.render();
    this.header.render(this);
    this.burger.render(this, this.dictionary);
    this.home.render(this);
    this.homeNavigation.render(this);
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
      this.removehomeNavigation();
    });
    window.addEventListener('show-nav', () => {
      this.renderhomeNavigation();
    });
  }

  renderFooter() {
    this.footer.render();
  }

  removeFooter() {
    document.body.removeChild(this.footer.footer);
  }

  renderHome() {
    this.home.render(this);
  }

  renderhomeNavigation() {
    this.homeNavigation.render(this);
  }

  removehomeNavigation() {
    document.body.removeChild(this.homeNavigation.nav);
  }
}
