/* TODO home controller */
import { HomeView } from '../view/home/Home';
import { IAuthInputs, IAuthLabels } from '../view/home/IAuth';
const rootEl: HTMLElement = document.querySelector('.main-box');
const root: HTMLElement = document.querySelector('main');

const CLASS_INPUT_ERROR = 'input_error';
const CLASS_INPUT_CLEAR = 'input_clear';

new HomeView(root, rootEl, authInputHandler, authBtnHandler);

const labelsText = {
  name: 'Имя пользователя',
  email: 'Почта пользователя',
  password: 'Пароль пользователя',
  passwordRepeat: 'Повторите пароль',
};

function authInputHandler(mode: string, inputs: IAuthInputs, labels: IAuthLabels) {
  authHandler(mode, inputs, labels);
}

function authBtnHandler(mode: string, inputs: IAuthInputs, labels: IAuthLabels) {
  authHandler(mode, inputs, labels);
}

function authHandler(mode: string, inputs: IAuthInputs, labels: IAuthLabels) {
  inputs.email.addEventListener('input', () => emailInputHandler(inputs.email, labels.email));
  inputs.password.addEventListener('input', () => passwordInputHandler(inputs.password, labels.password));

  if (mode === 'register') {
    inputs.passwordRepeat.addEventListener('input', () =>
      passwordRepeatInputHandler(inputs.password, inputs.passwordRepeat, labels.passwordRepeat),
    );
    inputs.name.addEventListener('input', () => nameInputHandler(inputs.name, labels.name));
  }
}

function emailInputHandler(email: HTMLInputElement, emailLabel: HTMLElement) {
  const value = email.value;
  if (value.length < 5) {
    setError(emailLabel, 'Слишком короткая почта');
  } else if (value.length >= 5 && !value.includes('@')) {
    setError(emailLabel, 'отсутствует символ "@"');
    // /apple\.com|google\.com|yahoo\.com|facebook\.com/.test(href)
  } else if (value.length >= 5 && !/.com$|.ru$|.by$|.kz$|.ua$|.us$/.test(value)) {
    setError(emailLabel, 'неправильное окончание почты');
  } else {
    setPass(emailLabel, labelsText.email);
  }
}
function passwordInputHandler(pass: HTMLInputElement, passLabel: HTMLElement): any {
  const value = pass.value;
  if (value.length < 5) {
    setError(passLabel, 'Слишком короткий пароль');
  } else {
    setPass(passLabel, labelsText.password);
  }
}

function passwordRepeatInputHandler(
  pass: HTMLInputElement,
  passAgain: HTMLInputElement,
  passAgainLabel: HTMLElement,
): any {
  if (pass.value !== passAgain.value) {
    setError(passAgainLabel, 'Пароли не совпадают!');
  } else {
    setPass(passAgainLabel, labelsText.passwordRepeat);
  }
}
function nameInputHandler(name: HTMLInputElement, nameLabel: HTMLElement): any {
  if (name.value.length < 3) {
    setError(nameLabel, 'Слишком короткое имя');
  } else {
    setPass(nameLabel, labelsText.name);
  }
}

function setError(el: HTMLElement, msg: string) {
  el.innerText = msg;
  el.classList.remove(CLASS_INPUT_CLEAR);
  el.classList.add(CLASS_INPUT_ERROR);
}

function setPass(el: HTMLElement, msg: string) {
  el.innerText = msg;
  el.classList.remove(CLASS_INPUT_ERROR);
  el.classList.add(CLASS_INPUT_CLEAR);
}
