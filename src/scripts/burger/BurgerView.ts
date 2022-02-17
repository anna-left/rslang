import {
  getBlur,
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
import Dictionary from '../dictionary/Dictionary';
import { IViewManager } from '../manager/IViewManager';

const BURGER_CLASS_SHOW = 'main-box__burger_state_show';
const BURGER_BLUR_CLASS_SHOW = 'main-box__burger_blur_show';

export class BurgerView {
  burger: HTMLElement;
  blur: HTMLElement;
  constructor() {
    this.burger = getBurgerContainer();
    this.blur = getBlur();
  }
  render(manager: IViewManager, dict: Dictionary) {
    if (!this.burger) {
      this.burger = getBurgerContainer();
    }
    if (!this.blur) {
      this.blur = getBlur();
    }
    this.burger.append(this.blur);

    const hideIcon = getHideBurgerIcon();
    hideIcon.addEventListener('click', () => {
      this.burger.classList.remove(BURGER_CLASS_SHOW);
      this.blur.classList.remove(BURGER_BLUR_CLASS_SHOW);
    });
    const list = getBurgerList();
    const home = getHomeItem();
    const dictionary = getDictionaryItem();
    const games = getGamesItem();
    const stats = getStatsItem();
    const settings = getSettingsItem();

    home.addEventListener('click', () => new HomeView().render(manager));
    dictionary.addEventListener('click', async () => {
      await dict.start();
    });

    list.append(home, dictionary, games, stats, settings);
    this.burger.append(hideIcon, list);
    document.body.append(this.burger);
  }
}
