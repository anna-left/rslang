export interface IAuthInputs {
  name?: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  passwordRepeat?: HTMLInputElement;
}

export interface IAuthLabels {
  name?: HTMLElement;
  email: HTMLElement;
  password: HTMLElement;
  passwordRepeat?: HTMLElement;
}

export interface IAuthSwitcher {
  [key: string]: string;
  register: string;
  login: string;
}
