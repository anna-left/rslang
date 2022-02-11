import {
  getAudioCallItem,
  getBurgerContainer,
  getBurgerList,
  getDictionaryItem,
  getGameList,
  getGamesItem,
  getHomeItem,
  getSettingsItem,
  getSprintItem,
  getStatsItem,
} from './burgerBuilder';

import './burger.scss';

export class Burger {
  constructor(root: HTMLElement) {
    const burger = getBurgerContainer();
    const list = getBurgerList();
    const home = getHomeItem();
    const dictionary = getDictionaryItem();
    const games = getGamesItem();
    const stats = getStatsItem();
    const settings = getSettingsItem();

    const gameList = getGameList();
    const audioCall = getAudioCallItem();
    const sprint = getSprintItem();

    gameList.append(audioCall, sprint);
    games.append(gameList);
    list.append(home, dictionary, games, stats, settings);
    burger.append(list);
    root.append(burger);
  }
}
