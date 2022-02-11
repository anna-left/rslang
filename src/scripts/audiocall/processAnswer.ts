import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { AMOUNT_ROUND_WORDS } from './constantsAndValues/constants';
import { createHtmlElement } from './createHtmlElement';
import { words } from './startRound';
import { playSound } from './playSound';
import { startRound } from './startRound';
import { startQuestion } from './startQuestion';
import { insertNextSVG } from './svg';
import { showResult, createSvgSpeaker } from './showResult';

function processAnswer() {
  const curWord = words[GLOBAL_VALUES.currentQuestion];

  const audiocallQuestionHTML: HTMLElement = document.querySelector('.audiocall-question');
  const containerHTML: HTMLElement = document.querySelector('.audiocall-question .container');

  containerHTML.querySelector('.speaker').remove();
  // const answerImage = createHtmlElement('div', audiocallQuestionHTML, 'answer-image');
  // const answer = createHtmlElement('div', audiocallQuestionHTML, 'answer-image');
  const answerImage: HTMLImageElement = document.createElement('img');
  answerImage.classList.add('answer-image');

  containerHTML.appendChild(answerImage);
  answerImage.src = `https://react-learnwords-example.herokuapp.com/${curWord.image}`;
  
  const wordHTML: HTMLElement = createHtmlElement('div', containerHTML, 'word');


  
  const wordsLineSpeakerHTML = createHtmlElement('div', wordHTML, 'words-line__speaker');
  createSvgSpeaker(wordsLineSpeakerHTML, 'words-line__speaker-svg');
  wordsLineSpeakerHTML.addEventListener('click', () => playSound('word'));
  createHtmlElement('span', wordHTML, 'words-line__word', words[GLOBAL_VALUES.currentQuestion].word);




  document.querySelector('.audiocall-question__btn').remove();
  const audiocallNextBtn = createHtmlElement('button', audiocallQuestionHTML, 'audiocall-next__btn');
  audiocallNextBtn.insertAdjacentHTML('beforeend', insertNextSVG);

  audiocallNextBtn.addEventListener('click', () => {
    GLOBAL_VALUES.noAnswer = 0;
    GLOBAL_VALUES.currentQuestion++;

    if (GLOBAL_VALUES.currentQuestion >= AMOUNT_ROUND_WORDS) {
      GLOBAL_VALUES.currentQuestion = 0;
      playSound('end of round');
      showResult();
    } else {
      startQuestion();
    }
  });

  const answersHTML = document.querySelectorAll('.answer');

  if (GLOBAL_VALUES.noAnswer === 1) {
    playSound('wrong');
    for (let i = 0; i < answersHTML.length; i++) {
      const curAnswerHTML = answersHTML[i];
      curAnswerHTML.removeEventListener('click', processAnswer);
      const answerWordHTML: HTMLElement = curAnswerHTML.querySelector('.answer__word');
      if (curWord.wordTranslate === curWord.answers[i]) {
        curAnswerHTML.classList.add('answer_right');
      } else {
        answerWordHTML.style.opacity = '0.5';
      }
    }
    return;
  }
  const curNumber = Number(this.getAttribute('data-num'));

  if (curWord.wordTranslate === curWord.answers[curNumber]) {
    curWord.correctAnswer = true;
    playSound('right');
    for (let i = 0; i < answersHTML.length; i++) {
      const curAnswerHTML = answersHTML[i];
      curAnswerHTML.removeEventListener('click', processAnswer);
      curAnswerHTML.classList.remove('answer_hover');
      const answerWordHTML: HTMLElement = curAnswerHTML.querySelector('.answer__word');
      // const answerIndicatorHTML: HTMLElement = curAnswerHTML.querySelector('.answer__indicator');
      if (i === curNumber) {
        // answerIndicatorHTML.style.display = 'block';
        curAnswerHTML.classList.add('answer_right');
      } else {
        answerWordHTML.style.opacity = '0.5';
      }
    }
  } else {
    playSound('wrong');
    for (let i = 0; i < answersHTML.length; i++) {
      const curAnswerHTML = answersHTML[i];
      curAnswerHTML.removeEventListener('click', processAnswer);
      curAnswerHTML.classList.remove('answer_hover');
      const answerWordHTML: HTMLElement = curAnswerHTML.querySelector('.answer__word');
      if (i === curNumber) {
        // answerWordHTML.classList.add('answer__word_width');
        curAnswerHTML.classList.add('answer_wrong');
        // answerWordHTML.style.opacity = '0.5';
      } else if (curWord.wordTranslate === curWord.answers[i]) {
        curAnswerHTML.classList.add('answer_right');
        // answerWordHTML.style.opacity = '0.5';
      } else {
        answerWordHTML.style.opacity = '0.5';
      }
    }
  }
}

export { processAnswer };
