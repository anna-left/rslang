// import { WordAudiocall } from './WordAudiocall';
import { startRound } from './startRound';
import { answerIndicatorSVG, speakerSVG, nextSVG } from './svg';
import { createHtmlElement } from './createHtmlElement';

function startAudiocall() {
  const header: HTMLElement = document.querySelector('.header');
  header.style.display = 'none';
  const footer: HTMLElement = document.querySelector('.footer');
  footer.style.display = 'none';
  const mainHTML: HTMLElement = document.querySelector('.main');
  while (mainHTML.firstChild) {
    mainHTML.removeChild(mainHTML.firstChild);
  }
  createHtmlElement('div', mainHTML, 'audiocall');
  // createHtmlElement('audio', document.body, 'audio');

  document.body.insertAdjacentHTML('beforeend', answerIndicatorSVG);
  const speakerHTML = document.body.insertAdjacentHTML('beforeend', speakerSVG);
  // speakerHTML.style.fill = curAutoElement.color;
  startRound();
  // startQuestion();
}

export { startAudiocall };
