import { BurgerView } from '../burger/BurgerView';
import { HomeView } from '../home/home/HomeVIew';
import { MainView } from '../main/MainView';
import { HeaderView } from '../header/HeaderView';
import { FooterView } from '../footer/FooterView';
import Dictionary from '../dictionary/Dictionary';
import { HomeNavigation } from '../home/navigation/Navigation';
import Sprint from "../sprint/Sprint";
import {LocalStorage} from "../state/StorageSettings";
import Modal from "../api/Modal";

export class ViewManager {
  burger: BurgerView;
  main: MainView;
  header: HeaderView;
  footer: FooterView;
  private readonly dictionary: Dictionary;
  homeNavigation: HomeNavigation;
  home: HomeView;
  private readonly sprint: Sprint;
  private readonly modal: Modal;

  constructor() {
    this.burger = new BurgerView();
    this.main = new MainView();
    this.home = new HomeView();
    this.homeNavigation = new HomeNavigation();
    this.header = new HeaderView();
    this.footer = new FooterView();
    this.dictionary = new Dictionary();
    this.sprint = new Sprint();
    this.modal = new Modal(document.querySelector('body'));

    this.main.render();
    // @ts-ignore
    this.header.render(this);
    this.burger.render(this.main.mainBox, this.dictionary);
    this.home.render(this.main.mainBox);
    this.homeNavigation.render(this.main.main, this.main.mainBox);
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
    window.addEventListener('show-error', (event: CustomEvent)=> {
      this.modal.setText(event.detail.error);
      this.modal.show();
    })
  }

  renderFooter() {
    this.footer.render();
  }
  removeFooter() {
    document.body.removeChild(this.footer.footer);
  }

  renderHome() {
    this.home.render(this.main.mainBox);
  }

  renderhomeNavigation() {
    this.homeNavigation.render(this.main.main, this.main.mainBox);
  }
  removehomeNavigation() {
    document.body.removeChild(this.homeNavigation.nav);
  }
}
