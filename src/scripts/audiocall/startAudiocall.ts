import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { startRound } from './startRound';
import { speakerSVG, nextSVG } from './svg';
import { createHtmlElement } from './createHtmlElement';

function clearPage(curHTMLElement: HTMLElement) {
  while (curHTMLElement.firstChild) {
    curHTMLElement.removeChild(curHTMLElement.firstChild);
  }
}

function startAudiocall(level: number, numperPage: number) {
  GLOBAL_VALUES.currentLevel = level;
  GLOBAL_VALUES.currentPage = numperPage;
  GLOBAL_VALUES.currentRound = 0;
  GLOBAL_VALUES.currentQuestion = 0;
  dispatchEvent(new CustomEvent('hide-footer'));
  dispatchEvent(new CustomEvent('hide-nav'));
  const mainBoxHTML: HTMLElement = document.querySelector('.main-box');
  clearPage(mainBoxHTML);
  createHtmlElement('div', mainBoxHTML, 'audiocall');

  mainBoxHTML.insertAdjacentHTML('beforeend', speakerSVG);
  mainBoxHTML.insertAdjacentHTML('beforeend', nextSVG);
  startRound();
}

export { startAudiocall, clearPage };
