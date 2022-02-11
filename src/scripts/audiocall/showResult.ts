import { clearPage } from './startAudiocall';
import { playSound } from './playSound';
import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { createHtmlElement } from './createHtmlElement';
import { words, startRound, startNewGame } from './startRound';
import {
  AMOUNT_ROUND_WORDS,
  AMOUNT_WORDS_GOOD_RESULT,
  AMOUNT_WORDS_GREAD_RESULT,
} from './constantsAndValues/constants';

function createSvgSpeaker(parent: HTMLElement, curClass: string) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  svg.setAttribute('viewbox', '0 0 36 32');
  svg.setAttribute('width', '36px');
  svg.setAttribute('height', '32px');
  svg.setAttribute('fill', 'none');

  path.setAttribute('fill', 'black');
  path.setAttribute('fill-opacity', '0.3');

  path.setAttribute(
    'd',
    'M32.8477 24.8203L28.5391 22.332C28.4683 22.2915 28.3902 22.2653 28.3093 22.255C28.2284 22.2446 28.1462 22.2503 28.0675 22.2717C27.9888 22.2931 27.9151 22.3298 27.8505 22.3797C27.786 22.4296 27.7319 22.4917 27.6914 22.5625L26.9141 23.9102C26.7422 24.207 26.8438 24.5898 27.1406 24.7617L31.4492 27.25C31.52 27.2905 31.5981 27.3167 31.679 27.3271C31.7599 27.3374 31.8421 27.3317 31.9208 27.3103C31.9995 27.2889 32.0732 27.2522 32.1378 27.2023C32.2023 27.1524 32.2564 27.0903 32.2969 27.0195L33.0742 25.6719C33.2461 25.375 33.1406 24.9922 32.8477 24.8203ZM27.6875 9.4375C27.728 9.5083 27.7821 9.57042 27.8466 9.62031C27.9111 9.67021 27.9849 9.70691 28.0636 9.72831C28.1423 9.74971 28.2245 9.7554 28.3054 9.74504C28.3863 9.73469 28.4644 9.7085 28.5352 9.66797L32.8438 7.17969C33.1406 7.00781 33.2422 6.625 33.0703 6.32812L32.2969 4.98438C32.2564 4.91358 32.2023 4.85146 32.1378 4.80156C32.0732 4.75166 31.9995 4.71497 31.9208 4.69357C31.8421 4.67216 31.7599 4.66648 31.679 4.67683C31.5981 4.68718 31.52 4.71337 31.4492 4.75391L27.1406 7.24219C26.998 7.32535 26.894 7.46163 26.8516 7.62121C26.8091 7.78079 26.8316 7.95069 26.9141 8.09375L27.6875 9.4375ZM34.4844 14.5938H29.4844C29.1406 14.5938 28.8594 14.875 28.8594 15.2188V16.7812C28.8594 17.125 29.1406 17.4062 29.4844 17.4062H34.4844C34.8281 17.4062 35.1094 17.125 35.1094 16.7812V15.2188C35.1094 14.875 34.8281 14.5938 34.4844 14.5938ZM22.4492 0.492188C22.2188 0.492188 21.9844 0.554688 21.7695 0.699219L7.92188 9.75H1.51562C1.17188 9.75 0.890625 10.0312 0.890625 10.375V21.625C0.890625 21.9688 1.17188 22.25 1.51562 22.25H7.92188L21.7695 31.3008C21.9844 31.4414 22.2227 31.5078 22.4492 31.5078C23.1016 31.5078 23.7031 30.9883 23.7031 30.2539V1.74609C23.7031 1.01172 23.1016 0.492188 22.4492 0.492188Z',
  );

  svg.appendChild(path);
  parent.appendChild(svg);
  if (curClass) {
    svg.classList.add(curClass);
  }
  return svg;
}

function createSvgArrow(parent: HTMLElement, direction: string, curClass: string) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  svg.setAttribute('viewbox', '0 0 60 61');
  svg.setAttribute('width', '60px');
  svg.setAttribute('height', '61px');
  svg.setAttribute('fill', 'none');

  path.setAttribute('fill', 'black');
  path.setAttribute('fill-rule', 'evenodd');
  path.setAttribute('clip-rule', 'evenodd');
  if (direction === 'right') {
    path.setAttribute(
      'd',
      'M29.9484 60.0513C13.7756 60.0513 0.699707 46.7887 0.699707 30.3848C0.699707 13.981 13.7756 0.718262 29.9484 0.718262C46.1212 0.718262 59.1971 13.981 59.1971 30.3848C59.1971 46.7887 46.1212 60.0513 29.9484 60.0513ZM29.9484 4.20844C15.6682 4.20844 4.14073 15.9005 4.14073 30.3848C4.14073 44.8691 15.6682 56.5612 29.9484 56.5612C44.2287 56.5612 55.7561 44.8691 55.7561 30.3848C55.7561 15.9005 44.2287 4.20844 29.9484 4.20844ZM31.4922 43.2884L28.719 41.0057L38.4759 32.1295H14.4638V28.6393H38.4755L28.719 19.7634L31.4922 17.4807L45.9241 30.3846L31.4922 43.2884Z',
    );
  } else {
    path.setAttribute(
      'd',
      'M29.7513 60.2803C45.9241 60.2803 59 47.0177 59 30.6138C59 14.21 45.9241 0.947266 29.7513 0.947266C13.5785 0.947266 0.502594 14.21 0.502594 30.6138C0.502594 47.0177 13.5785 60.2803 29.7513 60.2803ZM29.7513 4.43745C44.0315 4.43745 55.559 16.1296 55.559 30.6138C55.559 45.0981 44.0315 56.7902 29.7513 56.7902C15.471 56.7902 3.94362 45.0981 3.94362 30.6138C3.94362 16.1296 15.471 4.43745 29.7513 4.43745ZM28.2075 43.5174L30.9807 41.2347L21.2238 32.3585H45.2354V28.8683H21.2242L30.9807 19.9924L28.2075 17.7097L13.7756 30.6136L28.2075 43.5174Z',
    );
  }

  svg.appendChild(path);
  parent.appendChild(svg);
  if (curClass) {
    svg.classList.add(curClass);
  }
  return svg;
}

function transformAmountWords(amountWords: number) {
  if (amountWords === 1) {
    return `${amountWords} слово`;
  } else if (amountWords >= 2 && amountWords <= 4) {
    return `${amountWords} слова`;
  } else {
    return `${amountWords} слов`;
  }
}

function addButtons() {
  const resultHTML: HTMLElement = document.querySelector('.result');
  const resultBtns: HTMLElement = createHtmlElement('div', resultHTML, 'result-btns');
  const resultNextBtn = createHtmlElement('button', resultBtns, 'result-btns__next-btn', 'Сыграть ещё раз');
  const resultToTutorialBtn = createHtmlElement('button', resultBtns, 'result-btns__to-tutorial', 'Перейти в учебник');
  resultNextBtn.addEventListener('click', startNewGame);
}

function showResult() {
  const audiocallHTML: HTMLElement = document.querySelector('.audiocall');
  clearPage(audiocallHTML);

  const rightAnswersAmound: number = words.reduce((a, b) => a + Number(b.correctAnswer), 0);
  const wrongAnswersAmound: number = AMOUNT_ROUND_WORDS - rightAnswersAmound;
  const percent = Math.round((rightAnswersAmound / AMOUNT_ROUND_WORDS) * 100);
  let message = 'В этот раз не получилось, но продолжай тренироваться!';
  if (rightAnswersAmound >= AMOUNT_WORDS_GREAD_RESULT) {
    message = 'Поздравляем, отличный результат!';
  } else if (rightAnswersAmound >= AMOUNT_WORDS_GOOD_RESULT) {
    message = 'Неплохо, но есть над чем поработать!';
  }

  const resultHTML: HTMLElement = createHtmlElement('div', audiocallHTML, 'result');
  const titleHTML: HTMLElement = createHtmlElement('div', resultHTML, 'result-title');

  createHtmlElement('div', titleHTML, 'result-title__left');
  createHtmlElement('div', titleHTML, 'result-title__message', message);
  const resultArrowRight = createHtmlElement('div', titleHTML, 'result-title__right');

  createSvgArrow(resultArrowRight, 'right', 'result-title__right');
  resultArrowRight.addEventListener('click', showLearnedWords);

  createHtmlElement(
    'div',
    resultHTML,
    'result__amount-words',
    `${transformAmountWords(rightAnswersAmound)} изучено, ${transformAmountWords(wrongAnswersAmound)} на изучении`,
  );
  const resultPieHTML: HTMLElement = createHtmlElement('div', resultHTML, 'result-pie');
  resultPieHTML.setAttribute('style', `--p:${percent}`);
  createHtmlElement('div', resultPieHTML, 'result-pie__title', `${percent}%`);
  createHtmlElement('div', resultPieHTML, 'result-pie__message', 'изученных');
  createHtmlElement('div', resultPieHTML, 'result-pie__message', 'слов');

  addButtons();
}

function formLines(isCorrect: boolean, parent: HTMLElement) {
  for (let i = 0; i < words.length; i++) {
    if (words[i].correctAnswer !== isCorrect) {
      continue;
    }
    const wordsLineHTML = createHtmlElement('div', parent, 'words-line');
    const wordsLineSpeakerHTML = createHtmlElement('div', wordsLineHTML, 'words-line__speaker');
    createSvgSpeaker(wordsLineSpeakerHTML, 'words-line__speaker-svg');
    wordsLineSpeakerHTML.addEventListener('click', () => playSound('word', i));
    createHtmlElement('span', wordsLineHTML, 'words-line__word', words[i].word);
    createHtmlElement('span', wordsLineHTML, 'words-line__translation', `- ${words[i].wordTranslate}`);
  }
}

function showLearnedWords() {
  const resultHTML: HTMLElement = document.querySelector('.result');
  clearPage(resultHTML);

  const rightAnswersAmound: number = words.reduce((a, b) => a + Number(b.correctAnswer), 0);
  const wrongAnswersAmound: number = AMOUNT_ROUND_WORDS - rightAnswersAmound;

  const wordsHTML: HTMLElement = createHtmlElement('div', resultHTML, 'words');
  
  //errors
  const wordsTitleErHTML: HTMLElement = createHtmlElement('div', wordsHTML, 'words-title');
  const resultArrowLeft: HTMLElement = createHtmlElement('div', wordsTitleErHTML, 'words-title__left');
  createSvgArrow(resultArrowLeft, 'left', 'result-title__left');
  resultArrowLeft.addEventListener('click', showResult);

  const wordsTitleMiddleErrHTML = createHtmlElement('div', wordsTitleErHTML, 'words-title__middle');

  createHtmlElement('div', wordsTitleMiddleErrHTML, 'words-title__message', 'Ошибок');
  const wordsTitleErrorsHTML = createHtmlElement('div', wordsTitleMiddleErrHTML, 'words-title__errors');
  createHtmlElement('div', wordsTitleErrorsHTML, 'words-title__amount-errors', String(wrongAnswersAmound));
  createHtmlElement('div', wordsTitleErHTML, 'words-title__right');
  
  createHtmlElement('div', wordsTitleErHTML, 'words-title__right');

  formLines(false, wordsHTML);

  createHtmlElement('div', wordsHTML, 'words-delimiter');

  //correct
  const wordsTitleCorrHTML: HTMLElement = createHtmlElement('div', wordsHTML, 'words-title');
  const resultArrowRight: HTMLElement = createHtmlElement('div', wordsTitleCorrHTML, 'words-title__left');

  const wordsTitleMiddleCorrHTML = createHtmlElement('div', wordsTitleCorrHTML, 'words-title__middle');

  createHtmlElement('div', wordsTitleMiddleCorrHTML, 'words-title__message', 'Знаю');
  const wordsTitleCorrectHTML = createHtmlElement('div', wordsTitleMiddleCorrHTML, 'words-title__correct');
  createHtmlElement('div', wordsTitleCorrectHTML, 'words-title__amount-errors', String(rightAnswersAmound));
  createHtmlElement('div', wordsTitleCorrHTML, 'words-title__right');
  
  formLines(true, wordsHTML);

  addButtons();
}

export { showResult, showLearnedWords, createSvgSpeaker };
