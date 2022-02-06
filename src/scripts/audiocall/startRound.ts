import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { createHtmlElement } from './createHtmlElement';
// import { shuffleArray } from './shuffleArray';
import { createArrayQuestions } from './createArrayQuestions';
import { WordAudiocall } from './WordAudiocall';
import { startQuestion } from './startQuestion';
let words: WordAudiocall[] = [];

function startRound() {
  words = createArrayQuestions();
  GLOBAL_VALUES.currentRound += 1;
  GLOBAL_VALUES.currentQuestion = 0;
  const audiocallHTML = document.querySelector('.audiocall') as HTMLElement;
  // const mainHTML = document.querySelector('.main');
  while (audiocallHTML.firstChild) {
    audiocallHTML.removeChild(audiocallHTML.firstChild);
  }
  const audiocallStart = createHtmlElement('div', audiocallHTML, 'audiocall-start');
  createHtmlElement('span', audiocallStart, 'audiocall-start__title', 'Аудиовызов');
  createHtmlElement(
    'span',
    audiocallStart,
    'audiocall-start__description',
    'Тренировка улучшает восприятие речи на слух.',
  );
  const audiocallStartBtn = createHtmlElement('button', audiocallStart, 'audiocall-start__btn', 'Начать');
  audiocallStartBtn.addEventListener('click', startQuestion);
  // startQuestion();
}

export { startRound, words };
