import { IState } from './IState';

export class State {
  private _state: {
    difficulty: string;
    wordsAmount: number;
    currPage: string;
    bookPage: number;
    animationType: string;
    lang: string;
    curLinks: string[];
    isAuth: boolean;
    colorScheme: string;
  };

  public get state(): {
    difficulty: string;
    wordsAmount: number;
    currPage: string;
    bookPage: number;
    animationType: string;
    lang: string;
    curLinks: string[];
    isAuth: boolean;
    colorScheme: string;
  } {
    return this._state;
  }

  public set state(value: {
    difficulty: string;
    wordsAmount: number;
    currPage: string;
    bookPage: number;
    animationType: string;
    lang: string;
    curLinks: string[];
    isAuth: boolean;
    colorScheme: string;
  }) {
    this._state = value;
  }

  // sigle properties changing
  public get difficulty(): string {
    return this._state.difficulty;
  }
  public set difficulty(value: string) {
    this._state.difficulty = value;
  }

  public get wordsAmount(): number {
    return this._state.wordsAmount;
  }
  public set wordsAmount(value: number) {
    this._state.wordsAmount = value;
  }

  public get currPage(): string {
    return this._state.currPage;
  }
  public set currPage(value: string) {
    this._state.currPage = value;
  }

  public get bookPage(): number {
    return this._state.bookPage;
  }
  public set bookPage(value: number) {
    this._state.bookPage = value;
  }

  public get animationType(): string {
    return this._state.animationType;
  }
  public set animationType(value: string) {
    this._state.animationType = value;
  }

  public get lang(): string {
    return this._state.lang;
  }
  public set lang(value: string) {
    this._state.lang = value;
  }

  public get curLinks(): string[] {
    return this._state.curLinks;
  }
  public set curLinks(value: string[]) {
    this._state.curLinks = value;
  }

  public get isAuth(): boolean {
    return this._state.isAuth;
  }
  public set isAuth(value: boolean) {
    this._state.isAuth = value;
  }

  public get colorScheme(): string {
    return this._state.colorScheme;
  }
  public set colorScheme(value: string) {
    this._state.colorScheme = value;
  }

  constructor() {
    this._state = {
      difficulty: 'easy',
      wordsAmount: 20,
      currPage: 'home',
      bookPage: 1,
      animationType: 'normal',
      lang: 'ru',
      curLinks: ['home', 'games'],
      isAuth: false,
      colorScheme: 'light',
    };
  }
}

/* 
    setState(state: State) {
    (Object.keys(state) as (keyof State)[]).forEach(key => {
      Object.assign(this, { [`${key}`]: state[key] });
    });
  }
   */
