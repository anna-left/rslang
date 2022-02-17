import { API } from './../../api/API';
import { IAuthInputs, IAuthLabels } from './IAuth';
import { IUserSchema, TUserInfo } from '../../types/types';

const labelsText = {
  name: 'Имя пользователя',
  email: 'Почта пользователя',
  password: 'Пароль пользователя',
  passwordRepeat: 'Повторите пароль',
};

const CLASS_INPUT_ERROR = 'input_error';
const CLASS_INPUT_CLEAR = 'input_clear';

export function authInputHandler(mode: string, inputs: IAuthInputs, labels: IAuthLabels) {
  authHandler(mode, inputs, labels);
}

export async function authBtnHandler(mode: string, inputs: IAuthInputs, labels: IAuthLabels) {
  authHandler(mode, inputs, labels);
  if (mode === 'register') {
    if (
      labels.name.classList.contains(CLASS_INPUT_CLEAR) &&
      labels.email.classList.contains(CLASS_INPUT_CLEAR) &&
      labels.password.classList.contains(CLASS_INPUT_CLEAR)
    ) {
      const api = new API();
      const user: IUserSchema = { name: inputs.name.value, email: inputs.email.value, password: inputs.password.value };
      await api.createUser(user);
    } else {
    }
  } else {
    if (labels.email.classList.contains(CLASS_INPUT_CLEAR) && labels.password.classList.contains(CLASS_INPUT_CLEAR)) {
      const api = new API();
      const user: TUserInfo = { email: inputs.email.value, password: inputs.password.value };
      const userData = await api.signIn(user);
      sessionStorage.setItem('userData', JSON.stringify(userData));
      window.dispatchEvent(new CustomEvent('login'));
    } else {
    }
  }
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
  } else if (value.length >= 5 && !/.com$|.ru$|.by$|.kz$|.ua$|.us$/.test(value)) {
    setError(emailLabel, 'неправильное окончание почты');
  } else {
    setPass(emailLabel, labelsText.email);
  }
}
function passwordInputHandler(pass: HTMLInputElement, passLabel: HTMLElement): any {
  const value = pass.value;
  if (value.length < 8) {
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
