import { IViewManager } from './../manager/IViewManager';
import { createElement, createSVG } from '../util/Util';
import { HomeView } from '../home/home/HomeVIew';

export function getHeaderBurgerItem(manager: IViewManager) {
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

export function getHeaderHomeItem(manager: IViewManager) {
  const item = createElement('li', ['nav-list__item'], [], 'Главная');
  item.addEventListener('click', () => {
    new HomeView().render(manager.main.mainBox);
  });
  return item;
}

export function getHeaderGamesItem(manager: IViewManager) {
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

export function getHeaderDictionaryItem(manager: IViewManager) {
  const item = createElement('li', ['nav-list__item', 'nav-list__item_state_hidden'], [], 'Учебник');
  return item;
}
export function getHeaderStatisticsItem(manager: IViewManager) {
  const item = createElement('li', ['nav-list__item', 'nav-list__item_state_hidden'], [], 'Статистика');
  return item;
}
export function getHeaderSettingsItem(manager: IViewManager) {
  const item = createElement('li', ['nav-list__item', 'nav-list__item_state_hidden'], [], 'Настройки');
  return item;
}

function getGameList(manager: IViewManager) {
  const gamesList = createElement('ul', ['header-games__list', 'games-list']);

  gamesList.append(getAudioCallItem(manager), getSprintItem(manager));
  return gamesList;
}

function getSprintItem(manager: IViewManager) {
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
  const audiocall = createElement('li', ['header-games__item', 'header__link']);

  const audiocallIconSvg = createSVG('svg', ['header-games__item_icon']);
  const audiocallIconUse = createSVG('use', [], [['href', '#burger_audiocall-icon']]);
  audiocallIconSvg.append(audiocallIconUse);

  const audiocallText = createElement('span', ['header-games__item_text'], [], 'Аудиовызов');

  audiocall.append(audiocallIconSvg, audiocallText);
  return audiocall;
}
