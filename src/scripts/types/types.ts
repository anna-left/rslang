export interface IWordSchema {
  id?: string;
  _id?: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export interface IAggregatedWordSchema extends IWordSchema {
  userWord?: IUserWord;
}

export interface IAggregatedWordsSchema extends IAggregatedWordSchema {
  paginatedResults: IAggregatedWordSchema[];
  totalCount: ICount[];
}

export interface ICount {
  count: string;
}

export interface ISprintWord extends IWordSchema {
  gameTranslate: string;
  answer: boolean;
}

export enum StatusCode {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  'Expectation Failed' = 417,
  UnprocessableEntity = 422,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export interface IUserSchema {
  name: string;
  email: string;
  password: string;
}

export type TUserInfo = Omit<IUserSchema, 'name'>;

export interface IUserTokens {
  token: string;
  refreshToken: string;
}

export interface IUserData extends IUserTokens {
  message: string;
  userId: string;
  name: string;
}

export type TWordDifficulty = 'unset' | 'hard' | 'known';

export interface IUserWord {
  difficulty: TWordDifficulty;
  optional?: {
    faced?: 'yes';
    countTowardsKnown?: number;
    totalCountRight?: number;
    totalCountWrong?: number;
  };
  id?: string;
  wordId?: string;
}

export interface IUserStatistics {
  learnedWords?: number;
  optional?: {
    statistics: string;
  };
}

export interface IGameStatistics {
  newWordsCount: number;
  rightWordsCount: number;
  wrongWordsCount: number;
  longestStreak: number;
}

export interface IGeneralStatistics {
  newWordsCount: number;
  rightWordsCount: number;
  wrongWordsCount: number;
  knownWordsCount: number;
}

export interface IOneDayStatistics {
  date: string;
  audiocall?: IGameStatistics;
  sprint?: IGameStatistics;
  general: IGeneralStatistics;
}

export interface IUserSettings {
  wordsPerDay: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  optional: {};
}

export interface TResultWord {
  word: string;
  wordTranslate: string;
  audio: string;
}

export enum HTTPMethod {
  get = 'GET',
  put = 'PUT',
  delete = 'DELETE',
  post = 'POST',
}

export interface FetchInit {
  method: HTTPMethod;
  body?: string;
  headers: Headers;
}

export interface Headers {
  Accept: string;
  'Content-Type': string;
  Authorization: string;
}

declare global {
  interface WindowEventMap {
    'dict-page': CustomEvent;
    'dict-level': CustomEvent;
    'mark-hard': CustomEvent;
    'mark-known': CustomEvent;
    'activate-word': CustomEvent;
    'show-error': CustomEvent;
    login: CustomEvent;
    logout: CustomEvent;
    'go-to-login-screen': CustomEvent;
    'page-to-left': CustomEvent;
    'page-to-right': CustomEvent;
    'audiocall-dict-start': CustomEvent;
    'sprint-dict-start': CustomEvent;
    'sprint-right': CustomEvent;
    'sprint-wrong': CustomEvent;
    'time-over': CustomEvent;
    'sprint-start': CustomEvent;
    'sprint-again': CustomEvent;
    'sprint-workbook': CustomEvent;
    'sprint-forward': CustomEvent;
    'sprint-backward': CustomEvent;
    'sprint-group-select': CustomEvent;
    'sprint-burger-start': CustomEvent;
    'hide-footer': CustomEvent;
    'show-footer': CustomEvent;
    'hide-nav': CustomEvent;
    'show-nav': CustomEvent;
  }
}
