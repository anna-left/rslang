import { regEventSeeker } from '../../util/Util';
import {
  getBtnSend,
  getEmailInput,
  getEmailLabel,
  getNameInput,
  getNameLabel,
  getPassInput,
  getPassLabel,
  getPassRepeatInput,
  getPassRepeatLabel,
} from './authCommon';
import { authBtnHandler, authInputHandler } from './authContorller';

export class RegisterView {
  constructor(root: HTMLElement, switcher?: HTMLElement) {
    root.innerHTML = '';

    const inputName = getNameInput();
    const inputEmail = getEmailInput();
    const inputPassword = getPassInput();
    const inputPasswordRepeat = getPassRepeatInput();

    const labelName = getNameLabel();
    const labelEmail = getEmailLabel();
    const labelPassword = getPassLabel();
    const labelPasswordRepeat = getPassRepeatLabel();

    const btnSend = getBtnSend('register');

    regEventSeeker(
      () => {
        authInputHandler(
          'register',
          { email: inputEmail, password: inputPassword, passwordRepeat: inputPasswordRepeat, name: inputName },
          { email: labelEmail, password: labelPassword, passwordRepeat: labelPasswordRepeat, name: labelName },
        );
      },
      [inputEmail, inputPassword, inputPasswordRepeat, inputName],
      'click',
    );
    btnSend.addEventListener('click', () =>
      authBtnHandler(
        'register',
        { email: inputEmail, password: inputPassword, passwordRepeat: inputPasswordRepeat, name: inputName },
        { email: labelEmail, password: labelPassword, passwordRepeat: labelPasswordRepeat, name: labelName },
      ),
    );

    root.append(
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
    if (switcher) {
      root.append(switcher);
    }
  }
}
