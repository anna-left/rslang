import { createElement } from '../util/Util';

import './header.scss';

export class HeaderView {
  constructor() {
    const header = createElement('header', ['header']);

    const headerBox = createElement('div', ['header__box']);

    const headerNav = createElement('nav', ['header__nav']);
    const headerNavList = createElement('ul', ['header__nav-list', 'nav-list']);

    const headerNabBurgerItem = createElement('li', ['nav-list__item']);
    const burgerList = createElement('li', ['nav-list__burger-menu', 'burger-menu']);
    for (let i = 0; i < 3; i++) {
      burgerList.append(createElement('li', ['burger-menu__item'], [], '—'));
    }

    const headerNavItemHome = createElement('li', ['nav-list__item'], [], 'Главная');
    const headerNavItemDictionary = createElement('li', ['nav-list__item'], [], 'Словарь');
    const headerNavItemGames = createElement('li', ['nav-list__item'], [], 'Игры');
    const headerNavItemStats = createElement('li', ['nav-list__item'], [], 'Статистика');
    const headerNavItemConfig = createElement('li', ['nav-list__item'], [], 'Настройки');

    headerNabBurgerItem.append(burgerList);

    headerNavList.append(
      headerNabBurgerItem,
      headerNavItemHome,
      headerNavItemDictionary,
      headerNavItemGames,
      headerNavItemStats,
      headerNavItemConfig,
    );
    headerNav.append(headerNavList);
    headerBox.append(headerNav);
    header.append(headerBox);
    document.body.append(header);
  }
}
