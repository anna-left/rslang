import { createElement, regEventSeeker } from '../util/Util';

export class Auth {
  constructor(
    mode: string,
    inputHandler: (el: HTMLElement) => void,
    btnInputHandle: (email: HTMLElement, pass: HTMLElement, name?: HTMLElement) => void,
  ) {
    const inputBox = createElement('div', ['section-about__input-box']);

    const inputEmail = createElement(
      'input',
      ['section-about__input', 'section-about__input_type_email'],
      [
        ['placeholder', 'Your email'],
        ['type', 'email'],
      ],
    );
    const inputPassword = createElement(
      'input',
      ['section-about__input', 'section-about__input_type_password'],
      [
        ['placeholder', 'Your password'],
        ['type', 'password'],
      ],
    );

    const labelEmail = createElement('label', ['section-about__label'], [], 'Введите почту пользователя');
    const labelPassword = createElement('label', ['section-about__label'], [], 'Придумайте пароль');

    labelEmail.append(inputEmail);
    labelPassword.append(inputPassword);

    const btnSend = createElement('button', ['section-about__btn-send']);

    if (mode === 'register') {
      const inputName = createElement(
        'input',
        ['section-about__input', 'section-about__input_type_name'],
        [['placeholder', 'Your name']],
      );
      const labelName = createElement('label', ['section-about__label'], [], 'Введите имя пользователя');
      labelName.append(inputName);
      inputBox.append(labelName, labelEmail, labelPassword, btnSend);
      regEventSeeker(inputHandler, [inputEmail, inputPassword, inputName], 'click');
      btnSend.addEventListener('click', () => btnInputHandle(inputEmail, inputPassword, inputName));
    } else {
      inputBox.append(labelEmail, labelPassword, btnSend);
      regEventSeeker(inputHandler, [inputEmail, inputPassword], 'click');
      btnSend.addEventListener('click', () => btnInputHandle(inputEmail, inputPassword));
    }
    return inputBox;
  }
}
