import { AMOUNT_ROUND_WORDS, AMOUNT_ANSWERS, AMOUNT_PAGES } from './constantsAndValues/constants';
import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { getRandomValue } from './getRandomValue';
import { words } from './startRound';
import { shuffleArray } from './shuffleArray';
import { WordAudiocall } from './WordAudiocall';
import { api } from '../app';
import { IWordSchema } from '../types/types';

async function createArrayQuestions() {
  let arrayWords: IWordSchema[];
  let arrayWrongWords: IWordSchema[] = [];
  let numberPage: number;

  const arrPages = [];
  for (let i = 0; i < AMOUNT_PAGES; i++) {
    arrPages.push(i);
  }

  if (GLOBAL_VALUES.currentPage === -1) {
    numberPage = getRandomValue(0, arrPages.length);
  } else {
    numberPage = GLOBAL_VALUES.currentPage;
  }

  // Исключить изученные слова!!! добавить данные с предыдущих страниц, если часть слов уже изучено
  arrayWords = await api.getWords(GLOBAL_VALUES.currentLevel, numberPage);
  arrPages.splice(numberPage, 1);

  for (let i = 0; i < AMOUNT_ANSWERS - 1; i++) {
    numberPage = getRandomValue(0, arrPages.length);
    const index = arrPages.indexOf(i);
    arrPages.splice(index, 1);
    const promiseWrongWords = await api.getWords(GLOBAL_VALUES.currentLevel, numberPage);
    arrayWrongWords = arrayWrongWords.concat(promiseWrongWords);
  }

  arrayWords = shuffleArray(arrayWords);
  arrayWrongWords = shuffleArray(arrayWrongWords);

  for (let i = 0; i < AMOUNT_ROUND_WORDS; i++) {
    const idNewWord = i;
    const curWord = arrayWords[idNewWord];

    const answers: string[] = [];
    answers.push(curWord.wordTranslate);
    for (let j = 0; j < AMOUNT_ANSWERS - 1; j++) {
      const answerID = getRandomValue(0, arrayWrongWords.length);
      answers.push(arrayWrongWords[answerID].wordTranslate);
      arrayWrongWords.splice(answerID, 1);
    }
    const newWord = new WordAudiocall(
      curWord.id,
      curWord.word,
      curWord.group,
      curWord.page,
      curWord.image,
      curWord.audio,
      curWord.wordTranslate,
      shuffleArray(answers),
      false,
      false,
    );
    words.push(newWord);
  }

  return words;
}

export { createArrayQuestions };
