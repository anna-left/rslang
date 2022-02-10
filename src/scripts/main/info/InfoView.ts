import { createElement } from '../../util/Util';
import { IInfo } from './IInfo';

import './info.scss';

export class Info {
  constructor(rootEl: HTMLElement) {
    fetch('../../../assets/data/english-info.json').then(async (res) => {
      const data: IInfo = await res.json();
      rootEl.innerHTML = '';
      const section = createElement('section', ['main-box__section_type_info', 'section-info']);
      const header = createElement('h2', ['section-info__header']);
      const infoList = createElement('ul', ['section-info__info-list']);

      for (let i = 0; i < data.info.length; i++) {
        infoList.append(
          createElement('li', ['section-info__info-item'], [['title', data.details[i]]], `${i + 1}. ${data.info[i]}`),
        );
      }

      section.append(header, infoList);
      rootEl.append(section);
    });
  }
}
