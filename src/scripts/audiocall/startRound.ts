import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { AMOUNT_LEVELS } from './constantsAndValues/constants';
import { createHtmlElement } from './createHtmlElement';
import { createArrayQuestions } from './createArrayQuestions';
import { WordAudiocall } from './WordAudiocall';
import { startQuestion } from './startQuestion';
import { clearPage } from './startAudiocall';
// import { startQuestion } from '../../assets/img/audiocall';
// import { startQuestion } from '../../assets/img/audiocall/';
let words: WordAudiocall[] = [];

function startRound() {
  words = createArrayQuestions();
  GLOBAL_VALUES.currentRound += 1;
  GLOBAL_VALUES.currentQuestion = 0;
  const audiocallHTML: HTMLElement = document.querySelector('.audiocall');
  clearPage(audiocallHTML);

  const audiocallStart = createHtmlElement('div', audiocallHTML, 'audiocall-start');

  const audiocallPlant: HTMLImageElement = document.createElement('img');
  audiocallPlant.classList.add('audiocall-plant');
  audiocallHTML.appendChild(audiocallPlant);
  audiocallPlant.src = '../../assets/img/audiocall/plant.png';

  const audiocallLamp: HTMLImageElement = document.createElement('img');
  audiocallLamp.classList.add('audiocall-lamp');
  audiocallHTML.appendChild(audiocallLamp);
  audiocallLamp.src = '../../assets/img/audiocall/lamp.png';

  createHtmlElement('span', audiocallStart, 'audiocall-start__title', 'Аудиовызов');
  createHtmlElement(
    'span',
    audiocallStart,
    'audiocall-start__description',
    'Тренировка улучшает восприятие речи на слух.',
  );
  createHtmlElement(
    'span',
    audiocallStart,
    'audiocall-start__description',
    'Выбрать уровень:',
  );

  const audiocallStartLevels = createHtmlElement('div', audiocallStart, 'audiocall-start__levels');
  for (let i = 0; i < AMOUNT_LEVELS; i++) {
    createHtmlElement('div', audiocallStartLevels, 'audiocall-start__level', String(i + 1));
  }
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
