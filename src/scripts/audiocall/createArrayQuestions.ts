import { AMOUNT_ROUND_WORDS, AMOUNT_ANSWERS, AMOUNT_WORDS_PAGE, AMOUNT_PAGES } from './constantsAndValues/constants';
import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { getRandomValue } from './getRandomValue';
import { words } from './startRound';
import { shuffleArray } from './shuffleArray';
import { WordAudiocall } from './WordAudiocall';
import { api } from '../app';
import { IWordSchema } from '../types/types';

async function createArrayQuestions() {
  let arrayWords: IWordSchema[] = [];
  let arrayWrongWords: IWordSchema[] = [];
  let numberPage: number;

  const arrPages = [];
  for (let i = 0; i < AMOUNT_PAGES; i++) {
    arrPages.push(i);
  }

  if (GLOBAL_VALUES.currentPage === -1) {
    numberPage = AMOUNT_WORDS_PAGE - 1;
  } else {
    numberPage = GLOBAL_VALUES.currentPage;
  }

  for (let i = numberPage; i >= 0; i--) {
    const promiseWords = await api.getWords(GLOBAL_VALUES.currentLevel, i);
    arrayWords = arrayWords.concat(promiseWords);
  }

  if (GLOBAL_VALUES.currentPage === -1) {
    arrayWords = shuffleArray(arrayWords);
  }
  for (let i = arrayWords.length - 1; i >= 0; i--) {
    const curWord = arrayWords[i];
    const promiseUserWord = await api.getUserWord(curWord.id);
    if (promiseUserWord && promiseUserWord.difficulty === 'known') {
      continue;
    }
    const newWord = new WordAudiocall(
      curWord.id,
      curWord.word,
      curWord.group,
      curWord.page,
      curWord.image,
      curWord.audio,
      curWord.wordTranslate,
      [],
      false,
      false,
    );
    words.push(newWord);
    console.log(words);
    if (words.length === AMOUNT_ROUND_WORDS) {
      break;
    }
  }

  for (let i = 0; i < AMOUNT_ANSWERS - 1; i++) {
    numberPage = getRandomValue(0, arrPages.length);
    const index = arrPages.indexOf(i);
    arrPages.splice(index, 1);
    const promiseWrongWords = await api.getWords(GLOBAL_VALUES.currentLevel, numberPage);
    arrayWrongWords = arrayWrongWords.concat(promiseWrongWords);
  }

  arrayWrongWords = shuffleArray(arrayWrongWords);

  for (let i = 0; i < words.length; i++) {
    const curWord = words[i];
    const answers: string[] = [];
    answers.push(curWord.wordTranslate);
    for (let j = 0; j < AMOUNT_ANSWERS - 1; j++) {
      const answerID = getRandomValue(0, arrayWrongWords.length);
      answers.push(arrayWrongWords[answerID].wordTranslate);
      arrayWrongWords.splice(answerID, 1);
    }
    curWord.answers = answers;
  }

  return words;
}

export { createArrayQuestions };
