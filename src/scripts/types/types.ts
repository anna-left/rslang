export interface IWordSchema {
    id?: string,
    _id?: string,
    group: number,
    page: number,
    word: string,
    image: string,
    audio: string,
    audioMeaning: string,
    audioExample: string,
    textMeaning: string,
    textExample: string,
    transcription: string,
    textExampleTranslate: string,
    textMeaningTranslate: string,
    wordTranslate: string,
}

export interface IAggregatedWordSchema extends IWordSchema {
    userWord?: IUserWord
}

export interface IAggregatedWordsSchema extends IAggregatedWordSchema {
    paginatedResults: IAggregatedWordSchema[],
    totalCount: ICount[]
}

export interface ICount {
    count: string
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
    name: string,
    email: string,
    password: string,
}

export type TUserInfo = Omit<IUserSchema, "name">

export interface IUserTokens {
  token: string,
  refreshToken: string,
}

export interface IUserData extends IUserTokens {
    message: string,
    userId: string,
    name: string
}

export type TWordDifficulty = 'unset' | 'hard' | 'known';

export interface IUserWord {
    difficulty: TWordDifficulty,
    optional?: {}
}

export interface IUserStatistics {
    learnedWords: number,
    optional: {}
}

export interface IUserSettings {
    wordsPerDay: number,
    optional: {}
}

export interface TResultWord {
    word: string,
    wordTranslate: string,
    audio: string,
}

export enum HTTPMethod {
  get = 'GET',
  put = 'PUT',
  delete = 'DELETE',
  post = 'POST'
}

export interface FetchInit {
  method: HTTPMethod,
  body?: string,
  headers: Headers,
}

export interface Headers {
  Accept: string,
  'Content-Type': string,
  Authorization: string,
}

export enum CustomEvents {
  'dict-page',
  'mark-hard',
  'mark-known',
  'activate-word',
  'show-error',
  'login',
  'logout',
  'go-to-login-screen',
  'page-to-left',
  'page-to-right',
  'audiocall-dict-start',
  'sprint-dict-start',
  'sprint-right',
  'sprint-wrong',
  'time-over',
  'sprint-start',
  'sprint-again',
  'sprint-workbook',
  'sprint-forward',
  'sprint-backward',
  'sprint-group-select',
  'sprint-burger-start',
}
