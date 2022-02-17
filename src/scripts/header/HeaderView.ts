import { IViewManager } from '../manager/IViewManager';
import { createElement } from '../util/Util';

import './header.scss';
import { getNavList, getUserAuth, getUserUnauth } from './headerBuilder';

export class HeaderView {
  header: HTMLElement;
  headerBox: HTMLElement;
  user: HTMLElement;
  userText: HTMLElement;
  constructor() {
    this.header = createElement('header', ['header']);
    this.headerBox = createElement('div', ['header__box']);
    this.user = createElement('div', ['header__user']);
  }
  render(manager: IViewManager) {
    if (!this.header) {
      this.header = createElement('header', ['header']);
    }
    if (!this.headerBox) {
      this.headerBox = createElement('div', ['header__box']);
    }
    if (!this.user) {
      this.user = createElement('div', ['header__user']);
    }

    const headerNav = createElement('nav', ['header__nav']);
    const headerNavList = getNavList(manager);

    headerNav.append(headerNavList);
    this.headerBox.append(headerNav, this.user);
    this.header.append(this.headerBox);
    document.body.append(this.header);
  }
  userAuthorize(userName: string) {
    this.user.innerHTML = '';
    this.user.append(...getUserAuth(userName));
  }
  userUnauthorize() {
    this.user.innerHTML = '';
    this.user.append(...getUserUnauth());
  }
}
