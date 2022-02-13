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
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    return await this.api.getUserWords(id, token);
  }

}

export default DictionaryModel;
