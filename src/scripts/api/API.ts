import {
  IUserSchema,
  IUserSettings,
  IUserStatistics,
  IUserTokens,
  IUserWord,
  IWordSchema,
  StatusCode,
  TUserInfo,
} from '../types/types';

export class API {
  endpoint: string;

  constructor() {
    this.endpoint = 'https://rslang-909.herokuapp.com';
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

  async getUser(id: string, token: string) {
    const endpointModifier = `/users/${id}`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === StatusCode.Unauthorized) {
      console.log('Access token is missing or invalid');
    } else if (response.status === StatusCode.NotFound) {
      console.log('User not found');
    }
    return (await response.json()) as IUserSchema;
  }

  async updateUser(id: string, user: TUserInfo, token: string): Promise<void> {
    const endpointModifier = `/users/${id}`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === StatusCode.BadRequest) {
      console.log('Bad request');
    } else if (response.status === StatusCode.Unauthorized) {
      console.log('Access token is missing or invalid');
    }
    return;
  }

  async deleteUser(id: string, token: string): Promise<void> {
    const endpointModifier = `/users/${id}`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === StatusCode.NoContent) {
      console.log('The user has been deleted');
    } else if (response.status === StatusCode.Unauthorized) {
      console.log('Access token is missing or invalid');
    }
    return;
  }

  async getUserTokens(id: string, token: string): Promise<void | IUserTokens> {
    const endpointModifier = `/users/${id}/tokens`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === StatusCode.Forbidden) {
      console.log('Access token is missing, expired or invalid');
    }
    return (await response.json()) as IUserTokens;
  }

  async getUserWords(id: string, token: string): Promise<void | IUserWord[]> {
    const endpointModifier = `/users/${id}/words`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === StatusCode.PaymentRequired) {
      console.log('Access token is missing or invalid');
    }
    return (await response.json()) as IUserWord[];
  }

  async createUserWord(id: string, wordId: string, word: IUserWord, token: string): Promise<void> {
    const endpointModifier = `/users/${id}/words/${wordId}`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'POST',
      body: JSON.stringify(word),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === StatusCode.BadRequest) {
      console.log('Bad request');
    } else if (response.status === StatusCode.Unauthorized) {
      console.log('Access token is missing or invalid');
    }
    return;
  }

  async getUserWord(id: string, wordId: string, token: string): Promise<void | IUserWord> {
    const endpointModifier = `/users/${id}/words/${wordId}`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === StatusCode.Unauthorized) {
      console.log('Access token is missing or invalid');
    } else if (response.status === StatusCode.NotFound) {
      console.log("User's word not found");
    }
    return (await response.json()) as IUserWord;
  }

  async updateUserWord(id: string, wordId: string, word: IUserWord, token: string): Promise<void> {
    const endpointModifier = `/users/${id}/words/${wordId}`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'PUT',
      body: JSON.stringify(word),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === StatusCode.BadRequest) {
      console.log('Bad request');
    } else if (response.status === StatusCode.Unauthorized) {
      console.log('Access token is missing or invalid');
    }
    return;
  }

  async deleteUserWord(id: string, wordId: string, token: string): Promise<void> {
    const endpointModifier = `/users/${id}/words/${wordId}`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === StatusCode.NoContent) {
      console.log('The user word has been deleted');
    } else if (response.status === StatusCode.Unauthorized) {
      console.log('Access token is missing or invalid');
    }
    return;
  }

  async getUserAggregatedWords(
    id: string,
    token: string,
    group = '',
    page = 0,
    wordsPerPage = 0,
    filter: {},
  ): Promise<void | IWordSchema[]> {
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
    const endpointModifier = `/users/${id}/aggregatedWords` + queryString;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === StatusCode.Unauthorized) {
      console.log('Access token is missing or invalid');
    }
    return (await response.json()) as IWordSchema[];
  }

  async getUserAggregateWord(id: string, wordId: string, token: string): Promise<void | IUserWord> {
    const endpointModifier = `/users/${id}/aggregatedWords/${wordId}`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === StatusCode.Unauthorized) {
      console.log('Access token is missing or invalid');
    } else if (response.status === StatusCode.NotFound) {
      console.log("User's word not found");
    }
    return (await response.json()) as IUserWord;
  }

  async getUserStatistics(id: string, token: string): Promise<void | IUserStatistics> {
    const endpointModifier = `/users/${id}/statistics`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === StatusCode.Unauthorized) {
      console.log('Access token is missing or invalid');
    } else if (response.status === StatusCode.NotFound) {
      console.log('Statistics not found');
    }
    return (await response.json()) as IUserStatistics;
  }

  async updateUserStatistics(id: string, statistics: IUserStatistics, token: string): Promise<void> {
    const endpointModifier = `/users/${id}/statistics`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'PUT',
      body: JSON.stringify(statistics),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === StatusCode.Unauthorized) {
      console.log('Access token is missing or invalid');
    } else if (response.status === StatusCode.BadRequest) {
      console.log('Bad request');
    }
    return;
  }

  async getUserSettings(id: string, token: string): Promise<void | IUserSettings> {
    const endpointModifier = `/users/${id}/settings`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === StatusCode.Unauthorized) {
      console.log('Access token is missing or invalid');
    } else if (response.status === StatusCode.NotFound) {
      console.log('Settings not found');
    }
    return (await response.json()) as IUserSettings;
  }

  async updateUserSettings(id: string, settings: IUserSettings, token: string): Promise<void> {
    const endpointModifier = `/users/${id}/settings`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'PUT',
      body: JSON.stringify(settings),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === StatusCode.Unauthorized) {
      console.log('Access token is missing or invalid');
    } else if (response.status === StatusCode.BadRequest) {
      console.log('Bad request');
    }
    return;
  }

  async signIn(user: TUserInfo): Promise<void | IUserTokens> {
    const endpointModifier = `/signin`;
    const response = await fetch(this.endpoint + endpointModifier, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (response.status === StatusCode.Forbidden) {
      console.log('Incorrect e-mail or password');
    }
    return (await response.json()) as IUserTokens;
  }
}

export default API;
