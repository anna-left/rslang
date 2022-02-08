// import { WordAudiocall } from './WordAudiocall';
import { startRound } from './startRound';
import { answerIndicatorSVG, speakerSVG, nextSVG } from './svg';
import { createHtmlElement } from './createHtmlElement';

function clearPage(curHTMLElement: HTMLElement) {
  while (curHTMLElement.firstChild) {
    curHTMLElement.removeChild(curHTMLElement.firstChild);
  }
}

function startAudiocall() {
  const header: HTMLElement = document.querySelector('.header');
  header.style.display = 'none';
  const footer: HTMLElement = document.querySelector('.footer');
  footer.style.display = 'none';
  const mainHTML: HTMLElement = document.querySelector('.main');
  clearPage(mainHTML);
  createHtmlElement('div', mainHTML, 'audiocall');

  document.body.insertAdjacentHTML('beforeend', answerIndicatorSVG);
  document.body.insertAdjacentHTML('beforeend', speakerSVG);
  document.body.insertAdjacentHTML('beforeend', nextSVG);
  startRound();
}

export { startAudiocall, clearPage };
