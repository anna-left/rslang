import {
  getBurgerContainer,
  getBurgerList,
  getDictionaryItem,
  getGamesItem,
  getHideBurgerIcon,
  getHomeItem,
  getSettingsItem,
  getStatsItem,
} from './burgerBuilder';

import './burger.scss';
import { HomeView } from '../home/home/HomeVIew';
import Dictionary from "../controllers/Dictionary";

const BURGER_CLASS_SHOW = 'main-box__burger_state_show';
// const BURGER_CLASS_HIDE = 'main-box__burger_state_hide';

export class BurgerView {
  burger: HTMLElement;
  constructor() {
    this.burger = getBurgerContainer();
  }
  render(main: HTMLElement, mainBox: HTMLElement) {
    const hideIcon = getHideBurgerIcon();
    hideIcon.addEventListener('click', ()=>{
      this.burger.classList.remove(BURGER_CLASS_SHOW);
    })
    const list = getBurgerList();
    const home = getHomeItem();
    const dictionary = getDictionaryItem();
    const games = getGamesItem();
    const stats = getStatsItem();
    const settings = getSettingsItem();

    home.addEventListener('click', () => new HomeView(main, mainBox));
    dictionary.addEventListener('click', async () => {
      const dict = new Dictionary();
      await dict.init();
    })

    list.append(home, dictionary, games, stats, settings);
    this.burger.append(hideIcon, list);
    document.body.append(this.burger);
  }
}
