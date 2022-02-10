import { createElement } from '../../util/Util';

import { getImage } from './authCommon';
import { LoginView } from './LoginView';
import { RegisterView } from './RegisterView';

import './authorize.scss';
import { IAuthSwitcher } from './IAuth';

export class Auth {
  mode: string;
  constructor(rootEl: HTMLElement) {
    this.mode = 'login';
    rootEl.innerHTML = '';
    const auth = createElement('section', ['main-box__section', 'main-box__section_type_auth', 'section-auth']);
    const inputBox = createElement('form', ['section-auth__input-box']);

    new LoginView(inputBox);

    auth.append(inputBox, getImage());
    rootEl.append(auth);
    getModeSwitcher(this.mode, inputBox);
  }
}

function getModeSwitcher(mode: string, rootEl: HTMLElement) {
  const switchTextObj: IAuthSwitcher = { register: 'Ещё не с нами? Тогда ', login: 'Уже с нами? ' };
  const switchLinkObj: IAuthSwitcher = { register: 'зарегистрируйтесь', login: 'Войти' };
  const switchModeBox = createElement('div', ['section-auth__switch-mode-box']);

  const switchModeText = createElement('span', ['switch-mode-box__text'], [], `${switchTextObj[mode]}`);

  const switchModeLink = createElement(
    'span',
    ['switch-mode-box__text', 'switch-mode-box__link'],
    [],
    `${switchLinkObj[mode]}`,
  );

  switchModeBox.append(switchModeText, switchModeLink);
  switchModeLink.addEventListener('click', () => {
    mode === 'register' ? new RegisterView(rootEl, switchModeBox) : new LoginView(rootEl, switchModeBox);
    adaptSwitchContent(mode, switchModeText, switchModeLink, switchTextObj, switchLinkObj);
    mode = mode === 'register' ? 'login' : 'register';
    rootEl.append(switchModeBox);
    console.log(mode);
  });
  rootEl.append(switchModeBox);
  mode = mode === 'register' ? 'login' : 'register';
}

function adaptSwitchContent(
  mode: string,
  textEl: HTMLElement,
  linkEl: HTMLElement,
  textArr: IAuthSwitcher,
  linkArr: IAuthSwitcher,
) {
  textEl.innerText = textArr[mode];
  linkEl.innerText = linkArr[mode];
}
