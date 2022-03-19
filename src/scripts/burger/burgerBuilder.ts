import { createElement, createSVG } from '../util/Util';
import { startAudiocall } from '../audiocall/startAudiocall';
import { getHiddenSvgs } from './burgerSvg';
import { State } from '../state/State';

const BURGER_CLASS_SHOW = 'main-box__burger_state_show';
const BURGER_BLUR_CLASS_SHOW = 'main-box__burger_blur_show';

const burger = createElement('nav', ['main-box__burger', 'burger']);
let blur = createElement('div', ['main-box__burger_blur']);

export function getBurgerContainer() {
  if (!burger) {
    return createElement('nav', ['main-box__burger', 'burger']);
  }
  return burger;
}
export function getBlur() {
  if (!blur) {
    blur = createElement('div', ['main-box__burger_blur']);
  }
  return blur;
}

export function getBurgerList() {
  const ul = createElement('ul', ['burger__list']);
  ul.append(getHiddenSvgs());
  return ul;
}

export function getHomeItem() {
  const home = createElement('li', ['burger__item', 'burger__link']);

  const homeIconSvg = createSVG('svg', ['burger__item_icon']);
  const homeIconUse = createSVG('use', [], [['href', '#burger_home-icon']]);

  const homeText = createElement('span', ['burger__item_text'], [], 'Главная');

  homeIconSvg.append(homeIconUse);
  home.append(homeIconSvg, homeText);
  home.addEventListener('click', () => {
    hideBurger();
    dispatchEvent(new CustomEvent('show-footer'));
    dispatchEvent(new CustomEvent('show-nav'));
  });

  return home;
}

export function getDictionaryItem() {
  const dictionary = createElement('li', ['burger__item', 'burger__link']);

  const bookIconSvg = createSVG('svg', ['burger__item_icon']);
  const bookIconUse = createSVG('use', [], [['href', '#burger_book-icon']]);

  const bookText = createElement('span', ['burger__item_text'], [], 'Учебник');

  bookIconSvg.append(bookIconUse);
  dictionary.append(bookIconSvg, bookText);
  dictionary.addEventListener('click', () => hideBurger());
  return dictionary;
}

export function getGamesItem() {
  const BURGER_GAMES_SHOW_CLASS = 'burger-games__games-box_state_active';

  const games = createElement('li', ['burger__item', 'burger-games']);
  const linkBox = createElement('div', ['burger-games__link-box', 'burger__link']);

  const gamesIconSvg = createSVG('svg', ['burger__item_icon', 'burger__item_icon_area']);
  const gamesIconUse = createSVG('use', [], [['href', '#burger_games-icon']]);

  const gamesText = createElement('span', ['burger__item_text'], [], 'Мини-игры');

  gamesIconSvg.append(gamesIconUse);
  linkBox.append(gamesIconSvg, gamesText);

  const gamesContainer = createElement('span', ['burger-games__games-box']);
  const gamesList = getGameList();
  gamesContainer.append(gamesList);

  games.addEventListener('mouseover', () => gamesContainer.classList.add(BURGER_GAMES_SHOW_CLASS));
  games.addEventListener('mouseout', () => gamesContainer.classList.remove(BURGER_GAMES_SHOW_CLASS));

  games.append(linkBox, gamesContainer);

  return games;
}

export function getSettingsItem() {
  const CONFIG_SHOW_CLASS = 'config__list_state_active';
  const ITEM_ACTIVE_CLASS = 'config-item__switcher-position_state_active';
  const SWITCHER_ACTIVE_CLASS = 'config-item__switch-handler_state_active';

  const settings = createElement('li', ['burger__item', 'config']);

  const itemContainer = createElement('li', ['burger__link-container', 'config__link']);

  const configIconSvg = createSVG('svg', ['burger__item_icon']);
  const configIconUse = createSVG('use', [], [['href', '#burger_config-icon']]);
  configIconSvg.append(configIconUse);

  const configText = createElement('span', ['burger__item_text'], [], 'Настройки');

  itemContainer.append(configIconSvg, configText);

  const settingsContainer = createElement('ul', ['burger__config-list', 'config__list', 'config-list']);
  const themeItem = createElement('li', ['config-list__item', 'config-item']);
  const languageItem = createElement('li', ['config-list__item', 'config-item']);
  const animationItem = createElement('li', ['config-list__item', 'config-item']);

  settings.addEventListener('mouseover', () => settingsContainer.classList.add(CONFIG_SHOW_CLASS));
  settings.addEventListener('mouseout', () => settingsContainer.classList.remove(CONFIG_SHOW_CLASS));

  setConfigThemeItem(themeItem, ITEM_ACTIVE_CLASS, SWITCHER_ACTIVE_CLASS);
  setConfigLanguageItem(languageItem, ITEM_ACTIVE_CLASS, SWITCHER_ACTIVE_CLASS);
  setAnimationItem(animationItem);
  settingsContainer.append(themeItem, languageItem, animationItem);
  settings.append(itemContainer, settingsContainer);
  return settings;
}

function themeAdjuster(el: HTMLElement, className: string) {
  const state = new State();
  if (el.classList.contains(className)) {
    state.colorScheme = 'light';
  } else {
    state.colorScheme = 'dark';
  }
  window.dispatchEvent(new CustomEvent('adapt-theme'));
}

function languageAdjuster(el: HTMLElement, className: string) {
  const state = new State();
  if (el.classList.contains(className)) {
    state.lang = 'rus';
  } else {
    state.lang = 'eng';
  }
}

function setConfigThemeItem(item: HTMLElement, itemActiveClassName: string, handlerActiveClassName: string) {
  const itemHeader = createElement('h4', ['config-item__header'], [], 'Цветовая схема');
  const itemContentBox = createElement('div', ['config-item__content-box']);
  const state = JSON.parse(localStorage.getItem('state'));
  let itemTextLeft: HTMLElement;
  let itemTextRight: HTMLElement;
  let itemSwitchHandler: HTMLElement;

  if (state.colorScheme === 'light') {
    itemTextLeft = createElement('span', ['config-item__switcher-position', itemActiveClassName], [], 'Светлая');
    itemTextRight = createElement('span', ['config-item__switcher-position'], [], 'Тёмная');
    itemSwitchHandler = createElement('span', ['config-item__switch-handler']);
  } else {
    itemTextLeft = createElement('span', ['config-item__switcher-position'], [], 'Светлая');
    itemTextRight = createElement('span', ['config-item__switcher-position', itemActiveClassName], [], 'Тёмная');
    itemSwitchHandler = createElement('span', ['config-item__switch-handler', handlerActiveClassName]);
  }
  const itemSwitcher = createElement('div', ['config-item__switcher']);

  itemTextLeft.addEventListener('click', () => {
    itemTextLeft.classList.toggle(itemActiveClassName);
    itemTextRight.classList.toggle(itemActiveClassName);
    itemSwitchHandler.classList.toggle(handlerActiveClassName);
    themeAdjuster(itemTextLeft, itemActiveClassName);
  });
  itemTextRight.addEventListener('click', () => {
    itemTextLeft.classList.toggle(itemActiveClassName);
    itemTextRight.classList.toggle(itemActiveClassName);
    itemSwitchHandler.classList.toggle(handlerActiveClassName);
    themeAdjuster(itemTextLeft, itemActiveClassName);
  });
  itemSwitcher.addEventListener('click', () => {
    itemTextLeft.classList.toggle(itemActiveClassName);
    itemTextRight.classList.toggle(itemActiveClassName);
    itemSwitchHandler.classList.toggle(handlerActiveClassName);
    themeAdjuster(itemTextLeft, itemActiveClassName);
  });

  itemSwitcher.append(itemSwitchHandler);
  itemContentBox.append(itemTextLeft, itemSwitcher, itemTextRight);

  item.append(itemHeader, itemContentBox);
}

function setConfigLanguageItem(item: HTMLElement, itemActiveClassName: string, handlerActiveClassName: string) {
  const itemHeader = createElement('h4', ['config-item__header'], [], 'Язык интерфейса');
  const itemContentBox = createElement('div', ['config-item__content-box']);
  const state = JSON.parse(localStorage.getItem('state'));
  let itemTextLeft: HTMLElement;
  let itemTextRight: HTMLElement;
  let itemSwitchHandler: HTMLElement;

  if (state.lang === 'rus') {
    itemTextLeft = createElement('span', ['config-item__switcher-position', itemActiveClassName], [], 'Русский');
    itemTextRight = createElement('span', ['config-item__switcher-position'], [], 'Английский');
    itemSwitchHandler = createElement('span', ['config-item__switch-handler']);
  } else {
    itemTextLeft = createElement('span', ['config-item__switcher-position'], [], 'Русский');
    itemTextRight = createElement('span', ['config-item__switcher-position', itemActiveClassName], [], 'Английский');
    itemSwitchHandler = createElement('span', ['config-item__switch-handler', handlerActiveClassName]);
  }
  const itemSwitcher = createElement('div', ['config-item__switcher']);

  itemTextLeft.addEventListener('click', () => {
    itemTextLeft.classList.toggle(itemActiveClassName);
    itemTextRight.classList.toggle(itemActiveClassName);
    itemSwitchHandler.classList.toggle(handlerActiveClassName);
    languageAdjuster(itemTextLeft, itemActiveClassName);
  });
  itemTextRight.addEventListener('click', () => {
    itemTextLeft.classList.toggle(itemActiveClassName);
    itemTextRight.classList.toggle(itemActiveClassName);
    itemSwitchHandler.classList.toggle(handlerActiveClassName);
    languageAdjuster(itemTextLeft, itemActiveClassName);
  });
  itemSwitcher.addEventListener('click', () => {
    itemTextLeft.classList.toggle(itemActiveClassName);
    itemTextRight.classList.toggle(itemActiveClassName);
    itemSwitchHandler.classList.toggle(handlerActiveClassName);
    languageAdjuster(itemTextLeft, itemActiveClassName);
  });

  itemSwitcher.append(itemSwitchHandler);
  itemContentBox.append(itemTextLeft, itemSwitcher, itemTextRight);

  item.append(itemHeader, itemContentBox);
}

function setAnimationItem(item: HTMLElement) {
  const itemHeader = createElement('h4', ['config-item__header'], [], 'Анимация');
  const animationType = createElement('select', ['config-item__select']);
  const animationOption1 = createElement('option', ['config-item__select_optionf'], [['value', 'type-1']], 'вид 1');
  const animationOption2 = createElement('option', ['config-item__select_optionf'], [['value', 'type-2']], 'вид 2');
  const animationOption3 = createElement('option', ['config-item__select_optionf'], [['value', 'type-3']], 'вид 3');
  const animationOption4 = createElement('option', ['config-item__select_optionf'], [['value', 'off']], 'отключить');
  animationOption4.toggleAttribute('selected');
  animationType.append(animationOption1, animationOption2, animationOption3, animationOption4);
  item.append(itemHeader, animationType);
}

export function getHideBurgerIcon() {
  const svgHideIcon = createSVG('svg', ['burger__hide-icon']);
  const useHideIcon = createSVG('use', [], [['href', '#burger_hide-icon']]);
  svgHideIcon.append(useHideIcon);
  return svgHideIcon;
}

function getGameList() {
  const gamesList = createElement('ul', ['burger-games__list', 'games-list']);

  gamesList.append(getAudioCallItem(), getSprintItem());
  return gamesList;
}

function getSprintItem() {
  const sprint = createElement('li', ['burger-games__item', 'burger__link']);

  const sprintIconSvg = createSVG('svg', ['burger__item_icon']);
  const sprintIconUse = createSVG('use', [], [['href', '#burger_sprint-icon']]);

  const sprintText = createElement('span', ['burger__item_text'], [], 'Спринт');

  sprintIconSvg.append(sprintIconUse);
  sprint.append(sprintIconSvg, sprintText);
  sprint.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('sprint-burger-start'));
  });
  sprint.addEventListener('click', () => hideBurger());
  return sprint;
}
function getAudioCallItem() {
  const audiocall = createElement('li', ['burger-games__item', 'burger__link']);

  const audiocallIconSvg = createSVG('svg', ['burger__item_icon']);
  const audiocallIconUse = createSVG('use', [], [['href', '#burger_audiocall-icon']]);
  audiocallIconSvg.append(audiocallIconUse);

  const audiocallText = createElement('span', ['burger__item_text'], [], 'Аудиовызов');

  audiocall.append(audiocallIconSvg, audiocallText);
  audiocall.addEventListener('click', () => startAudiocall(-1, -1));
  audiocall.addEventListener('click', () => hideBurger());
  return audiocall;
}

function hideBurger() {
  blur.classList.remove(BURGER_BLUR_CLASS_SHOW);
  burger.classList.remove(BURGER_CLASS_SHOW);
}
