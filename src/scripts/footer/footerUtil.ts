import { createElement, createSVG } from '../util/Util';

export function createRSItem() {
  const rsItem = createElement('li', ['footer-box__item', 'footer-box__item_course']);
  const rsLink = createElement(
    'a',
    ['footer-box__link'],
    [
      ['href', 'https://rs.school/js/'],
      ['target', '_blank'],
    ],
  );
  const rsIcon = createSVG('svg', ['rs-icon']);
  const rsUse = createSVG('use', [], [['href', '#rs-icon']]);
  rsIcon.append(rsUse);
  rsLink.append(rsIcon);
  rsItem.append(rsLink);
  return rsItem;
}

export function createGitItem() {
  const gitItem = createElement('li', ['footer-box__item', 'footer-box__item_git']);
  const gitSvg = createSVG('svg', ['git-icon']);
  const gitSvgUse = createSVG('use', [], [['href', '#git-icon']]);
  gitSvg.append(gitSvgUse);
  const authors = getAuthors();
  gitItem.append(gitSvg, authors);
  return gitItem;
}

export function getAuthors() {
  const lordsCastle = createElement('div', ['footer-box__info-author-wrapper']);

  const lordAndreyRoom = createElement(
    'a',
    ['footer-box__link'],
    [
      ['href', 'https://github.com/ts-andrey'],
      ['target', '_blank'],
    ],
  );
  const ladyAnnaRoom = createElement(
    'a',
    ['footer-box__link'],
    [
      ['href', 'https://github.com/anna-left'],
      ['target', '_blank'],
    ],
  );
  const lordValentinRoom = createElement(
    'a',
    ['footer-box__link'],
    [
      ['href', 'https://github.com/valentine909'],
      ['target', '_blank'],
    ],
  );

  const lordAndreySign = createElement('p', ['footer-box__info-author'], [], 'Andrei Tsakunou');
  const ladyAnnaSign = createElement('p', ['footer-box__info-author'], [], 'Anna Rybakova');
  const lordValentinSign = createElement('p', ['footer-box__info-author'], [], 'Valiantsin Nazarau');

  lordAndreyRoom.append(lordAndreySign);
  ladyAnnaRoom.append(ladyAnnaSign);
  lordValentinRoom.append(lordValentinSign);

  lordsCastle.append(lordAndreyRoom, ladyAnnaRoom, lordValentinRoom);
  return lordsCastle;
}

export function getHiddenSvgs() {
  const svgHidden = createSVG('svg', [], [['display', 'none']]);

  svgHidden.append(createRSSymbol(), createGitSymbol());
  return svgHidden;
}

function createRSSymbol() {
  const symbolRS = createSVG(
    'symbol',
    [],
    [
      ['viewBox', '0 0 198 72'],
      ['id', 'rs-icon'],
    ],
  );
  const pathRS = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M112.252 0.678008C106.585 2.00096 103.77 5.00207 103.742 9.75205C103.71 15.2831 106.793 17.823 116.679 20.413C121.484 21.671 123.118 23.8515 120.845 25.9696C118.265 28.3721 113.217 26.814 112.581 23.4166C112.266 21.7211 112.282 21.7261 106.987 22.0221L102.295 22.2835L102.521 23.7685C102.868 26.0575 104.748 29.5915 106.35 30.9695C111.097 35.051 124.17 34.6325 128.645 30.2525L129.954 28.9715L130.205 30.4605C131.126 35.939 136.663 41.0861 143.032 42.3861L145.078 42.8046L143.869 44.3956C139.881 49.6446 139.768 60.3796 143.643 65.9551C149.573 74.4856 166.261 74.2381 171.752 65.539L172.774 63.9201V71.6415H198.637V63.3396H183.191V39.1531H172.774L172.753 42.8531C172.735 45.8756 172.654 46.424 172.305 45.8476C170.326 42.585 166.471 39.8742 162.693 39.0906L160.657 38.6671L162.723 37.1066C169.153 32.2505 173.157 23.3911 172.128 16.2986C169.424 -2.34037 142.708 -2.62897 132.532 15.8686C131.876 17.0591 131.317 18.0721 131.29 18.119C131.262 18.1659 130.346 17.3329 129.253 16.2715C126.987 14.0654 125.166 13.258 118.978 11.718C113.221 10.284 112.043 9.27845 113.978 7.44901C115.819 5.71001 119.827 6.83645 120.729 9.34752C121.259 10.8185 121.162 10.8045 127.283 10.3975L130.822 10.1615L130.597 8.74401C129.552 2.17692 121.327 -1.44004 112.25 0.680475L112.252 0.678008ZM2.15591 17.1315V33.3745H12.573V20.3785H13.6317C15.3025 20.3785 16.3129 21.6134 19.5341 27.5984L22.5466 33.192L28.3386 33.2915C31.5237 33.3465 34.128 33.2939 34.128 33.1755C34.128 31.3461 27.6366 20.7896 25.8349 19.6894L24.8474 19.0859L26.8405 18.0384C34.2295 14.1509 32.8304 3.01394 24.7328 1.26836C23.7109 1.04883 18.5359 0.884386 12.555 0.884386H2.15591V17.1274V17.1315ZM159.874 3.71612C176.131 7.98016 174.643 30.9021 157.563 39.2707C140.162 47.7971 124.654 33.7996 132.925 17.0337C137.751 7.25167 150.094 1.15161 159.871 3.71859L159.874 3.71612ZM19.7509 8.20956C23.4098 10.0686 20.9823 13.5006 15.7999 13.7966L12.5738 13.9816V7.74501L15.7173 7.74994C17.5165 7.75241 19.2404 7.94892 19.7509 8.20792V8.20956ZM154.123 11.0816C151.263 11.8446 148.354 14.7495 148.352 16.8445C148.347 20.2675 151.07 21.5016 155.354 20.02C157.975 19.1139 158.642 19.1139 159.127 20.0224C159.949 21.5674 157.256 23.1419 155.685 22.0344C154.896 21.4794 151.985 23.2299 151.955 24.2774C151.909 25.8545 155.881 26.4514 158.313 25.2329C166.039 21.3643 163.845 13.0599 155.833 15.8373C152.629 16.9473 151.941 16.9958 151.941 16.1029C151.941 14.7018 154.12 13.6889 155.071 14.6435C155.459 15.034 158.405 13.0714 158.405 12.421C158.405 11.4499 155.796 10.631 154.12 11.0799L154.123 11.0816ZM142.528 18.8705C140.814 20.117 140.733 19.793 143.876 24.2774C145.811 27.036 146.555 28.3984 146.482 29.0439C146.353 30.1473 145.122 30.4408 144.256 29.5734C143.706 29.0208 143.563 29.0644 142.261 30.1859C138.973 33.0168 143.971 35.4465 147.685 32.8244C151.765 29.9434 151.772 28.1559 147.715 22.203C144.569 17.5845 144.425 17.4925 142.526 18.873L142.528 18.8705ZM10.6724 38.7995C4.79537 39.7311 1.35491 43.1844 1.3091 48.1975C1.26328 53.3126 4.56301 56.2265 12.7366 58.2821C17.7464 59.5425 19.3958 60.5045 19.3958 62.1621C19.3958 66.8307 11.0798 66.3637 10.2003 61.6466C9.89182 60.0005 9.9311 60.0096 4.62682 60.2982L-0.0769043 60.5547L0.157914 62.0347C1.23055 68.8197 5.15619 71.6432 13.9026 71.9186C20.8383 72.1357 23.2225 71.4607 26.2506 68.4176L28.3238 66.3341L29.0856 67.3676C33.4923 73.3567 48.3783 73.7596 53.2661 68.0197C54.6955 66.3431 56.2991 63.1842 56.4627 61.7297C56.5781 60.7052 56.5454 60.6871 52.1894 59.3592L47.8015 58.0206L47.2124 59.8015C45.2054 65.872 37.6282 65.9411 35.964 59.906C35.3978 57.8545 35.4666 52.9549 36.0925 50.8434C37.602 45.7399 43.9781 44.6924 46.5652 49.125C47.6444 50.975 47.3547 50.9405 52.2516 49.828C56.9136 48.769 56.7131 48.9564 55.6503 46.655C51.4342 37.5391 37.2616 35.4005 29.7466 42.7421L27.6505 44.7911L26.7807 43.2995C24.6134 39.5806 17.7766 37.6706 10.6773 38.7995H10.6724ZM109.916 38.8086C105.937 39.5025 102.007 42.0185 99.7863 45.2901C99.1923 46.1666 99.1767 46.0951 99.1579 42.6697L99.1391 39.1498H88.722V50.3402H78.3049V39.1498H67.8878V71.6383H78.3049V58.6422H88.722V71.6383H99.1391V64.2933L100.264 65.9978C104.945 73.0969 119.421 74.3434 126.009 68.2129C133.633 61.1204 132.137 44.9859 123.443 40.5278C120.088 38.8069 114.199 38.0579 109.915 38.8053L109.916 38.8086ZM16.5134 45.4645C17.1139 45.7769 17.8184 46.623 18.2005 47.4929L18.8566 48.9869L25.875 48.6473L25.6451 50.4882C25.3416 52.9237 25.2057 53.0157 23.1922 52.1212C22.2439 51.7002 19.5906 50.8837 17.2923 50.3032C11.8546 48.9342 11.178 48.6407 10.8998 47.5282C10.3844 45.4702 13.9811 44.1473 16.5166 45.4653L16.5134 45.4645ZM116.076 46.7405C121.396 48.2255 122.474 60.4955 117.54 63.4136C113.856 65.5916 109.194 63.7375 108.101 59.656C105.928 51.5464 109.953 45.032 116.076 46.7405V46.7405ZM159.505 46.7315C165.686 48.4565 165.56 62.4146 159.349 64.096C154.356 65.4461 151.033 61.9591 151.058 55.3961C151.086 48.5766 154.301 45.2786 159.506 46.7331L159.505 46.7315Z',
      ],
    ],
  );
  symbolRS.append(pathRS);
  return symbolRS;
}

function createGitSymbol() {
  const symbolBook = createSVG(
    'symbol',
    [],
    [
      ['viewBox', '0 0 72 71'],
      ['id', 'git-icon'],
    ],
  );
  const pathBook = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M47.375 69.775H47.05L46.725 69.45V67.5C46.725 65.55 46.725 62.625 46.725 59.375C46.725 57.1 46.4 55.15 45.425 53.525C52.9 52.225 61.025 48.325 61.025 33.7C61.025 29.8 59.725 26.225 57.45 23.3C58.1 21.35 58.425 17.775 56.8 13.225C56.475 12.9 56.15 12.575 55.825 12.25C55.825 12.25 55.175 11.925 54.525 11.925C52.575 11.925 49.65 12.575 44.775 15.825C42.175 15.5 39.25 14.85 36 14.85C32.75 14.85 29.825 15.175 26.9 15.825C22.35 12.9 19.1 12.25 17.15 12.25C16.5 12.25 16.175 12.575 15.85 12.575C15.525 12.575 14.875 13.225 14.875 13.55C13.25 18.1 13.575 21.675 14.225 23.625C11.95 26.55 10.65 30.125 10.65 34.025C10.65 48.325 19.1 52.225 26.25 53.85C25.925 54.5 25.6 55.475 25.275 56.45C24.625 56.775 23.65 57.1 22.35 57.1C21.05 57.1 19.75 56.775 18.775 55.8L18.45 55.475C18.125 55.15 18.125 54.825 17.8 54.825L17.475 54.5L17.15 54.175C17.15 53.85 14.55 49.95 10 49.625C8.375 49.625 7.075 50.275 6.75 51.25C6.1 52.875 8.05 54.175 9.025 54.825C9.025 54.825 10.975 55.8 12.275 59.375C12.925 61.65 15.85 65.875 22.675 65.875C23.325 65.875 23.975 65.875 24.95 65.875V70.425L24.625 70.75C24.625 70.75 24.3 70.75 24.625 70.75C10 64.9 0.25 51.25 0.25 35.975C0.25 16.15 16.175 0.224976 36 0.224976C55.825 0.224976 71.75 16.15 71.75 35.975C71.75 51.25 62 64.9 47.375 69.775Z',
      ],
    ],
  );
  symbolBook.append(pathBook);
  return symbolBook;
}
