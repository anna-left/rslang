import { clearPage } from './startAudiocall';
import { playSound } from './playSound';
import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { createHtmlElement } from './createHtmlElement';
// import { currentDict } from '../app';
import { words, startRound, startNewGame } from './startRound';
import {
  AMOUNT_ROUND_WORDS,
  AMOUNT_WORDS_GOOD_RESULT,
  AMOUNT_WORDS_GREAD_RESULT,
  MESSAGE_BAD_RESULT,
  MESSAGE_GOOD_RESULT,
  MESSAGE_GREAD_RESULT,
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
  const resultContentHTML: HTMLElement = document.querySelector('.result-content');
  const resultBtns: HTMLElement = createHtmlElement('div', resultContentHTML, 'result-btns');
  const resultNextBtn = createHtmlElement('button', resultBtns, 'result-btns__next-btn', 'Сыграть ещё раз');
  const resultToTutorialBtn = createHtmlElement('button', resultBtns, 'result-btns__to-tutorial', 'Перейти в учебник');
  resultNextBtn.addEventListener('click', startNewGame);
  resultToTutorialBtn.addEventListener('click', async () => {
    // const dict = await currentDict;
    // console.log(dict);
    // dict.preSelectLevelAndPage(GLOBAL_VALUES.currentLevel, 0);
    // await dict.start();
  });
}

function showResult() {
  const audiocallHTML: HTMLElement = document.querySelector('.audiocall');
  clearPage(audiocallHTML);

  const rightAnswersAmound: number = words.reduce((a, b) => a + Number(b.correctAnswer), 0);
  const wrongAnswersAmound: number = AMOUNT_ROUND_WORDS - rightAnswersAmound;
  const percent = Math.round((rightAnswersAmound / AMOUNT_ROUND_WORDS) * 100);
  let message = MESSAGE_BAD_RESULT;
  if (percent >= AMOUNT_WORDS_GREAD_RESULT) {
    message = MESSAGE_GREAD_RESULT;
  } else if (percent >= AMOUNT_WORDS_GOOD_RESULT) {
    message = MESSAGE_GOOD_RESULT;
  }

  const resultHTML: HTMLElement = createHtmlElement('div', audiocallHTML, 'result');
  const resultContentHTML: HTMLElement = createHtmlElement('div', resultHTML, 'result-content');

  const titleHTML: HTMLElement = createHtmlElement('div', resultContentHTML, 'result-title');

  createHtmlElement('div', titleHTML, 'result-title__left');
  createHtmlElement('div', titleHTML, 'result-title__message', message);
  const resultArrowRight = createHtmlElement('div', titleHTML, 'result-title__right');
  resultArrowRight.innerText = '🡢';

  resultArrowRight.addEventListener('click', showLearnedWords);

  createHtmlElement(
    'div',
    resultContentHTML,
    'result__amount-words',
    `${transformAmountWords(rightAnswersAmound)} изучено, ${transformAmountWords(wrongAnswersAmound)} на изучении`,
  );
  const resultWrapperHTML: HTMLElement = createHtmlElement('div', resultContentHTML, 'result-wrapper');
  const resultPieHTML: HTMLElement = createHtmlElement('div', resultWrapperHTML, 'result-pie');
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
  const resultContentHTML: HTMLElement = document.querySelector('.result-content');
  clearPage(resultContentHTML);

  const rightAnswersAmound: number = words.reduce((a, b) => a + Number(b.correctAnswer), 0);
  const wrongAnswersAmound: number = AMOUNT_ROUND_WORDS - rightAnswersAmound;

  const wordsHTML: HTMLElement = createHtmlElement('div', resultContentHTML, 'words');

  //errors
  const wordsTitleErHTML: HTMLElement = createHtmlElement('div', wordsHTML, 'words-title');
  const resultArrowLeft: HTMLElement = createHtmlElement('div', wordsTitleErHTML, 'words-title__left');
  resultArrowLeft.innerText = '🡠';
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
  const resultArrowRight: HTMLElement = createHtmlElement('div', wordsTitleCorrHTML, 'result-title__left');

  const wordsTitleMiddleCorrHTML = createHtmlElement('div', wordsTitleCorrHTML, 'words-title__middle');

  createHtmlElement('div', wordsTitleMiddleCorrHTML, 'words-title__message', 'Знаю');
  const wordsTitleCorrectHTML = createHtmlElement('div', wordsTitleMiddleCorrHTML, 'words-title__correct');
  createHtmlElement('div', wordsTitleCorrectHTML, 'words-title__amount-errors', String(rightAnswersAmound));
  createHtmlElement('div', wordsTitleCorrHTML, 'words-title__right');

  formLines(true, wordsHTML);

  addButtons();
}

export { showResult, showLearnedWords, createSvgSpeaker, transformAmountWords };
