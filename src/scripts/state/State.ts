import { IState } from './IState';

export class State {
  private static _instance: State;

  private _state: IState;

  public get state(): IState {
    return this._state;
  }

  public get colorScheme() {
    return this._state.colorScheme;
  }

  public set colorScheme(value: string) {
    this._state.colorScheme = value;
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  public get lang() {
    return this._state.lang;
  }

  public set lang(value: string) {
    this._state.lang = value;
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  constructor() {
    if (State._instance) {
      return State._instance;
    }
    State._instance = this;
    if (!localStorage.getItem('state')) {
      this.resetState();
    } else {
      this._state = JSON.parse(localStorage.getItem('state'));
    }
  }

  resetState() {
    this._state = {
      animationType: 'normal',
      lang: 'ru',
      colorScheme: 'light',
    };
    localStorage.setItem('state', JSON.stringify(this.state));
  }
}
