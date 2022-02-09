import { createElement, createSVG } from '../util/Util';

import { Auth } from './Auth';
import { IAuthInputs, IAuthLabels } from './IAuth';

export class About {
  constructor(
    rootEl: HTMLElement,
    mode: string,
    inputHandler: (mode: string, inputs: IAuthInputs, labels: IAuthLabels) => void,
    btnInputHandler: (mode: string, inputs: IAuthInputs, labels: IAuthLabels) => void,
  ) {
    rootEl.innerHTML = '';
    const section = createElement('section', ['main-box__section', 'main-box__section_type_about', 'section-about']);
    const aboutBox = createElement('div', ['section-about__content-box']);
    const imageBox = createElement('div', ['section-about__image-box']);

    const aboutHeader = createElement('h1', ['section-about__content-header'], [], 'RS Lang');

    const aboutInfo = createElement(
      'p',
      ['section-about__content-info'],
      [],
      'Убедись, что изучение английского - это совсем не скучно. Проводи время весело и с пользой! Играй в увлекательные игры. Изучай английский и следи за своим прогрессом.',
    );

    const btnAuth = createElement('btn', ['section-about__btn-auth'], [], 'Регистрация');
    btnAuth.addEventListener('click', () => new Auth(rootEl, mode, inputHandler, btnInputHandler));
    const image = createElement('img', ['section-about__image'], [['src', '../../../assets/img/humans2.webp']]);

    const svgSpot = createSVG('svg', ['section-about__spot']);
    const svgUse = createSVG('use', [], [['href', '#about-spot']]);

    const svgHidden = createSVG('svg', [], [['display', 'none']]);
    const svgHiddenSymbol = createSVG('symbol', [], [['viewBox', '0 0 775 802']]);
    svgHiddenSymbol.id = 'about-spot';
    const svgHiddenPath = createSVG(
      'path',
      [],
      [
        [
          'd',
          'M415.672 5.07702C523.83 19.681 516.579 180.482 581.595 268.033C640.835 347.807 773.811 381.497 768.866 480.693C763.586 586.602 652.597 647.634 560.077 699.659C456.327 757.998 342.651 824.482 231.019 783.127C110.148 738.349 15.6683 622.162 4.61927 493.882C-5.34749 378.168 107.216 303.015 182.006 214.079C252.754 129.948 306.658 -9.64261 415.672 5.07702Z',
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
    rootEl.append(section);
  }
}