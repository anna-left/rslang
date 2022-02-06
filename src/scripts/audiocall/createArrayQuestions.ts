import { NUMBER_OF_WORDS_IN_ROUND, NUMBER_OF_ANSWERS } from './constantsAndValues/constants';
import { getRandomValue } from './getRandomValue';
import { shuffleArray } from './shuffleArray';
import { basicWords, wrongWords } from './words';
import { WordAudiocall } from './WordAudiocall';

function createArrayQuestions() {
  // создаем массив вопросов
  const words: WordAudiocall[] = [];
  const wrongWordsRound = wrongWords.slice();
  for (let i = 0; i < NUMBER_OF_WORDS_IN_ROUND; i++) {
    const idNewWord = i;
    const curWord = basicWords[idNewWord];

    const answers: string[] = [];
    answers.push(curWord.wordTranslate);
    for (let j = 0; j < NUMBER_OF_ANSWERS - 1; j++) {
      const idAnswer = getRandomValue(0, wrongWordsRound.length);
      answers.push(wrongWordsRound[idAnswer].wordTranslate);
      wrongWordsRound.splice(idAnswer, 1);
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
