import API from '../api/API';
import { IUserWord, TWordDifficulty } from '../types/types';

class DictionaryModel {
  private readonly api: API;

  constructor(api: API) {
    this.api = api;
  }

  async fetchWords(group: number, page: number) {
    return this.api.getWords(group, page);
  }

  async getUserWords(group: number, page: number, wordsPerPage = 20) {
    return this.api.getUserAggregatedWords(group.toString(), page.toString(), wordsPerPage.toString());
  }

  async getAllUserWords() {
    return this.api.getUserAggregatedWords('', '', '3600', { 'userWord.difficulty': 'hard' });
  }

  async setUserWord(wordId: string, difficulty: TWordDifficulty) {
    const userWord: IUserWord = {
      difficulty: difficulty,
    };
    const existingWord = await this.api.getUserWord(wordId);
    if (existingWord) {
      await this.api.updateUserWord(wordId, userWord);
    } else {
      await this.api.createUserWord(wordId, userWord);
    }
  }
}

export default DictionaryModel;
