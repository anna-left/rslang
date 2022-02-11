import { createElement } from '../../util/Util';

import './review.scss';

export class Review {
  constructor(rootEl: HTMLElement) {
    rootEl.innerHTML = '';
    const section = createElement('section', ['main-box__section', 'main-box__section_type_review', 'section-review']);
    const videoBox = createElement('div', ['section-review__video-box']);
    section.append(videoBox);
    rootEl.append(section);
  }
}
