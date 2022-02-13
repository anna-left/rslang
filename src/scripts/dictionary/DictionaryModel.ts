import API from "../api/API";

class DictionaryModel {
  private readonly api: API;
  constructor() {
    this.api = new API();
  }

  async fetchWords(group: number, page: number) {
    return await this.api.getWords(group, page);
  }

  async getUserWords() {
    // TODO check proper keys
    const id = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    return await this.api.getUserWords(id, token);
  }

}

export default DictionaryModel;
