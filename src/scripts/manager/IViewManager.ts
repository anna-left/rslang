import { BurgerView } from '../burger/BurgerView';
import Dictionary from '../dictionary/Dictionary';
import { FooterView } from '../footer/FooterView';
import { HeaderView } from '../header/HeaderView';
import { HomeView } from '../home/home/HomeVIew';
import { HomeNavigation } from '../home/navigation/Navigation';
import { MainView } from '../main/MainView';

export interface IViewManager {
  burger: BurgerView;
  main: MainView;
  header: HeaderView;
  footer: FooterView;
  dictionary: Dictionary;
  homeNavigation: HomeNavigation;
  home: HomeView;
}
