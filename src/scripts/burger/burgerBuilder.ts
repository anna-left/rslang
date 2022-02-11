import { createElement, createSVG } from '../util/Util';

export function getBurgerContainer() {
  return createElement('nav', ['main-box__burger', 'burger']);
}

export function getBurgerList() {
  const ul = createElement('ul', ['burger__list']);
  ul.append(getHiddenSvgs());
  return ul;
}

export function getHomeItem() {
  const home = createElement('li', ['burger__item']);

  const homeIconSvg = createSVG('svg', ['burger__icon']);
  const homeIconUse = createSVG('use', [], [['href', '#burger_home-icon']]);

  const homeText = createElement('span', ['burger__item-text'], [], 'Главная');

  homeIconSvg.append(homeIconUse);
  home.append(homeIconSvg, homeText);
  return home;
}

export function getDictionaryItem() {
  const dictionary = createElement('li', ['burger__item']);

  const bookIconSvg = createSVG('svg', ['burger__icon']);
  const bookIconUse = createSVG('use', [], [['href', '#burger_book-icon']]);

  const bookText = createElement('span', ['burger__item-text'], [], 'Словарь');

  bookIconSvg.append(bookIconUse);
  dictionary.append(bookIconSvg, bookText);
  return dictionary;
}

export function getGamesItem() {
  const games = createElement('li', ['burger__item', 'burger-games']);

  const gamesIconSvg = createSVG('svg', ['burger__icon']);
  const gamesIconUse = createSVG('use', [], [['href', '#burger_games-icon']]);

  const gamesText = createElement('span', ['burger__item-text'], [], 'Мини-игры');

  gamesIconSvg.append(gamesIconUse);
  games.append(gamesIconSvg, gamesText);
  return games;
}

export function getStatsItem() {
  const stats = createElement('li', ['burger__item']);

  const statsIconSvg = createSVG('svg', ['burger__icon']);
  const statsIconUse = createSVG('use', [], [['href', '#burger_stats-icon']]);

  const statsText = createElement('span', ['burger__item-text'], [], 'Статистика');

  statsIconSvg.append(statsIconUse);
  stats.append(statsIconSvg, statsText);
  return stats;
}

export function getSettingsItem() {
  const settings = createElement('li', ['burger__item']);

  const configIconSvg = createSVG('svg', ['burger__icon']);
  const configIconUse = createSVG('use', [], [['href', '#burger_config-icon']]);

  const configText = createElement('span', ['burger__item-text'], [], 'Настройки');

  configIconSvg.append(configIconUse);
  settings.append(configIconSvg, configText);
  return settings;
}

export function getGameList() {
  return createElement('ul', ['burger-games__list']);
}

export function getSprintItem() {
  const sprint = createElement('li', ['burger-games__item']);

  const sprintIconSvg = createSVG('svg', ['burger__icon']);
  const sprintIconUse = createSVG('use', [], [['href', '#burger_sprint-icon']]);

  const sprintText = createElement('span', ['burger__item-text'], [], 'Спринт');

  sprintIconSvg.append(sprintIconUse);
  sprint.append(sprintIconSvg, sprintText);
  return sprint;
}
export function getAudioCallItem() {
  const audiocall = createElement('li', ['burger-games__item']);

  const audiocallIconSvg = createSVG('svg', ['burger__icon']);
  const audiocallIconUse = createSVG('use', [], [['href', '#burger_audiocall-icon']]);
  audiocallIconSvg.append(audiocallIconUse);

  const audiocallText = createElement('span', ['burger__item-text'], [], 'Аудиовызов');

  audiocall.append(audiocallIconSvg, audiocallText);
  return audiocall;
}

function getHiddenSvgs() {
  const svgHidden = createSVG('svg', [], [['display', 'none']]);

  svgHidden.append(
    createHomeSymbol(),
    createBookSymbol(),
    createGamesSymbol(),
    createStatsSymbol(),
    createConfigSymbol(),
    createAudiocallSymbol(),
    createSprintSymbol(),
  );
  return svgHidden;
}

function createHomeSymbol() {
  const symbolHome = createSVG(
    'symbol',
    [],
    [
      ['viewBox', '0 0 36 36'],
      ['id', 'burger_home-icon'],
    ],
  );
  const pathHome1 = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M33.71 17.29L18.71 2.29001C18.5227 2.10376 18.2692 1.99922 18.005 1.99922C17.7408 1.99922 17.4874 2.10376 17.3 2.29001L2.30003 17.29C2.1362 17.4813 2.05059 17.7274 2.06032 17.9791C2.07004 18.2307 2.17437 18.4695 2.35246 18.6476C2.53056 18.8257 2.7693 18.93 3.02097 18.9397C3.27265 18.9494 3.51873 18.8638 3.71003 18.7L18 4.41001L32.29 18.71C32.4813 18.8738 32.7274 18.9594 32.9791 18.9497C33.2308 18.94 33.4695 18.8357 33.6476 18.6576C33.8257 18.4795 33.93 18.2407 33.9397 17.9891C33.9495 17.7374 33.8639 17.4913 33.7 17.3L33.71 17.29Z',
      ],
    ],
  );
  const pathHome2 = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M28 32H23V22H13V32H8V18L6 20V32C6 32.5304 6.21071 33.0392 6.58579 33.4142C6.96086 33.7893 7.46957 34 8 34H15V24H21V34H28C28.5304 34 29.0391 33.7893 29.4142 33.4142C29.7893 33.0392 30 32.5304 30 32V19.76L28 17.76V32Z',
      ],
    ],
  );
  symbolHome.append(pathHome1, pathHome2);
  return symbolHome;
}

function createBookSymbol() {
  const symbolBook = createSVG(
    'symbol',
    [],
    [
      ['viewBox', '0 0 25 25'],
      ['id', 'burger_book-icon'],
    ],
  );
  const pathBook = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M22.125 0.416666H4.25C2.59175 0.416666 0.125 1.38212 0.125 4.04167V20.9583C0.125 23.6179 2.59175 24.5833 4.25 24.5833H24.875V22.1667H4.2665C3.63125 22.1522 2.875 21.9323 2.875 20.9583C2.875 19.9844 3.63125 19.7645 4.2665 19.75H24.875V2.83333C24.875 1.50054 23.6416 0.416666 22.125 0.416666ZM22.125 17.3333H2.875V4.04167C2.875 3.06775 3.63125 2.84783 4.25 2.83333H22.125V17.3333Z',
      ],
    ],
  );
  symbolBook.append(pathBook);
  return symbolBook;
}

function createStatsSymbol() {
  const symbolStats = createSVG(
    'symbol',
    [],
    [
      ['viewBox', '0 0 28 27'],
      ['id', 'burger_stats-icon'],
    ],
  );
  const pathStats1 = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M3.5 1.625V20.9583C3.5 21.5993 3.74583 22.214 4.18342 22.6672C4.621 23.1204 5.21449 23.375 5.83333 23.375H24.5',
      ],
      ['stroke', '#F8F8F8'],
      ['stroke-width', '2'],
      ['stroke-linecap', 'round'],
      ['stroke-linejoin', 'round'],
      ['stroke-miterlimit', '5.759'],
    ],
  );
  const pathStats2 = createSVG(
    'path',
    [],
    [
      ['d', 'M8.16663 14.9167L12.8333 10.0833L17.5 14.9167L24.5 7.66667'],
      ['stroke', '#F8F8F8'],
      ['stroke-width', '2'],
      ['stroke-linecap', 'round'],
      ['stroke-linejoin', 'round'],
      ['stroke-miterlimit', '5.759'],
    ],
  );
  const pathStats3 = createSVG(
    'path',
    [],
    [
      ['d', 'M21 7.66667H24.5V11.2917'],
      ['stroke', '#F8F8F8'],
      ['stroke-width', '2'],
      ['stroke-linecap', 'round'],
      ['stroke-linejoin', 'round'],
    ],
  );
  symbolStats.append(pathStats1, pathStats2, pathStats3);
  return symbolStats;
}

function createGamesSymbol() {
  const symbolGames = createSVG(
    'symbol',
    [],
    [
      ['viewBox', '0 0 30 21'],
      ['id', 'burger_games-icon'],
    ],
  );

  const pathGames1 = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M11 14.375L7.04263 18.2087C6.60219 18.6353 6.04107 18.9257 5.43023 19.0434C4.81938 19.1611 4.18623 19.1007 3.61083 18.8698C3.03542 18.6389 2.5436 18.248 2.19754 17.7463C1.85148 17.2447 1.66672 16.6549 1.66663 16.0516V14.375L3.47596 5.61234C3.71762 4.44108 4.37071 3.38712 5.32411 2.62977C6.27752 1.87241 7.47234 1.45846 8.70529 1.45834H21.2946C22.5276 1.45846 23.7224 1.87241 24.6758 2.62977C25.6292 3.38712 26.2823 4.44108 26.524 5.61234L28.3333 14.375V16.0503C28.3332 16.6536 28.1484 17.2434 27.8024 17.745C27.4563 18.2467 26.9645 18.6376 26.3891 18.8685C25.8137 19.0994 25.1805 19.1598 24.5697 19.0421C23.9588 18.9245 23.3977 18.634 22.9573 18.2074L19 14.375H11Z',
      ],
      ['stroke', '#F8F8F8'],
      ['stroke-width', '2'],
      ['stroke-linecap', 'round'],
      ['stroke-linejoin', 'round'],
    ],
  );
  const pathGames2 = createSVG(
    'path',
    [],
    [
      ['d', 'M11 1.45834L12.3333 4.04167H17.6667L19 1.45834'],
      ['stroke', '#F8F8F8'],
      ['stroke-width', '2'],
      ['stroke-linecap', 'round'],
      ['stroke-linejoin', 'round'],
    ],
  );

  symbolGames.append(pathGames1, pathGames2);
  return symbolGames;
}

function createConfigSymbol() {
  const symbolConfig = createSVG(
    'symbol',
    [],
    [
      // ['viewBox', ''],
      ['id', 'burger_config-icon'],
    ],
  );
  // const pathConfig = createSVG('path', [], [['d', '']]);
  // symbolConfig.append(pathConfig);
  return symbolConfig;
}

function createSprintSymbol() {
  const symbolConfig = createSVG(
    'symbol',
    [],
    [
      // ['viewBox', ''],
      ['id', 'burger_config-icon'],
    ],
  );
  // const pathConfig = createSVG('path', [], [['d', '']]);
  // symbolConfig.append(pathConfig);
  return symbolConfig;
}

function createAudiocallSymbol() {
  const symbolConfig = createSVG(
    'symbol',
    [],
    [
      // ['viewBox', ''],
      ['id', 'burger_config-icon'],
    ],
  );
  const pathConfig = createSVG('path', [], [['d', '']]);
  // symbolConfig.append(pathConfig);
  return symbolConfig;
}
