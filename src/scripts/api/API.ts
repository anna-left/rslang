import {
  FetchInit,
  HTTPMethod,
  IAggregatedWordSchema,
  IAggregatedWordsSchema,
  IUserData,
  IUserSchema,
  IUserSettings,
  IUserStatistics,
  IUserTokens,
  IUserWord,
  IWordSchema,
  StatusCode,
  TUserInfo,
} from '../types/types';
import {SessionStorage} from "../state/StorageSettings";

export class API {
  private readonly endpoint: string;
  private userId: string;
  private accessToken: string;
  private refreshToken: string;

  constructor() {
    this.endpoint = 'https://rslang-909.herokuapp.com';
    this.getUserDataFromStorage();
  }

  getUserDataFromStorage() {
    const userData: IUserData = JSON.parse(sessionStorage.getItem(SessionStorage.userData));
    this.userId = userData?.userId;
    this.accessToken = userData?.token;
    this.refreshToken = userData?.refreshToken;
  }

  updateTokensInStorage(tokensData: IUserTokens) {
    const userData: IUserData = JSON.parse(sessionStorage.getItem(SessionStorage.userData));
    userData.token = tokensData.token;
    userData.refreshToken = tokensData.refreshToken;
    sessionStorage.setItem(SessionStorage.userData, JSON.stringify(userData));
  }

  async getAllWords() {
    const endpointModifier = `/words/all`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'GET',
    });
    return (await response.json()) as IWordSchema[];
  }

  async getWords(group: number, page: number) {
    const endpointModifier = `/words?group=${group}&page=${page}`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'GET',
    });
    return (await response.json()) as IWordSchema[];
  }

  async getWord(id: string) {
    const endpointModifier = `/words/${id}`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'GET',
    });
    if (response.status === StatusCode.InternalServerError) {
      console.log('There is no word with such id');
    }
    return (await response.json()) as IWordSchema;
  }

  async createUser(user: IUserSchema): Promise<void> {
    const endpointModifier = `/users`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (response.status === StatusCode.UnprocessableEntity) {
      console.log('Incorrect e-mail or password');
    }
    return;
  }

  async getUser() {
    const endpointModifier = `/users/${this.userId}`;
    const response = await this.authorizedRequest(endpointModifier, HTTPMethod.get);
    if (response && response.status === StatusCode.OK) {
      return (await response.json()) as IUserSchema;
    } else {
      return
    }
  }

  async updateUser(user: TUserInfo): Promise<void> {
    const endpointModifier = `/users/${this.userId}`;
    const response = await this.authorizedRequest(endpointModifier, HTTPMethod.put, user);
    return;
  }

  async deleteUser(): Promise<void> {
    const endpointModifier = `/users/${this.userId}`;
    const response = await this.authorizedRequest(endpointModifier, HTTPMethod.delete);
    return;
  }

  async getUserTokens(): Promise<void | IUserTokens> {
    const endpointModifier = `/users/${this.userId}/tokens`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.refreshToken}`,
      },
    });
    if (response.status === StatusCode.Forbidden || response.status === StatusCode.Unauthorized) {
      console.log('Access token is missing, expired or invalid');
      window.dispatchEvent(new CustomEvent('go-to-login-screen'));
      window.dispatchEvent(new CustomEvent('show-error', {detail: {error: 'Authorization failed.\nTry to re-login.'}}));
    } else {
      this.updateTokensInStorage(await response.json());
      this.getUserDataFromStorage();
    }
    return;
  }

  async getUserWords(): Promise<void | IUserWord[]> {
    const endpointModifier = `/users/${this.userId}/words`;
    const response = await this.authorizedRequest(endpointModifier, HTTPMethod.get);
    if (response && response.status === StatusCode.OK) {
      return (await response.json()) as IUserWord[];
    } else {
      return
    }
  }

  async createUserWord(wordId: string,  word: IUserWord): Promise<void> {
    const endpointModifier = `/users/${this.userId}/words/${wordId}`;
    const response = await this.authorizedRequest(endpointModifier, HTTPMethod.post, word);
    return;
  }

  async getUserWord(wordId: string): Promise<void | IUserWord> {
    const endpointModifier = `/users/${this.userId}/words/${wordId}`;
    const response = await this.authorizedRequest(endpointModifier, HTTPMethod.get);
    if (response && response.status === StatusCode.OK) {
      return (await response.json()) as IUserWord;
    } else {
      return
    }
  }

  async updateUserWord(wordId: string, word: IUserWord): Promise<void> {
    const endpointModifier = `/users/${this.userId}/words/${wordId}`;
    const response = await this.authorizedRequest(endpointModifier, HTTPMethod.put, word);
    return;
  }

  async deleteUserWord(wordId: string): Promise<void> {
    const endpointModifier = `/users/${this.userId}/words/${wordId}`;
    const response = await this.authorizedRequest(endpointModifier, HTTPMethod.delete);
    return;
  }

  async getUserAggregatedWords(
    group = "0",
    page = "0",
    wordsPerPage = "20",
    filter = {},
  ): Promise<void | IAggregatedWordSchema[]> {
    let queryString = '';
    const queries = ['?'];
    if (group) {
      queries.push(`group=${group}`);
    }
    if (page) {
      queries.push(`page=${page}`);
    }
    if (wordsPerPage) {
      queries.push(`wordsPerPage=${wordsPerPage}`);
    }
    if (filter) {
      queries.push(`filter=${JSON.stringify(filter)}`);
    }
    if (queries.length > 1) {
      queryString = queries.join('&');
    }
    const endpointModifier = `/users/${this.userId}/aggregatedWords` + queryString;
    const response = await this.authorizedRequest(endpointModifier, HTTPMethod.get);
    const data: IAggregatedWordsSchema[] = await response.json();
    return data[0].paginatedResults;
  }

  async getUserAggregateWord(wordId: string): Promise<void | IAggregatedWordSchema[]> {
    const endpointModifier = `/users/${this.userId}/aggregatedWords/${wordId}`;
    const response = await this.authorizedRequest(endpointModifier, HTTPMethod.get);
    return (await response.json()) as IAggregatedWordSchema[];
  }

  async getUserStatistics(): Promise<void | IUserStatistics> {
    const endpointModifier = `/users/${this.userId}/statistics`;
    const response = await this.authorizedRequest(endpointModifier, HTTPMethod.get);
    return (await response.json()) as IUserStatistics;
  }

  async updateUserStatistics(statistics: IUserStatistics): Promise<void> {
    const endpointModifier = `/users/${this.userId}/statistics`;
    const response = await this.authorizedRequest(endpointModifier, HTTPMethod.put, statistics);
    return;
  }

  async getUserSettings(): Promise<void | IUserSettings> {
    const endpointModifier = `/users/${this.userId}/settings`;
    const response = await this.authorizedRequest(endpointModifier, HTTPMethod.get);
    return (await response.json()) as IUserSettings;
  }

  async updateUserSettings(settings: IUserSettings): Promise<void> {
    const endpointModifier = `/users/${this.userId}/settings`;
    const response = await this.authorizedRequest(endpointModifier, HTTPMethod.put, settings);
    return;
  }

  async signIn(user: TUserInfo): Promise<void | IUserData> {
    const endpointModifier = `/signin`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (response.status === StatusCode.Forbidden || response.status === StatusCode.NotFound) {
      console.log('Incorrect e-mail or password');
    }
    const userData: IUserData = (await response.json());
    sessionStorage.setItem(SessionStorage.userData, JSON.stringify(userData));
    this.getUserDataFromStorage();
    return userData;
  }

  async authorizedRequest(path: string, method: HTTPMethod, data?: any) {
    let init: FetchInit = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      }
    }
    if (data) {
      init.body = JSON.stringify(data);
    }
    const response = await fetch(this.endpoint + path, init as unknown as RequestInit);
    if (response.status === StatusCode.OK) {
      return response;
    } else if (response.status === StatusCode.NotFound) {
      console.log('Not Found');
    } else if (response.status === StatusCode.UnprocessableEntity) {
      console.log('Incorrect e-mail or password\nor\nWrong Schema');
    } else if (response.status === StatusCode["Expectation Failed"]) {
      console.log('Word/User already exists');
    } else if (response.status === StatusCode.Unauthorized) {
      await this.getUserTokens();
      init.headers.Authorization = `Bearer ${this.accessToken}`;
      const response = await fetch(this.endpoint + path, init as unknown as RequestInit);
      if (response.status === StatusCode.OK) {
        return response;
      } else {
        window.dispatchEvent(new CustomEvent('go-to-login-screen'));
      }
    } else {
      window.dispatchEvent(new CustomEvent('go-to-login-screen'));
      const errorText = 'Authorization failed.\nTry to re-login.';
      console.log(errorText);
      window.dispatchEvent(new CustomEvent('show-error', {detail: {error: errorText}}));
    }
  }
}

export default API;
