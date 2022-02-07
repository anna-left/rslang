import { AMOUNT_ROUND_WORDS, AMOUNT_ANSWERS } from './constantsAndValues/constants';
import { getRandomValue } from './getRandomValue';
import { shuffleArray } from './shuffleArray';
import { basicWords, wrongWords } from './words';
import { WordAudiocall } from './WordAudiocall';

function createArrayQuestions() {
  // создаем массив вопросов
  const words: WordAudiocall[] = [];
  const wrongWordsRound = wrongWords.slice();
  for (let i = 0; i < AMOUNT_ROUND_WORDS; i++) {
    const idNewWord = i;
    const curWord = basicWords[idNewWord];

    const answers: string[] = [];
    answers.push(curWord.wordTranslate);
    for (let j = 0; j < AMOUNT_ANSWERS - 1; j++) {
      const answerID = getRandomValue(0, wrongWordsRound.length);
      answers.push(wrongWordsRound[answerID].wordTranslate);
      wrongWordsRound.splice(answerID, 1);
    }
    const newWord = new WordAudiocall(
      curWord.word,
      curWord.image,
      curWord.audio,
      curWord.wordTranslate,
      shuffleArray(answers),
    );
    words.push(newWord);
  }

  return words;
}

export { createArrayQuestions };
