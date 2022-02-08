import { createElement } from '../util/Util';

import { About } from './About';
import { Feature } from './Features';
import { Info } from './Info';
import { Games } from './Games';
import { Review } from './Review';
import { Team } from './Team';

export class HomeView {
  constructor(
    navRootEl: HTMLElement,
    rootEl: HTMLElement,
    authInputHandler: (
      mode: string,
      email: HTMLElement,
      pass: HTMLElement,
      passRepeat?: HTMLElement,
      name?: HTMLElement,
    ) => void,
    authRegisterHandler: (      mode: string,
      email: HTMLElement,
      pass: HTMLElement,
      passRepeat?: HTMLElement,
      name?: HTMLElement,) => void,
  ) {
    new About(rootEl, 'auth', authInputHandler, authRegisterHandler);
    const nav = createElement('nav', ['main__home-navigation', 'home-navigation']);
    const header = createElement('h3', ['home-navigation__header'], [], 'Информация');

    const navBox = createElement('ul', ['home-navigation__list']);

    const aboutLink = createElement('li', ['home-navigation__link'], [['data-type', 'about']], 'Главная');
    const reviewLink = createElement('li', ['home-navigation__link'], [['data-type', 'review']], 'Обзор');
    const featuresLink = createElement('li', ['home-navigation__link'], [['data-type', 'features']], 'Возможности');
    const teamLink = createElement('li', ['home-navigation__link'], [['data-type', 'team']], 'Команда');
    const gamesLink = createElement('li', ['home-navigation__link'], [['data-type', 'games']], 'Игры');
    const infoLink = createElement('li', ['home-navigation__link'], [['data-type', 'info']], 'Интересные факты');

    aboutLink.addEventListener('click', () => new About(rootEl, 'register', authInputHandler, authRegisterHandler));
    featuresLink.addEventListener('click', () => new Feature(rootEl));
    gamesLink.addEventListener('click', () => new Games(rootEl));
    infoLink.addEventListener('click', () => new Info(rootEl));
    reviewLink.addEventListener('click', () => new Review(rootEl));
    teamLink.addEventListener('click', () => new Team(rootEl));

    navBox.append(aboutLink, featuresLink, gamesLink, reviewLink, infoLink, teamLink);
    nav.append(header, navBox);
    navRootEl.append(nav);
  }
}
