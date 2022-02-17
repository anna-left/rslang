import { IViewManager } from '../../manager/IViewManager';
import { createElement, createSVG } from '../../util/Util';
import { Auth } from '../auth/AuthView';

import './about.scss';

export class About {
  constructor(manager:IViewManager) {
    const root = manager.main.mainBox
    root.innerHTML = '';
    const section = createElement('section', ['main-box__section', 'main-box__section_type_about', 'section-about']);
    const aboutBox = createElement('div', ['section-about__content-box']);
    const imageBox = createElement('div', ['section-about__image-box']);

    const aboutHeader = createElement('h1', ['section-about__content-header'], [], 'RS Lang');

    const aboutInfo = createElement(
      'p',
      ['section-about__content-info'],
      [],
      'Убедитесь, что изучение английского - это совсем не скучно. Проводите время весело и с пользой! Играйте в увлекательные игры. Изучайте английский и следите за своим прогрессом.',
    );

    const btnAuth = createElement('btn', ['section-about__btn-auth'], [], 'Регистрация');
    btnAuth.addEventListener('click', () => new Auth(manager));
    const image = createElement('img', ['section-about__image'], [['src', './assets/img/humans2.webp']]);

    const svgSpot = createSVG('svg', ['section-about__spot']);
    const svgUse = createSVG('use', [], [['href', '#about-spot']]);

    const svgHidden = createSVG('svg', [], [['display', 'none']]);
    const svgHiddenSymbol = createSVG(
      'symbol',
      [],
      [
        ['viewBox', '0 0 790 715'],
        ['id', 'about-spot'],
      ],
    );
    const svgHiddenPath = createSVG(
      'path',
      [],
      [
        [
          'd',
          'M776.202 150.764C816.856 252.082 673.435 325.05 629.366 424.79C589.213 515.671 625.512 647.994 536.803 692.597C442.092 740.217 334.262 673.725 243.377 618.864C141.46 557.344 27.5631 491.202 8.46005 373.672C-12.2241 246.415 42.2125 106.918 148.324 34.0591C244.041 -31.6631 364.928 29.2372 479.169 50.4713C587.235 70.5579 735.225 48.6437 776.202 150.764Z',
        ],
      ],
    );

    svgHiddenSymbol.append(svgHiddenPath);
    svgHidden.append(svgHiddenSymbol);
    imageBox.append(svgHidden);
    svgSpot.append(svgUse);
    imageBox.append(image, svgSpot, svgHidden);
    aboutBox.append(aboutHeader, aboutInfo, btnAuth);
    section.append(aboutBox, imageBox);
    root.append(section);
  }
}
