import { clearPage } from './startAudiocall';
import { createHtmlElement } from './createHtmlElement';
import { words, startRound } from './startRound';
import {
  AMOUNT_ROUND_WORDS,
  AMOUNT_WORDSS_GOOD_RESULT,
  AMOUNT_WORDSS_GREAD_RESULT,
} from './constantsAndValues/constants';

function createSVGArrow(parent: HTMLElement, direction: string, curClass: string) {
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

function transformAmountWords(amountWords:number) {
  if (amountWords === 1) {
    return `${amountWords} слово`;
  } else if (amountWords >= 2 && amountWords <= 4) {
    return `${amountWords} слова`;
  } else {return `${amountWords} слов`}
}

function addButtons() {
  const resultHTML: HTMLElement = document.querySelector('.result');
  const resultBtns: HTMLElement = createHtmlElement('div', resultHTML, 'result-btns');
  const resultNextBtn = createHtmlElement('button', resultBtns, 'result-btns__next-btn', 'Сыграть ещё раз');
  const resultToTutorialBtn = createHtmlElement('button', resultBtns, 'result-btns__to-tutorial', 'Перейти в учебник');
  resultNextBtn.addEventListener('click', startRound);
}

function showResult() {
  const audiocallHTML: HTMLElement = document.querySelector('.audiocall');
  clearPage(audiocallHTML);

  const rightAnswersAmound: number = words.reduce((a, b) => a + Number(b.correctAnswer), 0);
  const wrongAnswersAmound: number = AMOUNT_ROUND_WORDS - rightAnswersAmound;
  const percent = Math.round((rightAnswersAmound / AMOUNT_ROUND_WORDS) * 100);
  let message = 'В этот раз не получилось, но продолжай тренироваться!';
  if (rightAnswersAmound >= AMOUNT_WORDSS_GREAD_RESULT) {
    message = 'Поздравляем, отличный результат!';
  } else if (rightAnswersAmound >= AMOUNT_WORDSS_GOOD_RESULT) {
    message = 'Неплохо, но есть над чем поработать!';
  }

  const resultHTML: HTMLElement = createHtmlElement('div', audiocallHTML, 'result');
  const titleHTML: HTMLElement = createHtmlElement('div', resultHTML, 'result-title');

  createHtmlElement('div', titleHTML, 'result-title__left');
  createHtmlElement('div', titleHTML, 'result-title__message', message);
  const resultArrowRight = createHtmlElement('div', titleHTML, 'result-title__right');
  
  createSVGArrow(resultArrowRight, 'right', 'result-title__right');
  resultArrowRight.addEventListener('click', showLearnedWords);

  createHtmlElement(
    'div',
    resultHTML,
    'result__amount-words',
    `${transformAmountWords(rightAnswersAmound)} изучено, ${transformAmountWords(wrongAnswersAmound)} на изучении`
  );
  const resultPieHTML: HTMLElement = createHtmlElement('div', resultHTML, 'result-pie');
  resultPieHTML.setAttribute('style', `--p:${percent}`);
  createHtmlElement('div', resultPieHTML, 'result-pie__title', `${percent}%`);
  createHtmlElement('div', resultPieHTML, 'result-pie__message', 'изученных');
  createHtmlElement('div', resultPieHTML, 'result-pie__message', 'слов');

  addButtons();
}

function showLearnedWords() {
  const resultHTML: HTMLElement = document.querySelector('.result');
  clearPage(resultHTML);

  const wordsHTML: HTMLElement = createHtmlElement('div', resultHTML, 'words');
  const errorsHTML: HTMLElement = createHtmlElement('div', wordsHTML, 'errors');
  const errorsTitleHTML: HTMLElement = createHtmlElement('div', resultHTML, 'errors-title');
  const resultArrowLeft: HTMLElement = createHtmlElement('div', errorsTitleHTML, 'errors-title__left');
  createSVGArrow(resultArrowLeft, 'left', 'result-title__left');
  resultArrowLeft.addEventListener('click', showResult);
  createHtmlElement('div', errorsTitleHTML, 'errors-title__message', 'Ошибок');
  createHtmlElement('div', errorsTitleHTML, 'errors-title__right');

  const knowHTML: HTMLElement = createHtmlElement('div', wordsHTML, 'know');
  
  addButtons();
  
  // createHtmlElement('div', errorsTitleHTML, 'errors-title__message', 'Ошибок');
  // createHtmlElement('div', errorsTitleHTML, 'errors-title__rigft');

  // const resultArrowRight = createHtmlElement('div', titleHTML, 'result-title__right');

  


  // createHtmlElement('div', resultHTML, 'errors-title', 'Ошибок');
  // createHtmlElement('div', resultHTML, 'know-title', 'Знаю');
}

export { showResult, showLearnedWords };
