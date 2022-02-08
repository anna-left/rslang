import { createElement, regEventSeeker } from '../util/Util';

export class Auth {
  constructor(
    rootEl: HTMLElement,
    mode: string,
    inputHandler: (
      mode: string,
      email: HTMLElement,
      pass: HTMLElement,
      passRepeat?: HTMLElement,
      name?: HTMLElement,
    ) => void,
    btnInputHandler: (
      mode: string,
      email: HTMLElement,
      pass: HTMLElement,
      passRepeat?: HTMLElement,
      name?: HTMLElement,
    ) => void,
  ) {
    rootEl.innerHTML = '';
    const auth = createElement('section', ['main-box__section', 'main-box__section_type_auth', 'section-auth']);
    const inputBox = createElement('div', ['auth__input-box']);

    const inputEmail = createElement(
      'input',
      ['auth__input', 'auth__input_type_email'],
      [
        ['placeholder', 'введите почту'],
        ['type', 'email'],
      ],
    );
    const inputPassword = createElement(
      'input',
      ['auth__input', 'auth__input_type_password'],
      [
        ['placeholder', 'введите пароль'],
        ['type', 'password'],
      ],
    );

    const inputPasswordRepeat = createElement(
      'input',
      ['auth__input', 'auth__input_type_password'],
      [
        ['placeholder', 'повторите пароль*'],
        ['type', 'password'],
      ],
    );

    const labelEmail = createElement('label', ['auth__label'], [], 'Почта пользователя');
    const labelPassword = createElement('label', ['auth__label'], [], 'Пароль пользователя');
    const labelPasswordRepeat = createElement('label', ['auth__label'], [], 'Повторите пароль');

    labelEmail.append(inputEmail);
    labelPassword.append(inputPassword);
    labelPasswordRepeat.append(inputPasswordRepeat);

    const btnSend = createElement('button', ['auth__btn-send']);

    if (mode === 'register') {
      const inputName = createElement(
        'input',
        ['auth__input', 'auth__input_type_name'],
        [['placeholder', 'Your name']],
      );
      const labelName = createElement('label', ['auth__label'], [], 'Имя пользователя');
      labelName.append(inputName);
      inputBox.append(labelName, labelEmail, labelPassword, labelPasswordRepeat, btnSend);
      regEventSeeker(
        () => {
          inputHandler(mode, inputEmail, inputPassword, inputPasswordRepeat, inputName);
        },
        [inputEmail, inputPassword, inputPasswordRepeat, inputName],
        'click',
      );
      btnSend.addEventListener('click', () =>
        btnInputHandler(mode, inputEmail, inputPassword, inputPasswordRepeat, inputName),
      );
    } else {
      inputBox.append(labelEmail, labelPassword, btnSend);
      regEventSeeker(
        () => {
          inputHandler(mode, inputEmail, inputPassword);
        },
        [inputEmail, inputPassword],
        'click',
      );
      btnSend.addEventListener('click', () => btnInputHandler(mode, inputEmail, inputPassword));
    }

    const imageBox = createElement('div', ['auth__image-box']);
    const image = createElement('img', ['auth__image-box'], [['src', '../../../assets/img/humans1.webp']]);
    imageBox.append(image);
    auth.append(inputBox, imageBox);
    rootEl.append(auth);
  }
}
