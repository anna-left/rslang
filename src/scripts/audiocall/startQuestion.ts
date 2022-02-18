import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { createHtmlElement } from './createHtmlElement';
import { words } from './startRound';
import { insertSpeakerSVG } from './svg';
import { playSound } from './playSound';
import { processAnswer } from './processAnswer';
import { clearPage } from './startAudiocall';

function answerIDontKnow() {
  GLOBAL_VALUES.noAnswer = 1;
  processAnswer();
}

function getContext(eventKey: number) {
  const answersHTML = document.querySelectorAll('.answer');
  return answersHTML[eventKey - 1];
}

function handleSpace(event: KeyboardEvent) {
  if (event.code === 'Space') {
    playSound('word');
  }
}

function handleKeys(event: KeyboardEvent) {
  const answersIdArray = ['1', '2', '3', '4', '5'];
  if (event.key === 'Enter') {
    document.removeEventListener('keypress', handleKeys);
    answerIDontKnow();
  } else if (answersIdArray.includes(event.key)) {
    document.removeEventListener('keypress', handleKeys);
    const context = getContext(Number(event.key));
    const processAnswerContext = processAnswer.bind(context);
    processAnswerContext();
  }
}

function startQuestion() {
  GLOBAL_VALUES.noAnswer = 0;
  const audiocallHTML: HTMLElement = document.querySelector('.audiocall');
  clearPage(audiocallHTML);
  const audiocallQuestionHTML = createHtmlElement('div', audiocallHTML, 'audiocall-question');
  const containerHTML = createHtmlElement('div', audiocallQuestionHTML, 'container');

  const speakerHTML: HTMLElement = createHtmlElement('div', containerHTML, 'speaker');
  speakerHTML.insertAdjacentHTML('beforeend', insertSpeakerSVG);
  const speakerSVGHTML = document.querySelector('#speaker');
  speakerSVGHTML.classList.add('speaker__svg');
  speakerHTML.addEventListener('click', () => {
    playSound('word');
  });

  const answersHTML = createHtmlElement('div', audiocallQuestionHTML, 'answers');
  const curWord = words[GLOBAL_VALUES.currentQuestion];
  for (let i = 0; i < curWord.answers.length; i++) {
    const answerHTML = createHtmlElement('div', answersHTML, 'answer');
    answerHTML.classList.add('answer_hover');
    answerHTML.setAttribute('data-num', String(i));
    answerHTML.addEventListener('click', processAnswer);
    // answerHTML.insertAdjacentHTML('beforeend', insertAnswerIndicatorSVG);
    createHtmlElement('div', answerHTML, 'answer__word', curWord.answers[i]);
  }
  const audiocallQuestionBtn = createHtmlElement('button', audiocallQuestionHTML, 'audiocall-question__btn', 'Не знаю');
  audiocallQuestionBtn.addEventListener('click', answerIDontKnow);
  document.addEventListener('keypress', handleKeys);
  document.addEventListener('keypress', handleSpace);
  playSound('word');
}

export { startQuestion };
