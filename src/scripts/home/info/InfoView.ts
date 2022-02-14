import { createElement } from '../../util/Util';
import { IInfo } from './IInfo';

import './info.scss';
import { getHiddenSvgs, getSvgs } from './InfoBuilder';

export class Info {
  constructor(rootEl: HTMLElement) {
    fetch('../../../assets/data/english-info.json').then(async (res) => {
      const data: IInfo = await res.json();
      rootEl.innerHTML = '';
      const section = createElement('section', ['main-box__section_type_info', 'section-info']);
      const header = createElement('h2', ['section-info__header'], [], 'Интересные факты');
      const infoList = createElement('ul', ['section-info__info-list', 'info-list']);

      section.append(getHiddenSvgs());
      const svgs = getSvgs();
      for (let i = 0; i < data.info.length; i++) {
        const item = createElement('li', ['info-list__item'], []);
        const text = createElement(
          'span',
          ['info-list__item_text'],
          [['alt', data.details[i].join('\n')]],
          `${i + 1}. ${data.info[i]}`,
        );
        item.append(svgs[i], text);
        infoList.append(item);
      }

      section.append(header, infoList);
      rootEl.append(section);
    });
  }
}
