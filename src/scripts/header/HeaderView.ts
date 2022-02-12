import { HomeView } from '../home/home/HomeVIew';
import { createElement } from '../util/Util';

import './header.scss';

const BURGER_CLASS_SHOW = 'main-box__burger_state_show';

export class HeaderView {
  constructor(burger: HTMLElement, main: HTMLElement, mainBox: HTMLElement) {
    const header = createElement('header', ['header']);

    const headerBox = createElement('div', ['header__box']);

    const headerNav = createElement('nav', ['header__nav']);
    const headerNavList = createElement('ul', ['header__nav-list', 'nav-list']);

    const headerNabBurgerItem = createElement('li', ['nav-list__item']);
    const burgerList = createElement('li', ['nav-list__burger-menu', 'burger-menu']);
    for (let i = 0; i < 3; i++) {
      burgerList.append(createElement('li', ['burger-menu__item'], [], '—'));
    }

    headerNabBurgerItem.addEventListener('click', () => {
      burger.classList.add(BURGER_CLASS_SHOW);
    });

    const headerNavItemHome = createElement('li', ['nav-list__item', 'nav-list__item_state_active'], [], 'Главная');
    const headerNavItemDictionary = createElement(
      'li',
      ['nav-list__item', 'nav-list__item_state_hidden'],
      [],
      'Словарь',
    );
    const headerNavItemGames = createElement('li', ['nav-list__item'], [], 'Игры');
    const headerNavItemStats = createElement('li', ['nav-list__item', 'nav-list__item_state_hidden'], [], 'Статистика');
    const headerNavItemConfig = createElement('li', ['nav-list__item', 'nav-list__item_state_hidden'], [], 'Настройки');

    headerNavItemHome.addEventListener('click', () => {
      new HomeView(main, mainBox);
    });

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
