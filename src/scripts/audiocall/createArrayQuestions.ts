import { AMOUNT_ROUND_WORDS, AMOUNT_ANSWERS, AMOUNT_PAGES } from './constantsAndValues/constants';
import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { getRandomValue } from './getRandomValue';
import { words } from './startRound';
import { shuffleArray } from './shuffleArray';
import { basicWords } from './words';
import { WordAudiocall } from './WordAudiocall';
import { wordsApi } from './startAudiocall';
import { IWordSchema } from '../types/types';

async function createArrayQuestions() {
  const arrPages = [];
  for (let i = 0; i < AMOUNT_PAGES; i++) {
    arrPages.push(i);
  }

  const numberPage = getRandomValue(0, arrPages.length);
  arrPages.splice(numberPage, 1);

  let arrayWords = await wordsApi.getWords(GLOBAL_VALUES.currentLevel, numberPage);
  
  let arrayWrongWords: IWordSchema[] = [];
  for (let i = 0; i < AMOUNT_ANSWERS - 1; i++) {
    const numberPage = getRandomValue(0, arrPages.length);
    const index = arrPages.indexOf(i);
    arrPages.splice(index, 1);
    const promiseWords = await wordsApi.getWords(GLOBAL_VALUES.currentLevel, numberPage);
    arrayWrongWords = arrayWrongWords.concat(promiseWords);
  }

  arrayWords = shuffleArray(arrayWords);
  arrayWrongWords = shuffleArray(arrayWrongWords);

  for (let i = 0; i < AMOUNT_ROUND_WORDS; i++) {
    const idNewWord = i;
    const curWord = arrayWords[idNewWord];

    let answers: string[] = [];
    answers.push(curWord.wordTranslate);
    for (let j = 0; j < AMOUNT_ANSWERS - 1; j++) {
      const answerID = getRandomValue(0, arrayWrongWords.length);
      answers.push(arrayWrongWords[answerID].wordTranslate);
      arrayWrongWords.splice(answerID, 1);
    }
    const newWord = new WordAudiocall(
      curWord.word,
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
