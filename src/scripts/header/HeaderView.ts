import { IViewManager } from '../manager/IViewManager';
import { createElement } from '../util/Util';

import './header.scss';
import {
  getHeaderBurgerItem,
  getHeaderDictionaryItem,
  getHeaderGamesItem,
  getHeaderHomeItem,
  getHeaderSettingsItem,
  getHeaderStatisticsItem,
} from './headerBuilder';
import { curLinkHandler } from './headerController';

export class HeaderView {
  header: HTMLElement;
  headerBox: HTMLElement;
  constructor() {
    this.header = createElement('header', ['header']);
    this.headerBox = createElement('div', ['header__box']);
  }
  render(manager: IViewManager) {
    if (!this.header) {
      this.header = createElement('header', ['header']);
    }
    if (!this.headerBox) {
      this.headerBox = createElement('div', ['header__box']);
    }
    const headerNav = createElement('nav', ['header__nav']);
    const headerNavList = createElement('ul', ['header__nav-list', 'nav-list']);

    const headerNavBurgerItem = getHeaderBurgerItem(manager);
    const headerNavItemHome = getHeaderHomeItem(manager);
    const headerNavItemDictionary = getHeaderDictionaryItem(manager);
    const headerNavItemGames = getHeaderGamesItem(manager);
    const headerNavItemStats = getHeaderStatisticsItem(manager);
    const headerNavItemConfig = getHeaderSettingsItem(manager);

    curLinkHandler([
      headerNavItemHome,
      headerNavItemDictionary,
      headerNavItemGames,
      headerNavItemStats,
      headerNavItemConfig,
    ]);

    headerNavList.append(
      headerNavBurgerItem,
      headerNavItemHome,
      headerNavItemDictionary,
      headerNavItemGames,
      headerNavItemStats,
      headerNavItemConfig,
    );
    headerNav.append(headerNavList);
    this.headerBox.append(headerNav);
    this.header.append(this.headerBox);
    document.body.append(this.header);
  }
}
