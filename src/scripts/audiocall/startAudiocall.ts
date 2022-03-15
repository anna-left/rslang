import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { startRound } from './startRound';
import { speakerSVG, nextSVG } from './svg';
import { createHtmlElement } from './createHtmlElement';
import { State } from '../state/State';

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
  const page = createHtmlElement('div', mainBoxHTML, 'audiocall');

  new State();
  const state = JSON.parse(localStorage.getItem('state'));
  if (state.colorScheme === 'light') {
    page.style.background = 'linear-gradient(180deg, #cd8eff 0%, #fff 100%)';
  } else {
    page.style.background = 'linear-gradient(180deg, #cd8eff 0%, #212121 100%)';
  }

  mainBoxHTML.insertAdjacentHTML('beforeend', speakerSVG);
  mainBoxHTML.insertAdjacentHTML('beforeend', nextSVG);
  startRound();
}

export { startAudiocall, clearPage };
