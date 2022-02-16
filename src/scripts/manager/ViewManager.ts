import { BurgerView } from '../burger/BurgerView';
import { HomeView } from '../home/home/HomeVIew';
import { MainView } from '../main/MainView';
import { HeaderView } from '../header/HeaderView';
import { FooterView } from '../footer/FooterView';
import Dictionary from '../dictionary/Dictionary';
import { HomeNavigation } from '../home/navigation/Navigation';

export class ViewManager {
  burger: BurgerView;
  main: MainView;
  header: HeaderView;
  footer: FooterView;
  dictionary: Dictionary;
  homeNavigation: HomeNavigation;
  home: HomeView;

  constructor() {
    this.burger = new BurgerView();
    this.main = new MainView();
    this.home = new HomeView();
    this.homeNavigation = new HomeNavigation();
    this.header = new HeaderView();
    this.footer = new FooterView();
    this.dictionary = new Dictionary();

    this.main.render();
    this.header.render(this);
    this.burger.render(this.main.mainBox, this.dictionary);
    this.home.render(this.main.mainBox);
    this.homeNavigation.render(this.main.main, this.main.mainBox);
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
