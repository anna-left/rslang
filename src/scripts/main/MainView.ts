import { createElement } from '../util/Util';
import { getHiddenSvgs } from './MainUtil';

export class MainView {
  constructor() {
    const main = createElement('main', ['main']);
    const mainInnerContainer = createElement('div', ['main__box', 'main-box']);
    main.append(getHiddenSvgs(), mainInnerContainer);
    document.body.append(main);
  }
}
