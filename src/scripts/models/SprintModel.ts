import API from "../components/api/API";
import {IWordSchema} from "../types/types";

class SprintModel {
  private readonly api: API;
  private words: IWordSchema[];

  constructor() {
    this.api = new API();
    this.words = [];
  }

  async init() {
    this.words = await this.api.getWords(0,0);
  }

  getWords() {
    return this.words.map((word) => {
      return [word.word, word.wordTranslate]
    });
  }
}

export default SprintModel;
