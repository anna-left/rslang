import { createElement } from '../util/Util';
import { createGitItem, createRSItem, getHiddenSvgs } from './footerUtil';

export class FooterView {
  constructor() {
    const footer = createElement('footer', ['footer']);
    const footerBox = createElement('div', ['footer__box', 'footer-box']);
    const footerList = createElement('ul', ['footer-box__list']);
    const rsItem = createRSItem();
    const gitItem = createGitItem();
    const yearItem = createElement('li', ['footer-box__item', 'footer-box__item_copy'], [], '©2022 RSLang');

    footerList.append(rsItem, gitItem, yearItem);
    footerBox.append(footerList);
    footer.append(getHiddenSvgs(), footerBox);
    document.body.append(footer);
  }
}
