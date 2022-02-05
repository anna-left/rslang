import { createElement } from '../util/Util';

export class About {
  constructor(rootEl: HTMLElement) {
    rootEl.innerHTML = '';
    const section = createElement('section', ['main-box__section', 'main-box__section_type_about', 'section-about']);
    const aboutBox = createElement('div', ['section-about__content-box']);

    const aboutHeader = createElement(
      'h1',
      ['section-about__content-header'],
      [],
      'Изучай английский с помощью RS Lang',
    );

    const aboutInfo = createElement(
      'p',
      ['section-about__content-info'],
      [],
      `Проводи время весело и с пользой! Убедись, что изучение английского - это совсем не скучно.
       Мы приготовили для тебя увлекательные игры. Изучай английский и отслеживай свой прогресс.`,
    );

    aboutBox.append(aboutHeader, aboutInfo);
    section.append(aboutBox);
    rootEl.append(section);
  }
}
