import { createElement, regEventSeeker } from '../../util/Util';
import { IAuthInputs, IAuthLabels } from './IAuth';

export class Auth {
  constructor(
    rootEl: HTMLElement,
    mode: string,
    inputHandler: (mode: string, inputs: IAuthInputs, labels: IAuthLabels) => void,
    btnInputHandler: (mode: string, inputs: IAuthInputs, labels: IAuthLabels) => void,
  ) {
    rootEl.innerHTML = '';
    const auth = createElement('section', ['main-box__section', 'main-box__section_type_auth', 'section-auth']);
    const inputBox = createElement('div', ['section-auth__input-box']);

    const inputEmail = <HTMLInputElement>createElement(
      'input',
      ['section-auth__input', 'section-auth__input_type_email'],
      [
        ['placeholder', 'введите почту'],
        ['type', 'email'],
        ['id', 'email-input'],
      ],
    );
    const inputPassword = <HTMLInputElement>createElement(
      'input',
      ['section-auth__input', 'section-auth__input_type_password'],
      [
        ['placeholder', 'введите пароль'],
        ['type', 'password'],
        ['id', 'pass-input'],
      ],
    );
    const inputPasswordRepeat = <HTMLInputElement>createElement(
      'input',
      ['section-auth__input', 'section-auth__input_type_password'],
      [
        ['placeholder', 'повторите пароль'],
        ['type', 'password'],
        ['id', 'pass-again-input'],
      ],
    );

    const labelEmail = createElement('label', ['section-auth__label'], [['for', '#email-input']], 'Почта пользователя');
    const labelPassword = createElement(
      'label',
      ['section-auth__label'],
      [['for', '#pass-input']],
      'Пароль пользователя',
    );
    const labelPasswordRepeat = createElement(
      'label',
      ['section-auth__label'],
      [['for', '#pass-again-input']],
      'Повторите пароль',
    );

    const btnSend = createElement(
      'button',
      ['section-auth__btn-send'],
      [],
      mode === 'register' ? 'Зарегистрироваться' : 'Вход',
    );

    if (mode === 'register') {
      const inputName = <HTMLInputElement>createElement(
        'input',
        ['section-auth__input', 'section-auth__input_type_name'],
        [
          ['placeholder', 'введите имя'],
          ['id', 'name-input'],
        ],
      );
      const labelName = createElement('label', ['section-auth__label'], [['for', '#name-input']], 'Имя пользователя');
      inputBox.append(
        labelName,
        inputName,
        labelEmail,
        inputEmail,
        labelPassword,
        inputPassword,
        labelPasswordRepeat,
        inputPasswordRepeat,
        btnSend,
      );
      regEventSeeker(
        () => {
          inputHandler(
            mode,
            { email: inputEmail, password: inputPassword, passwordRepeat: inputPasswordRepeat, name: inputName },
            { email: labelEmail, password: labelPassword, passwordRepeat: labelPasswordRepeat, name: labelName },
          );
        },
        [inputEmail, inputPassword, inputPasswordRepeat, inputName],
        'click',
      );
      btnSend.addEventListener('click', () =>
        btnInputHandler(
          mode,
          { email: inputEmail, password: inputPassword, passwordRepeat: inputPasswordRepeat, name: inputName },
          { email: labelEmail, password: labelPassword, passwordRepeat: labelPasswordRepeat, name: labelName },
        ),
      );
    } else {
      inputBox.append(labelEmail, inputEmail, labelPassword, inputPassword, btnSend);
      regEventSeeker(
        () => {
          inputHandler(
            mode,
            { email: inputEmail, password: inputPassword },
            { email: labelEmail, password: labelPassword },
          );
        },
        [inputEmail, inputPassword],
        'click',
      );
      btnSend.addEventListener('click', () =>
        btnInputHandler(
          mode,
          { email: inputEmail, password: inputPassword },
          { email: labelEmail, password: labelPassword },
        ),
      );
    }

    const imageBox = createElement('div', ['section-auth__image-box']);
    const image = createElement('img', ['section-auth__image'], [['src', '../../../assets/img/humans1.webp']]);
    imageBox.append(image);
    auth.append(inputBox, imageBox);
    rootEl.append(auth);
  }
}
