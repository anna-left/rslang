// import { WordAudiocall } from './WordAudiocall';
import { startRound } from './startRound';
import { answerIndicatorSVG, speakerSVG } from './svg';
import { createHtmlElement } from './createHtmlElement';

function startAudiocall() {
  const header = document.querySelector('.header') as HTMLElement;
  header.style.display = 'none';
  const footer = document.querySelector('.footer') as HTMLElement;
  footer.style.display = 'none';
  const mainHTML = document.querySelector('.main') as HTMLElement;
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
