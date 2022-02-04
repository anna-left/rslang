import { createElement } from '../util/Util';

export class Info {
  constructor(rootEl: HTMLElement) {
    rootEl.innerHTML = '';
    const header = createElement('h2', ['section-info__header']);
    const info = createElement('p', ['section-info__info']);

    rootEl.append(header, info);
  }
}
