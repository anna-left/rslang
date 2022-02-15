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
  const home = createElement('li', ['burger__item', 'burger__link']);

  const homeIconSvg = createSVG('svg', ['burger__item_icon']);
  const homeIconUse = createSVG('use', [], [['href', '#burger_home-icon']]);

  const homeText = createElement('span', ['burger__item_text'], [], 'Главная');

  homeIconSvg.append(homeIconUse);
  home.append(homeIconSvg, homeText);
  return home;
}

export function getDictionaryItem() {
  const dictionary = createElement('li', ['burger__item', 'burger__link']);

  const bookIconSvg = createSVG('svg', ['burger__item_icon']);
  const bookIconUse = createSVG('use', [], [['href', '#burger_book-icon']]);

  const bookText = createElement('span', ['burger__item_text'], [], 'Словарь');

  bookIconSvg.append(bookIconUse);
  dictionary.append(bookIconSvg, bookText);
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

export function getStatsItem() {
  const stats = createElement('li', ['burger__item', 'burger__link']);

  const statsIconSvg = createSVG('svg', ['burger__item_icon']);
  const statsIconUse = createSVG('use', [], [['href', '#burger_stats-icon']]);

  const statsText = createElement('span', ['burger__item_text'], [], 'Статистика');

  statsIconSvg.append(statsIconUse);
  stats.append(statsIconSvg, statsText);
  return stats;
}

export function getSettingsItem() {
  const settings = createElement('li', ['burger__item', 'burger__link']);

  const configIconSvg = createSVG('svg', ['burger__item_icon']);
  const configIconUse = createSVG('use', [], [['href', '#burger_config-icon']]);

  const configText = createElement('span', ['burger__item_text'], [], 'Настройки');

  configIconSvg.append(configIconUse);
  settings.append(configIconSvg, configText);
  return settings;
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
  sprint.addEventListener('click', ()=> {
    window.dispatchEvent(new CustomEvent('sprint-burger-start'));
  })
  return sprint;
}
function getAudioCallItem() {
  const audiocall = createElement('li', ['burger-games__item', 'burger__link']);

  const audiocallIconSvg = createSVG('svg', ['burger__item_icon']);
  const audiocallIconUse = createSVG('use', [], [['href', '#burger_audiocall-icon']]);
  audiocallIconSvg.append(audiocallIconUse);

  const audiocallText = createElement('span', ['burger__item_text'], [], 'Аудиовызов');

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
    createHideBurgerSymbol(),
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
      ['fill', 'none'],
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
      ['fill', 'none'],
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
      ['viewBox', '0 0 30 30'],
      ['id', 'burger_config-icon'],
      ['fill', 'none'],
    ],
  );
  const pathConfig1 = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M12.1875 1.875V5.625L10.3125 6.5625L7.5 3.75L3.75 7.5L6.5625 10.3125L5.625 12.1875H1.875V17.8125H5.625L6.5625 19.6875L3.75 22.5L7.5 26.25L10.3125 23.4375L12.1875 24.375V28.125H17.8125V24.375L19.6875 23.4375L22.5 26.25L26.25 22.5L23.4375 19.6875L24.375 17.8125H28.125V12.1875H24.375L23.4375 10.3125L26.25 7.5L22.5 3.75L19.6875 6.5625L17.8125 5.625V1.875H12.1875Z',
      ],
      ['stroke', 'white'],
      ['stroke-width', '2'],
      ['stroke-linecap', 'round'],
      ['stroke-linejoin', 'round'],
    ],
  );
  const pathConfig2 = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M15 18.75C17.0711 18.75 18.75 17.0711 18.75 15C18.75 12.9289 17.0711 11.25 15 11.25C12.9289 11.25 11.25 12.9289 11.25 15C11.25 17.0711 12.9289 18.75 15 18.75Z',
      ],
      ['stroke', 'white'],
      ['stroke-width', '2'],
      ['stroke-linecap', 'round'],
      ['stroke-linejoin', 'round'],
    ],
  );
  symbolConfig.append(pathConfig1, pathConfig2);
  return symbolConfig;
}

function createSprintSymbol() {
  const symbolSptrint = createSVG(
    'symbol',
    [],
    [
      ['viewBox', '0 0 94 126'],
      ['id', 'burger_sprint-icon'],
    ],
  );
  const pathSptrint1 = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M67.3125 28.625C71.0421 28.625 74.619 27.1434 77.2562 24.5062C79.8934 21.869 81.375 18.2921 81.375 14.5625C81.375 10.8329 79.8934 7.25604 77.2562 4.61881C74.619 1.98158 71.0421 0.5 67.3125 0.5C63.5829 0.5 60.006 1.98158 57.3688 4.61881C54.7316 7.25604 53.25 10.8329 53.25 14.5625C53.25 18.2921 54.7316 21.869 57.3688 24.5062C60.006 27.1434 63.5829 28.625 67.3125 28.625V28.625Z',
      ],
    ],
  );
  const pathSptrint2 = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M39.0624 42.0062C35.1655 42.975 32.5062 44.4312 30.3593 46.2375C27.1405 48.95 24.5405 52.8625 21.028 59.0125C20.2055 60.4517 18.8448 61.5052 17.2455 61.9412C15.6462 62.3772 13.9391 62.1601 12.4999 61.3375C11.0607 60.5149 10.0072 59.1543 9.57118 57.5549C9.13515 55.9556 9.35232 54.2486 10.1749 52.8094C13.6718 46.6937 17.2062 40.9719 22.3093 36.6781C27.6343 32.1906 34.153 29.6531 42.9437 28.675C46.6187 28.2687 50.6624 28.35 54.453 30.0406C58.4312 31.8187 61.3374 35.0031 63.3187 39.2594C65.9874 44.9875 67.9718 48.3969 69.5593 50.3719C70.3249 51.3219 70.8593 51.7625 71.1624 51.9594C71.403 52.1156 71.5062 52.1281 71.5437 52.1344H71.5468C71.8187 52.1656 72.6999 52.1344 75.2874 50.9875C76.4155 50.4875 77.6468 49.8875 79.153 49.1531L79.5124 48.9781C81.3545 48.0691 83.2132 47.1939 85.0874 46.3531C86.6006 45.6888 88.3152 45.6509 89.8563 46.2475C91.3974 46.8441 92.6394 48.0268 93.3108 49.5368C93.9821 51.0469 94.0281 52.7613 93.4387 54.3052C92.8493 55.849 91.6724 57.0966 90.1655 57.775C88.4288 58.5545 86.7066 59.3661 84.9999 60.2094L84.5905 60.4094C83.1499 61.1125 81.6999 61.8219 80.3405 62.4219C77.528 63.6656 73.9343 65.0156 70.0374 64.5437C65.9249 64.0437 62.7562 61.7219 60.1468 58.6062L51.6062 75.0844L63.4187 90.4531C64.1218 91.3719 64.5562 92.4656 64.678 93.6156L67.278 118.603C67.3771 119.426 67.3113 120.261 67.0846 121.059C66.8579 121.856 66.4747 122.601 65.9574 123.249C65.4401 123.897 64.799 124.436 64.0715 124.833C63.3439 125.231 62.5445 125.48 61.7197 125.566C60.895 125.652 60.0614 125.573 59.2676 125.333C58.4737 125.094 57.7354 124.699 57.0958 124.171C56.4561 123.643 55.9278 122.994 55.5417 122.26C55.1556 121.526 54.9194 120.723 54.8468 119.897L52.428 96.6687L45.253 87.3312L45.1905 87.4469L44.928 86.9094L31.6718 69.6594C31.0201 68.8115 30.5969 67.8106 30.4426 66.7525C30.2883 65.6943 30.4081 64.6143 30.7905 63.6156L39.0624 42.0062V42.0062Z',
      ],
    ],
  );
  const pathSptrint3 = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M29.5998 78.6469L24.9998 91.0218L6.87479 89.5844C6.05073 89.5078 5.21968 89.5957 4.42987 89.843C3.64005 90.0902 2.9072 90.4918 2.27384 91.0245C1.64049 91.5572 1.11924 92.2104 0.740345 92.9462C0.361452 93.682 0.132461 94.4857 0.0666609 95.3107C0.000860959 96.1356 0.0995618 96.9655 0.357037 97.752C0.614512 98.5385 1.02563 99.2661 1.56654 99.8925C2.10745 100.519 2.76737 101.032 3.50802 101.401C4.24866 101.77 5.05527 101.989 5.88104 102.044L28.7185 103.856C30.0739 103.964 31.4275 103.627 32.574 102.896C33.7205 102.165 34.5974 101.08 35.0717 99.8062L38.5873 90.3437L29.5998 78.6469Z',
      ],
    ],
  );
  symbolSptrint.append(pathSptrint1, pathSptrint2, pathSptrint3);
  return symbolSptrint;
}

function createAudiocallSymbol() {
  const symbolAudiocall = createSVG(
    'symbol',
    [],
    [
      ['viewBox', '0 0 81 81'],
      ['id', 'burger_audiocall-icon'],
    ],
  );
  const pathAudiocall = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M40.5 7.0625C31.6318 7.0625 23.1269 10.5854 16.8561 16.8561C10.5854 23.1269 7.0625 31.6318 7.0625 40.5V47.1875H13.75C15.5236 47.1875 17.2246 47.8921 18.4788 49.1462C19.7329 50.4004 20.4375 52.1014 20.4375 53.875V73.9375C20.4375 75.7111 19.7329 77.4121 18.4788 78.6663C17.2246 79.9204 15.5236 80.625 13.75 80.625H7.0625C5.28886 80.625 3.58787 79.9204 2.33372 78.6663C1.07957 77.4121 0.375 75.7111 0.375 73.9375V40.5C0.375 35.2307 1.41286 30.013 3.42933 25.1448C5.4458 20.2766 8.40139 15.8533 12.1273 12.1273C15.8533 8.40139 20.2766 5.4458 25.1448 3.42933C30.013 1.41286 35.2307 0.375 40.5 0.375C45.7693 0.375 50.987 1.41286 55.8552 3.42933C60.7234 5.4458 65.1467 8.40139 68.8727 12.1273C72.5986 15.8533 75.5542 20.2766 77.5707 25.1448C79.5871 30.013 80.625 35.2307 80.625 40.5V73.9375C80.625 75.7111 79.9204 77.4121 78.6663 78.6663C77.4121 79.9204 75.7111 80.625 73.9375 80.625H67.25C65.4764 80.625 63.7754 79.9204 62.5212 78.6663C61.2671 77.4121 60.5625 75.7111 60.5625 73.9375V53.875C60.5625 52.1014 61.2671 50.4004 62.5212 49.1462C63.7754 47.8921 65.4764 47.1875 67.25 47.1875H73.9375V40.5C73.9375 31.6318 70.4146 23.1269 64.1439 16.8561C57.8731 10.5854 49.3682 7.0625 40.5 7.0625V7.0625Z',
      ],
    ],
  );
  symbolAudiocall.append(pathAudiocall);
  return symbolAudiocall;
}

function createHideBurgerSymbol() {
  const symbolBurgerHide = createSVG(
    'symbol',
    [],
    [
      ['viewBox', '0 0 59 61'],
      ['id', 'burger_hide-icon'],
    ],
  );
  const pathBurgerHide = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M29.7513 60.2803C45.9241 60.2803 59 47.0177 59 30.6138C59 14.21 45.9241 0.947266 29.7513 0.947266C13.5785 0.947266 0.502594 14.21 0.502594 30.6138C0.502594 47.0177 13.5785 60.2803 29.7513 60.2803ZM29.7513 4.43745C44.0315 4.43745 55.559 16.1296 55.559 30.6138C55.559 45.0981 44.0315 56.7902 29.7513 56.7902C15.471 56.7902 3.94362 45.0981 3.94362 30.6138C3.94362 16.1296 15.471 4.43745 29.7513 4.43745ZM28.2075 43.5174L30.9807 41.2347L21.2238 32.3585H45.2354V28.8683H21.2242L30.9807 19.9924L28.2075 17.7097L13.7756 30.6136L28.2075 43.5174Z',
      ],
      ['fill-rule', 'evenodd'],
      ['clip-rule', 'evenodd'],
    ],
  );
  symbolBurgerHide.append(pathBurgerHide);
  return symbolBurgerHide;
}

/*
<svg width="59" height="61" viewBox="0 0 59 61" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M29.7513 60.2803C45.9241 60.2803 59 47.0177 59 30.6138C59 14.21 45.9241 0.947266 29.7513 0.947266C13.5785 0.947266 0.502594 14.21 0.502594 30.6138C0.502594 47.0177 13.5785 60.2803 29.7513 60.2803ZM29.7513 4.43745C44.0315 4.43745 55.559 16.1296 55.559 30.6138C55.559 45.0981 44.0315 56.7902 29.7513 56.7902C15.471 56.7902 3.94362 45.0981 3.94362 30.6138C3.94362 16.1296 15.471 4.43745 29.7513 4.43745ZM28.2075 43.5174L30.9807 41.2347L21.2238 32.3585H45.2354V28.8683H21.2242L30.9807 19.9924L28.2075 17.7097L13.7756 30.6136L28.2075 43.5174Z" fill="black"/>
</svg>
 */
