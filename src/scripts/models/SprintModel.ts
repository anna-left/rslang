import API from "../components/api/API";
import {IWordSchema} from "../types/types";
import {WordsSettings} from "../components/games/sprint/SprintSettings";

class SprintModel {
  private readonly api: API;
  private readonly page: number;
  private readonly group: number;
  private currentPage: number;
  constructor(group: number, page: number) {
    this.api = new API();
    this.group = group;
    this.page = page;
    this.currentPage = page ? 0 : 1;
  }

  async fetchWords(group: number, page: number) {
    return this.api.getWords(group, page);
  }

  async getWords(group = this.group, page = this.page) {
    const words = await this.fetchWords(group, page);
    const pairs = words.map((word) => {
      return [word.word, word.wordTranslate]
    });
    const shuffledPairs = this.shuffleWordsOrder(pairs);
    return this.shuffleWordsTranslation(shuffledPairs);
  }

  shuffleWordsOrder(array: string[][]) {
    return array.slice().sort(() => Math.random() - 0.5);
  }

  shuffleWordsTranslation(array: string[][]) {
    return array.map((pair) => {
      if (Math.random() > 0.5) {
        pair.push('true');
        return pair;
      } else {
        return [pair[0], pair[Math.random() * array.length], 'false'];
      }
    })
  }

  async getAnotherWordsGroup() {
    if (this.group === WordsSettings.groups || this.currentPage === WordsSettings.pages) {
      return;
    } else {
      this.currentPage += 1;
      return await this.getWords(this.group, this.currentPage - 1);
    }
  }

}

export default SprintModel;
