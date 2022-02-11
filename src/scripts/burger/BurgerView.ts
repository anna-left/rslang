import {
  getBurgerContainer,
  getBurgerList,
  getDictionaryItem,
  getGamesItem,
  getHomeItem,
  getSettingsItem,
  getStatsItem,
} from './burgerBuilder';

import './burger.scss';

export class BurgerView {
  constructor() {
    const burger = getBurgerContainer();
    const list = getBurgerList();
    const home = getHomeItem();
    const dictionary = getDictionaryItem();
    const games = getGamesItem();
    const stats = getStatsItem();
    const settings = getSettingsItem();

    list.append(home, dictionary, games, stats, settings);
    burger.append(list);
    document.body.append(burger);
  }
}
