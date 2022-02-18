import { IUserData } from './../types/types';
import { IViewManager } from '../manager/IViewManager';
import { createElement } from '../util/Util';

import './header.scss';
import { getHiddenSvg, getNavList, getUserAuth, getUserUnauth } from './headerBuilder';

export class HeaderView {
  header: HTMLElement;

  headerBox: HTMLElement;

  user: HTMLElement;

  userText: HTMLElement;

  constructor() {
    this.header = createElement('header', ['header']);
    this.headerBox = createElement('div', ['header__box']);
    this.user = createElement('div', ['header__user', 'user-box']);
  }

  render(manager: IViewManager) {
    if (!this.header) {
      this.header = createElement('header', ['header']);
    }
    if (!this.headerBox) {
      this.headerBox = createElement('div', ['header__box']);
    }
    if (!this.user) {
      this.user = createElement('div', ['header__user', 'user-box']);
    }
    try {
      const userData: IUserData = JSON.parse(sessionStorage.getItem('userData'));
      if (userData !== undefined) {
        this.user.append(...setUserAuth(this.user, userData.name, manager));
      } else {
        this.user.append(getUserUnauth());
      }
    } catch (error) {
      console.log(error);
      this.user.append(getUserUnauth());
    }
    this.headerBox.append(getHiddenSvg());
    const headerNav = createElement('nav', ['header__nav']);
    const headerNavList = getNavList(manager);

    headerNav.append(headerNavList);
    this.headerBox.append(headerNav, this.user);
    this.header.append(this.headerBox);
    document.body.append(this.header);
  }

  userAuthorize(userName: string, manager: IViewManager) {
    this.user.append(...setUserAuth(this.user, userName, manager));
  }

  userUnauthorize() {
    this.user.innerHTML = '';
    this.user.append(getUserUnauth());
  }
}

function setUserAuth(person: HTMLElement, userName: string, manager: IViewManager) {
  const NAV_ACTIVE_CLASS = 'user-box__navigation_state_active';
  person.innerHTML = '';
  const [user, nav] = getUserAuth(userName, manager);
  person.addEventListener('mouseover', () => {
    nav.classList.add(NAV_ACTIVE_CLASS);
  });
  person.addEventListener('mouseleave', () => {
    nav.classList.remove(NAV_ACTIVE_CLASS);
  });
  return [user, nav];
}
