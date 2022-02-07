import { createElement } from '../util/Util';

import { About } from './About';
import { Feature } from './Features';
import { Info } from './Info';
import { Games } from './Games';
import { Review } from './Review';
import { Team } from './Team';

export class HomeView {
  constructor(rootEl: HTMLElement) {
    new About(rootEl);
    const nav = createElement('nav', ['main-box__home-navigation', 'home-navigation']);

    const navBox = createElement('ul', ['home-navigation__list']);

    const aboutLink = createElement('li', ['home-navigation__link'], [['data-type', 'about']]);
    const reviewLink = createElement('li', ['home-navigation__link'], [['data-type', 'review']]);
    const featuresLink = createElement('li', ['home-navigation__link'], [['data-type', 'features']]);
    const teamLink = createElement('li', ['home-navigation__link'], [['data-type', 'team']]);
    const gamesLink = createElement('li', ['home-navigation__link'], [['data-type', 'games']]);
    const infoLink = createElement('li', ['home-navigation__link'], [['data-type', 'info']]);

    aboutLink.addEventListener('click', () => new About(rootEl));
    featuresLink.addEventListener('click', () => new Feature(rootEl));
    gamesLink.addEventListener('click', () => new Games(rootEl));
    infoLink.addEventListener('click', () => new Info(rootEl));
    reviewLink.addEventListener('click', () => new Review(rootEl));
    teamLink.addEventListener('click', () => new Team(rootEl));

    navBox.append(aboutLink, featuresLink, gamesLink, reviewLink, infoLink, teamLink);
    nav.append(navBox);
    rootEl.append(nav);
  }
}
