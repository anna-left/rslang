import { ISprintWord, IWordSchema } from '../types/types';
import { WordsSettings } from './SprintSettings';
import API from '../api/API';

class SprintModel {
  private readonly api: API;

  private page: number;

  private group: number;

  private currentPage: number;

  private authorized: boolean;

  constructor(api: API) {
    this.api = api;
    this.group = null;
    this.page = null;
    this.currentPage = null;
    this.authorized = false;
  }

  selectWords(group: number, page: number) {
    this.group = group;
    this.page = page;
    this.currentPage = page ? 0 : 1;
  }

  async fetchWords(group: number, page: number) {
    return this.authorized
      ? this.api.getUserAggregatedWords(group.toString(), page.toString(), '20', { 'userWord.difficulty': {'$not': {'$eq':'known'} } })
      : this.api.getWords(group, page);
  }

  async getWords(group = this.group, page = this.page) {
    const words = await this.fetchWords(group, page);
    if (words) {
      const shuffledWords = this.shuffleOrder(words);
      return this.shuffleTranslation(shuffledWords);
    }
  }

  shuffleOrder(array: IWordSchema[]) {
    return array.slice().sort(() => Math.random() - 0.5);
  }

  shuffleTranslation(array: IWordSchema[]) {
    return array.map((word, index) => {
      const gameWord = { ...word } as ISprintWord;
      if (Math.random() > 0.5) {
        gameWord.gameTranslate = gameWord.wordTranslate;
        gameWord.answer = true;
      } else {
        let randomIndex = index;
        while (randomIndex === index) {
          randomIndex = Math.floor(Math.random() * array.length);
        }
        gameWord.gameTranslate = array[randomIndex].wordTranslate;
        gameWord.answer = false;
      }
      return gameWord;
    });
  }

  async getMoreWords() {
    return this.getWords(this.group, this.currentPage);
  }

  hasMoreWords() {
    this.currentPage = this.currentPage === this.page + 1 ? (this.currentPage += 2) : (this.currentPage += 1);
    return !(this.group === WordsSettings.groups || this.currentPage >= WordsSettings.pages);
  }

  async checkAuthorizationStatus() {
    const status = await this.api.getUserTokens();
    this.authorized = status === 200;
    return this.authorized;
  }
}

export default SprintModel;
