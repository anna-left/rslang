import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { AMOUNT_LEVELS } from './constantsAndValues/constants';
import { createHtmlElement } from './createHtmlElement';
import { createArrayQuestions } from './createArrayQuestions';
import { WordAudiocall } from './WordAudiocall';
import { startQuestion } from './startQuestion';
import { clearPage } from './startAudiocall';
let words: WordAudiocall[] = [];

function changeLevel(event: Event) {
  const levels = document.querySelectorAll('.audiocall-start__level');
  for (let i = 0; i < levels.length; i++) {
    if (levels[i] === event.target) {
      levels[i].classList.add('audiocall-start__level_active');
      GLOBAL_VALUES.currentLevel = i;
    } else {
      levels[i].classList.remove('audiocall-start__level_active');
    }
  }
}

async function startNewGame() {
  words = [];
  words = await createArrayQuestions();
  startQuestion();
}

function startRound() {
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

  if (GLOBAL_VALUES.currentPage === -1) {
    createHtmlElement('span', audiocallStart, 'audiocall-start__description', 'Выбрать уровень:');
    const audiocallStartLevels = createHtmlElement('div', audiocallStart, 'audiocall-start__levels');
    audiocallStartLevels.addEventListener('click', changeLevel);
    for (let i = 0; i < AMOUNT_LEVELS; i++) {
      const levelHTML = createHtmlElement('div', audiocallStartLevels, 'audiocall-start__level', String(i + 1));
      if (GLOBAL_VALUES.currentLevel === -1 && !i) {
        GLOBAL_VALUES.currentLevel = 0;
        levelHTML.classList.add('audiocall-start__level_active');
      } else if (i === GLOBAL_VALUES.currentLevel) {
        levelHTML.classList.add('audiocall-start__level_active');
      }
    }
  }

  const audiocallStartBtn = createHtmlElement('button', audiocallStart, 'audiocall-start__btn', 'Начать');
  audiocallStartBtn.addEventListener('click', startNewGame);
  document.addEventListener(
    'keypress',
    function (e) {
      if (e.key === 'Enter') {
        startNewGame();
      }
    },
    { once: true },
  );
}

export { startRound, startNewGame, words };
