import { regEventSeeker } from '../../util/Util';
import { authInputHandler, authBtnHandler } from './authContorller';

import { getBtnSend, getEmailInput, getEmailLabel, getPassInput, getPassLabel } from './authCommon';

export class LoginView {
  constructor(root: HTMLElement, switcher?: HTMLElement) {
    root.innerHTML = '';

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

    btnSend.addEventListener('click', () =>
      authBtnHandler(
        'login',
        { email: inputEmail, password: inputPassword },
        { email: labelEmail, password: labelPassword },
      ),
    );

    root.append(labelEmail, inputEmail, labelPassword, inputPassword, btnSend);
    if (switcher) {
      root.append(switcher);
    }
  }
}
