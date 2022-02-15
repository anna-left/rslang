import API from "../api/API";

class DictionaryModel {
  private readonly api: API;
  constructor() {
    this.api = new API();
  }

  async fetchWords(group: number, page: number) {
    return await this.api.getWords(group, page);
  }

  async getUserWords(group: number, page: number, wordsPerPage = 20) {
    return await this.api.getUserAggregatedWords(
      group.toString(),
      page.toString(),
      wordsPerPage.toString(),
    );
  }
}

export default DictionaryModel;
