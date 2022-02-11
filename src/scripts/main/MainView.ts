import { createElement } from '../util/Util';
import { getHiddenSvgs } from './MainUtil';

export class MainView {
  main: HTMLElement;
  mainInnerContainer: HTMLElement;
  constructor() {
    this.main = createElement('main', ['main']);
    this.mainInnerContainer = createElement('div', ['main__box', 'main-box']);
    this.main.append(getHiddenSvgs(), this.mainInnerContainer);
    document.body.append(this.main);
  }
}
