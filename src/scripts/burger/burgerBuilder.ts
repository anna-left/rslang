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
      ['viewBox', '0 0 33 29'],
      ['id', 'burger_book-icon'],
    ],
  );
  const pathBook = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M26.125 2.41667H8.25C6.59175 2.41667 4.125 3.38212 4.125 6.04167V22.9583C4.125 25.6179 6.59175 26.5833 8.25 26.5833H28.875V24.1667H8.2665C7.63125 24.1522 6.875 23.9323 6.875 22.9583C6.875 21.9844 7.63125 21.7645 8.2665 21.75H28.875V4.83333C28.875 3.50054 27.6416 2.41667 26.125 2.41667ZM26.125 19.3333H6.875V6.04167C6.875 5.06775 7.63125 4.84783 8.25 4.83333H26.125V19.3333Z',
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
      ['viewBox', '0 0 28 29'],
      ['id', 'burger_stats-icon'],
    ],
  );
  const pathStats1 = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M3.5 3.625V22.9583C3.5 23.5993 3.74583 24.214 4.18342 24.6672C4.621 25.1204 5.21449 25.375 5.83333 25.375H24.5',
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
      ['d', 'M8.16663 16.9167L12.8333 12.0833L17.5 16.9167L24.5 9.66667'],
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
      ['d', 'M21 9.66667H24.5V13.2917'],
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
      ['viewBox', '0 0 32 31'],
      ['id', 'burger_games-icon'],
    ],
  );

  const pathGames1 = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M12 19.375L8.04263 23.2087C7.60219 23.6353 7.04107 23.9257 6.43023 24.0434C5.81938 24.1611 5.18623 24.1007 4.61083 23.8698C4.03542 23.6389 3.5436 23.248 3.19754 22.7463C2.85148 22.2447 2.66672 21.6549 2.66663 21.0516V19.375L4.47596 10.6123C4.71762 9.44108 5.37071 8.38712 6.32411 7.62977C7.27752 6.87241 8.47234 6.45846 9.70529 6.45834H22.2946C23.5276 6.45846 24.7224 6.87241 25.6758 7.62977C26.6292 8.38712 27.2823 9.44108 27.524 10.6123L29.3333 19.375V21.0503C29.3332 21.6536 29.1484 22.2434 28.8024 22.745C28.4563 23.2467 27.9645 23.6376 27.3891 23.8685C26.8137 24.0994 26.1805 24.1598 25.5697 24.0421C24.9588 23.9245 24.3977 23.634 23.9573 23.2074L20 19.375H12Z',
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
      ['d', 'M12 6.45834L13.3333 9.04167H18.6667L20 6.45834'],
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
      ['viewBox', ''],
      ['id', 'burger_config-icon'],
    ],
  );
  const pathConfig = createSVG('path', [], [['d', '']]);
  symbolConfig.append(pathConfig);
  return symbolConfig;
}

function createSprintSymbol() {
  const symbolConfig = createSVG(
    'symbol',
    [],
    [
      ['viewBox', ''],
      ['id', 'burger_config-icon'],
    ],
  );
  const pathConfig = createSVG('path', [], [['d', '']]);
  symbolConfig.append(pathConfig);
  return symbolConfig;
}

function createAudiocallSymbol() {
  const symbolConfig = createSVG(
    'symbol',
    [],
    [
      ['viewBox', ''],
      ['id', 'burger_config-icon'],
    ],
  );
  const pathConfig = createSVG('path', [], [['d', '']]);
  symbolConfig.append(pathConfig);
  return symbolConfig;
}

/* 

</svg>
 */
