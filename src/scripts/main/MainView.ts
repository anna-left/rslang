import { createElement } from '../util/Util';
import { getHiddenSvgs } from './MainUtil';

export class MainView {
  main: HTMLElement;
  mainBox: HTMLElement;
  constructor() {
    this.main = createElement('main', ['main']);
    this.mainBox = createElement('div', ['main__box', 'main-box']);
  }
  render() {
    this.main.append(getHiddenSvgs(), this.mainBox);
    document.body.append(this.main);
  }
}
