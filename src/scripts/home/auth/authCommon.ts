'use strict';

import { createElement } from '../../util/Util';

export function getImage() {
  const imageBox = createElement('div', ['section-auth__image-box']);
  const image = createElement('img', ['section-auth__image'], [['src', './assets/img/humans1.webp']]);
  imageBox.append(image);
  return imageBox;
}

export function getHeader(content: string) {
  return createElement('h3', ['section-auth__header'], [], `${content}`);
}

/* form elements lies below */

export function getEmailLabel() {
  return createElement('label', ['section-auth__label'], [['for', '#email-input']], 'Почта пользователя');
}
export function getEmailInput() {
  return <HTMLInputElement>createElement(
    'input',
    ['section-auth__input', 'section-auth__input_type_email'],
    [
      ['placeholder', 'введите почту'],
      ['type', 'email'],
      ['id', 'email-input'],
      ['autocomplete', 'auto'],
    ],
  );
}

export function getNameLabel() {
  return createElement('label', ['section-auth__label'], [['for', '#name-input']], 'Имя пользователя');
}
export function getNameInput() {
  return <HTMLInputElement>createElement(
    'input',
    ['section-auth__input', 'section-auth__input_type_name'],
    [
      ['placeholder', 'введите имя'],
      ['id', 'name-input'],
      ['autocomplete', 'off'],
    ],
  );
}

export function getPassLabel() {
  return createElement('label', ['section-auth__label'], [['for', '#pass-input']], 'Пароль пользователя');
}
export function getPassInput() {
  return <HTMLInputElement>createElement(
    'input',
    ['section-auth__input', 'section-auth__input_type_password'],
    [
      ['placeholder', 'введите пароль'],
      ['type', 'password'],
      ['id', 'pass-input'],
      ['autocomplete', 'auto'],
    ],
  );
}

export function getPassRepeatLabel() {
  return createElement('label', ['section-auth__label'], [['for', '#pass-again-input']], 'Повторите пароль');
}
export function getPassRepeatInput() {
  return <HTMLInputElement>createElement(
    'input',
    ['section-auth__input', 'section-auth__input_type_password'],
    [
      ['placeholder', 'повторите пароль'],
      ['type', 'password'],
      ['id', 'pass-again-input'],
      ['autocomplete', 'off'],
    ],
  );
}

export function getBtnSend(mode: string) {
  return createElement('button', ['section-auth__btn-send'], [], mode === 'register' ? 'Зарегистрироваться' : 'Войти');
}
