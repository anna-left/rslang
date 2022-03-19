import { createElement } from '../util/Util';
import { createGitItem, createRSItem, getHiddenSvgs } from './footerUtil';

import './footer.scss';
import { State } from '../state/State';

export class FooterView {
  footer: HTMLElement;

  footerBox: HTMLElement;

  render() {
    this.footer = createElement('footer', ['footer']);
    this.footerBox = createElement('div', ['footer__box', 'footer-box']);
    const footerList = createElement('ul', ['footer-box__list']);
    const rsItem = createRSItem();
    const gitItem = createGitItem();
    const yearItem = createElement('li', ['footer-box__item', 'footer-box__item_copy'], [], '©2022 RSLang');

    footerList.append(rsItem, gitItem, yearItem);
    this.footerBox.append(footerList);
    this.footer.append(getHiddenSvgs(), this.footerBox);
    document.body.append(this.footer);

    const state = new State();

    if (state.colorScheme === 'light') {
      this.footer.style.background = '#EDD7FF';
      this.footerBox.style.color = '#212121';
    } else {
      this.footer.style.background = '#11041C';
      this.footerBox.style.color = '#ffffff54';
    }
  }
}
