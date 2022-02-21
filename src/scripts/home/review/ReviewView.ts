import { createElement } from '../../util/Util';

import './review.scss';

export class Review {
  constructor(rootEl: HTMLElement) {
    rootEl.innerHTML = '';
    const section = createElement('section', ['main-box__section', 'main-box__section_type_review', 'section-review']);
    const header = createElement('h2', ['section-review__header'], [], 'Обзор');
    const videoBox = createElement('div', ['section-review__video-box']);
    const video = createElement(
      'iframe',
      ['section-review__video'],
      [
        ['src', 'https://www.youtube.com/embed/WNvcI_GIS34'],
        ['title', 'YouTube video player'],
        ['frameborder', '0'],
        ['allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'],
      ],
    );
    video.toggleAttribute('allowfullscreen');
    videoBox.append(video);
    section.append(header, videoBox);
    rootEl.append(section);
  }
}
