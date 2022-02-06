export interface IWordSchema {
    id: string,
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

export enum StatusCode {
    OK = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
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
    message: string,
    token: string,
    refreshToken: string,
    userId: string,
    name: string
}

export interface IUserWord {
    difficulty: string,
    optional: {}
}

export interface IUserStatistics {
    learnedWords: number,
    optional: {}
}

export interface IUserSettings {
    wordsPerDay: number,
    optional: {}
}