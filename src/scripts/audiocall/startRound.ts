import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { createHtmlElement } from './createHtmlElement';
import { createArrayQuestions } from './createArrayQuestions';
import { WordAudiocall } from './WordAudiocall';
import { startQuestion } from './startQuestion';
let words: WordAudiocall[] = [];

function startRound() {
  words = createArrayQuestions();
  GLOBAL_VALUES.currentRound += 1;
  GLOBAL_VALUES.currentQuestion = 0;
  const audiocallHTML: HTMLElement = document.querySelector('.audiocall');
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
  document.addEventListener(
    'keypress',
    function (e) {
      if (e.key === 'Enter') {
        startQuestion();
      }
    },
    { once: true },
  );
}

export { startRound, words };
