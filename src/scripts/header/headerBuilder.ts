/* eslint-disable max-len */
import { IViewManager } from './../manager/IViewManager';
import { createElement, createSVG } from '../util/Util';
import { HomeView } from '../home/home/HomeVIew';

export function getUserAuth(userName: string, manager: IViewManager) {
  const woodenBox = createElement('div', ['user-box__container']);

  const svg = createSVG('svg', ['user-box__icon']);
  const use = createSVG('use', [], [['href', '#header_user-auth-icon']]);
  svg.append(use);
  const text = createElement('span', ['user-box__text'], [], `${userName}`);
  woodenBox.append(svg, text);

  const userMenu = getUserNavigation(manager);

  return [woodenBox, userMenu];
}

function getUserNavigation(manager: IViewManager) {
  const NAV_ACTIVE_CLASS = 'user-box__navigation_state_active';
  const box = createElement('ul', ['user-box__navigation', 'user-navigation']);
  const stat = createElement('li', ['user-navigation__item'], [], 'Статистика');
  const words = createElement('li', ['user-navigation__item'], [], 'Добавленные слова');
  const logout = createElement('li', ['user-navigation__item'], [], 'Выйти из профиля');

  stat.addEventListener('click', () => {
    box.classList.remove(NAV_ACTIVE_CLASS);
  });
  words.addEventListener('click', () => {
    box.classList.remove(NAV_ACTIVE_CLASS);
  });
  logout.addEventListener('click', () => {
    box.classList.remove(NAV_ACTIVE_CLASS);
    sessionStorage.removeItem('userData');
    manager.header.userUnauthorize();
  });

  box.append(stat, words, logout);
  return box;
}

export function getUserUnauth() {
  const woodenBox = createElement('div', ['user-box__container']);

  const svg = createSVG('svg', ['user-box__icon']);
  const use = createSVG('use', [], [['href', '#header_user-unauth-icon']]);
  svg.append(use);

  const text = createElement('span', ['user-box__text'], [], 'не авторизован!');
  woodenBox.append(svg, text);
  return woodenBox;
}

export function getNavList(manager: IViewManager) {
  const headerNavList = createElement('ul', ['header__nav-list', 'nav-list']);

  const headerNavBurgerItem = getHeaderBurgerItem(manager);
  const headerNavItemHome = getHeaderHomeItem(manager);
  const headerNavItemDictionary = getHeaderDictionaryItem(manager);
  const headerNavItemGames = getHeaderGamesItem(manager);
  const headerNavItemConfig = getHeaderSettingsItem(manager);

  headerNavList.append(
    headerNavBurgerItem,
    headerNavItemHome,
    headerNavItemDictionary,
    headerNavItemGames,
    headerNavItemConfig,
  );
  return headerNavList;
}

function getHeaderBurgerItem(manager: IViewManager) {
  const BURGER_CLASS_SHOW = 'main-box__burger_state_show';
  const BURGER_BLUR_CLASS_SHOW = 'main-box__burger_blur_show';

  const headerNavBurgerItem = createElement('li', ['nav-list__item']);
  const burgerList = createElement('li', ['nav-list__burger-menu', 'burger-menu']);
  for (let i = 0; i < 3; i++) {
    burgerList.append(createElement('li', ['burger-menu__item'], [], '—'));
  }

  headerNavBurgerItem.append(burgerList);

  headerNavBurgerItem.addEventListener('click', () => {
    manager.burger.burger.classList.add(BURGER_CLASS_SHOW);
    manager.burger.blur.classList.add(BURGER_BLUR_CLASS_SHOW);
  });
  return headerNavBurgerItem;
}

function getHeaderHomeItem(manager: IViewManager) {
  const item = createElement('li', ['nav-list__item'], [], 'Главная');
  item.addEventListener('click', () => {
    new HomeView().render(manager);
  });
  return item;
}

function getHeaderGamesItem(manager: IViewManager) {
  const HEADER_GAMES_SHOW_CLASS = 'header-games__games-box_state_active';

  const games = createElement('li', ['nav-list__item', 'nav-list__item_type_games', 'header-games']);

  const linkBox = createElement('div', ['header-games__link-box', 'header__link']);
  const gamesText = createElement('span', ['header__item_text'], [], 'Игры');

  linkBox.append(gamesText);

  const gamesContainer = createElement('span', ['header-games__games-box']);
  const gamesList = getGameList(manager);
  gamesContainer.append(gamesList);

  games.append(linkBox, gamesContainer);

  games.addEventListener('mouseover', () => gamesContainer.classList.add(HEADER_GAMES_SHOW_CLASS));
  games.addEventListener('mouseout', () => gamesContainer.classList.remove(HEADER_GAMES_SHOW_CLASS));

  return games;
}

function getHeaderDictionaryItem(manager: IViewManager) {
  console.log(manager);
  const item = createElement('li', ['nav-list__item', 'nav-list__item_state_hidden'], [], 'Учебник');
  return item;
}

function getHeaderSettingsItem(manager: IViewManager) {
  console.log(manager);
  const item = createElement('li', ['nav-list__item', 'nav-list__item_state_hidden'], [], 'Настройки');
  return item;
}

function getGameList(manager: IViewManager) {
  const gamesList = createElement('ul', ['header-games__list', 'games-list']);

  gamesList.append(getAudioCallItem(manager), getSprintItem());
  return gamesList;
}

function getSprintItem() {
  const sprint = createElement('li', ['header-games__item', 'header__link']);

  const sprintIconSvg = createSVG('svg', ['header-games__item_icon']);
  const sprintIconUse = createSVG('use', [], [['href', '#burger_sprint-icon']]);

  const sprintText = createElement('span', ['header-games__item_text'], [], 'Спринт');

  sprintIconSvg.append(sprintIconUse);
  sprint.append(sprintIconSvg, sprintText);
  sprint.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('sprint-burger-start'));
  });
  return sprint;
}

function getAudioCallItem(manager: IViewManager) {
  console.log(manager);
  const audiocall = createElement('li', ['header-games__item', 'header__link']);

  const audiocallIconSvg = createSVG('svg', ['header-games__item_icon']);
  const audiocallIconUse = createSVG('use', [], [['href', '#burger_audiocall-icon']]);
  audiocallIconSvg.append(audiocallIconUse);

  const audiocallText = createElement('span', ['header-games__item_text'], [], 'Аудиовызов');

  audiocall.append(audiocallIconSvg, audiocallText);
  return audiocall;
}

export function getHiddenSvg() {
  const svgHidden = createSVG('svg', [], [['display', 'none']]);
  svgHidden.append(createUserUnauthSymbol(), createUserAuthSymbol());
  return svgHidden;
}

function createUserUnauthSymbol() {
  const symbol = createSVG(
    'symbol',
    [],
    [
      ['viewBox', '0 0 32 32'],
      ['id', 'header_user-unauth-icon'],
      ['fill', 'none'],
    ],
  );
  const circle = createSVG(
    'circle',
    [],
    [
      ['cx', '16'],
      ['cy', '16'],
      ['r', '15'],
      ['fill', 'none'],
      ['stroke', '#000'],
      ['stroke-linejoin', 'round'],
      ['stroke-width', '2px'],
    ],
  );
  const path = createSVG(
    'path',
    [],
    [
      ['d', 'M10,12a6,6,0,1,1,6,6v5'],
      ['fill', 'none'],
      ['stroke', '#000'],
      ['stroke-linejoin', 'round'],
      ['stroke-width', '2px'],
    ],
  );
  const line = createSVG(
    'line',
    [],
    [
      ['x1', '15'],
      ['x2', '17'],
      ['y1', '26'],
      ['y2', '26'],
      ['fill', 'none'],
      ['stroke', '#000'],
      ['stroke-linejoin', 'round'],
      ['stroke-width', '2px'],
    ],
  );
  symbol.append(circle, path, line);
  return symbol;
}
function createUserAuthSymbol() {
  const symbol = createSVG(
    'symbol',
    [],
    [
      ['viewBox', '0 0 50 50'],
      ['id', 'header_user-auth-icon'],
    ],
  );
  const circle = createSVG(
    'circle',
    [],
    [
      ['cx', '25'],
      ['cy', '25'],
      ['r', '24'],
      ['fill', 'none'],
      ['stroke', '#000'],
      ['stroke-linecap', 'round'],
      ['stroke-miterlimit', '10'],
      ['stroke-width', '2px'],
    ],
  );
  const rect = createSVG(
    'rect',
    [],
    [
      ['height', '50'],
      ['width', '50'],
      ['fill', 'none'],
    ],
  );
  const path = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M29.933,35.528c-0.146-1.612-0.09-2.737-0.09-4.21c0.73-0.383,2.038-2.825,2.259-4.888c0.574-0.047,1.479-0.607,1.744-2.818  c0.143-1.187-0.425-1.855-0.771-2.065c0.934-2.809,2.874-11.499-3.588-12.397c-0.665-1.168-2.368-1.759-4.581-1.759  c-8.854,0.163-9.922,6.686-7.981,14.156c-0.345,0.21-0.913,0.878-0.771,2.065c0.266,2.211,1.17,2.771,1.744,2.818  c0.22,2.062,1.58,4.505,2.312,4.888c0,1.473,0.055,2.598-0.091,4.21c-1.261,3.39-7.737,3.655-11.473,6.924  c3.906,3.933,10.236,6.746,16.916,6.746s14.532-5.274,15.839-6.713C37.688,39.186,31.197,38.93,29.933,35.528z',
      ],
    ],
  );
  symbol.append(circle, rect, path);
  return symbol;
}
