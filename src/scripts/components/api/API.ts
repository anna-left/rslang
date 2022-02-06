import {
    IUserSchema, IUserSettings,
    IUserStatistics,
    IUserTokens,
    IUserWord,
    IWordSchema,
    StatusCode,
    TUserInfo
} from "../../types/types";

class API {
    endpoint: string;

    constructor() {
        this.endpoint = 'https://rslang-909.herokuapp.com';
    }

    async getWords(group: number, page: number) {
        const endpointModifier = `/words?group=${group}&page=${page}`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'GET',
        });
        return await response.json() as IWordSchema[];
    }

    async getWord(id: string) {
        const endpointModifier = `/words/${id}`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'GET',
        });
        if (response.status === StatusCode.InternalServerError) {
            console.log("There is no word with such id");
        }
        return await response.json() as IWordSchema;
    }

    async createUser(user: IUserSchema): Promise<void> {
        const endpointModifier = `/users`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'POST',
            body: JSON.stringify(user),
        });
        if (response.status === StatusCode.UnprocessableEntity) {
            console.log("Incorrect e-mail or password");
        }
        return;
    }

    async getUser(id: number | string) {
        const endpointModifier = `/users/${id}`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'GET',
        });
        if (response.status === StatusCode.Unauthorized) {
            console.log("Access token is missing or invalid");
        } else if (response.status === StatusCode.NotFound) {
            console.log("User not found");
        }
        return await response.json() as IUserSchema;
    }

    async updateUser(id: number | string, user: TUserInfo): Promise<void> {
        const endpointModifier = `/users/${id}`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'PUT',
            body: JSON.stringify(user),
        });
        if (response.status === StatusCode.BadRequest) {
            console.log("Bad request");
        } else if (response.status === StatusCode.Unauthorized) {
            console.log("Access token is missing or invalid");
        }
        return;
    }

    async deleteUser(id: number | string): Promise<void> {
        const endpointModifier = `/users/${id}`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'DELETE',
        });
        if (response.status === StatusCode.NoContent) {
            console.log("The user has been deleted");
        } else if (response.status === StatusCode.Unauthorized) {
            console.log("Access token is missing or invalid");
        }
        return;
    }

    async getUserTokens(id: number | string): Promise<void | IUserTokens> {
        const endpointModifier = `/users/${id}/tokens`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'GET',
        });
        if (response.status === StatusCode.Forbidden) {
            console.log("Access token is missing, expired or invalid");
        }
        return await response.json() as IUserTokens;
    }

    async getUserWords(id: number | string): Promise<void | IUserWord[]> {
        const endpointModifier = `/users/${id}/words`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'GET',
        });
        if (response.status === StatusCode.PaymentRequired) {
            console.log("Access token is missing or invalid");
        }
        return await response.json() as IUserWord[];
    }

    async createUserWord(id: number | string, wordId: string, word: IUserWord): Promise<void> {
        const endpointModifier = `/users/${id}/words/${wordId}`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'POST',
            body: JSON.stringify(word),
        });
        if (response.status === StatusCode.BadRequest) {
            console.log("Bad request");
        } else if (response.status === StatusCode.Unauthorized) {
            console.log("Access token is missing or invalid");
        }
        return;
    }

    async getUserWord(id: number | string, wordId: string): Promise<void | IUserWord> {
        const endpointModifier = `/users/${id}/words/${wordId}`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'GET',
        });
        if (response.status === StatusCode.Unauthorized) {
            console.log("Access token is missing or invalid");
        } else if (response.status === StatusCode.NotFound) {
            console.log("User's word not found");
        }
        return await response.json() as IUserWord;
    }

    async updateUserWord(id: number | string, wordId: string, word: IUserWord): Promise<void> {
        const endpointModifier = `/users/${id}/words/${wordId}`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'PUT',
            body: JSON.stringify(word),
        });
        if (response.status === StatusCode.BadRequest) {
            console.log("Bad request");
        } else if (response.status === StatusCode.Unauthorized) {
            console.log("Access token is missing or invalid");
        }
        return;
    }

    async deleteUserWord(id: number | string, wordId: string): Promise<void> {
        const endpointModifier = `/users/${id}/words/${wordId}`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'DELETE',
        });
        if (response.status === StatusCode.NoContent) {
            console.log("The user word has been deleted");
        } else if (response.status === StatusCode.Unauthorized) {
            console.log("Access token is missing or invalid");
        }
        return;
    }

    async getUserAggregatedWords(
        id: number | string,
        group = '',
        page = 0,
        wordsPerPage = 0,
        filter: {}): Promise<void | IWordSchema[]> {
        let queryString = '';
        const queries = ['?'];
        if (group) {
            queries.push(`group=${group}`)
        }
        if (page) {
            queries.push(`page=${page}`)
        }
        if (wordsPerPage) {
            queries.push(`wordsPerPage=${wordsPerPage}`)
        }
        if (filter) {
            queries.push(`filter=${JSON.stringify(filter)}`)
        }
        if (queries.length > 1) {
            queryString = queries.join('&');
        }
        const endpointModifier = `/users/${id}/aggregatedWords` + queryString;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'GET',
        });
        if (response.status === StatusCode.Unauthorized) {
            console.log("Access token is missing or invalid");
        }
        return await response.json() as IWordSchema[];
    }

    async getUserAggregateWord(id: number | string, wordId: string): Promise<void | IUserWord> {
        const endpointModifier = `/users/${id}/aggregatedWords/${wordId}`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'GET',
        });
        if (response.status === StatusCode.Unauthorized) {
            console.log("Access token is missing or invalid");
        } else if (response.status === StatusCode.NotFound) {
            console.log("User's word not found");
        }
        return await response.json() as IUserWord;
    }

    async getUserStatistics(id: number | string): Promise<void | IUserStatistics> {
        const endpointModifier = `/users/${id}/statistics`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'GET',
        });
        if (response.status === StatusCode.Unauthorized) {
            console.log("Access token is missing or invalid");
        } else if (response.status === StatusCode.NotFound) {
            console.log("Statistics not found");
        }
        return await response.json() as IUserStatistics;
    }

    async updateUserStatistics(id: number | string, statistics: IUserStatistics): Promise<void> {
        const endpointModifier = `/users/${id}/statistics`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'PUT',
            body: JSON.stringify(statistics),
        });
        if (response.status === StatusCode.Unauthorized) {
            console.log("Access token is missing or invalid");
        } else if (response.status === StatusCode.BadRequest) {
            console.log("Bad request");
        }
        return;
    }

    async getUserSettings(id: number | string): Promise<void | IUserSettings> {
        const endpointModifier = `/users/${id}/settings`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'GET',
        });
        if (response.status === StatusCode.Unauthorized) {
            console.log("Access token is missing or invalid");
        } else if (response.status === StatusCode.NotFound) {
            console.log("Settings not found");
        }
        return await response.json() as IUserSettings;
    }

    async updateUserSettings(id: number | string, settings: IUserSettings): Promise<void> {
        const endpointModifier = `/users/${id}/settings`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'PUT',
            body: JSON.stringify(settings),
        });
        if (response.status === StatusCode.Unauthorized) {
            console.log("Access token is missing or invalid");
        } else if (response.status === StatusCode.BadRequest) {
            console.log("Bad request");
        }
        return;
    }

    async singIn(id: number | string, user: TUserInfo): Promise<void | IUserTokens> {
        const endpointModifier = `/signin`;
        const response = await fetch(this.endpoint + endpointModifier, {
            method: 'POST',
            body: JSON.stringify(user),
        });
        if (response.status === StatusCode.Forbidden) {
            console.log("Incorrect e-mail or password");
        }
        return await response.json() as IUserTokens;
    }
}

export default API;