import { regEventSeeker } from '../../util/Util';
import { authInputHandler, authBtnHandler } from './authContorller';

import { getBtnSend, getEmailInput, getEmailLabel, getHeader, getPassInput, getPassLabel } from './authCommon';
import { IViewManager } from '../../manager/IViewManager';

export class LoginView {
  constructor(root: HTMLElement, manager: IViewManager, switcher?: HTMLElement) {
    root.innerHTML = '';

    const header = getHeader('Войдите в свой аккаунт RS Lang');

    const inputEmail = getEmailInput();
    const inputPassword = getPassInput();
    const labelEmail = getEmailLabel();
    const labelPassword = getPassLabel();

    const btnSend = getBtnSend('login');

    regEventSeeker(
      () => {
        authInputHandler(
          'login',
          { email: inputEmail, password: inputPassword },
          { email: labelEmail, password: labelPassword },
        );
      },
      [inputEmail, inputPassword],
      'click',
    );

    btnSend.addEventListener('click', (ev) => {
      ev.preventDefault();
      authBtnHandler(
        'login',
        { email: inputEmail, password: inputPassword },
        { email: labelEmail, password: labelPassword },
        manager,
      );
    });

    root.append(header, labelEmail, inputEmail, labelPassword, inputPassword, btnSend);
    if (switcher) {
      root.append(switcher);
    }
  }
}
