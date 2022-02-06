import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { NUMBER_OF_WORDS_IN_ROUND } from './constantsAndValues/constants';
import { createHtmlElement } from './createHtmlElement';
import { words } from './startRound';
import { playSound } from './playSound';
import { startRound } from './startRound';
import { startQuestion } from './startQuestion';

function processAnswer() {

  document.querySelector('.audiocall-question__btn').remove();
  const audiocallQuestionHTML = document.querySelector('.audiocall-question') as HTMLElement;
  const audiocallNextBtn = createHtmlElement('button', audiocallQuestionHTML, 'audiocall-next__btn', 'Следующий вопрос');
  audiocallNextBtn.addEventListener('click', () => {
    GLOBAL_VALUES.noAnswer = 0;
    GLOBAL_VALUES.currentQuestion++;
    
    if (GLOBAL_VALUES.currentQuestion > NUMBER_OF_WORDS_IN_ROUND) {
      GLOBAL_VALUES.currentQuestion = 0;
      startRound();
    } else {
      startQuestion();
    }
  });

  const answersHTML = document.querySelectorAll('.answer');
  const curWord = words[GLOBAL_VALUES.currentQuestion];
  if (GLOBAL_VALUES.noAnswer === 1) {
    playSound('wrong');
    for (let i = 0; i < answersHTML.length; i++) {
      const curAnswerHTML = answersHTML[i] as HTMLElement;
      curAnswerHTML.removeEventListener('click', processAnswer);
      const answerWordHTML = curAnswerHTML.querySelector('.answer__word') as HTMLElement;
      if (curWord.wordTranslate !== curWord.answers[i]) {
        answerWordHTML.style.opacity = '0.5';
      }
    }
    return;
  }
  const curNumber = Number(this.getAttribute('data-num'));

  if (curWord.wordTranslate === curWord.answers[curNumber]) {
    playSound('right');
    for (let i = 0; i < answersHTML.length; i++) {
      const curAnswerHTML = answersHTML[i] as HTMLElement;
      curAnswerHTML.removeEventListener('click', processAnswer);
      const answerWordHTML = curAnswerHTML.querySelector('.answer__word') as HTMLElement;
      const answerIndicatorHTML = curAnswerHTML.querySelector('.answer__indicator') as HTMLElement;
      if (i === curNumber) {
        answerIndicatorHTML.style.display = 'block';
      } else {
        answerWordHTML.style.opacity = '0.5';
      }
    }
  } else {
    playSound('wrong');
    for (let i = 0; i < answersHTML.length; i++) {
      const curAnswerHTML = answersHTML[i] as HTMLElement;
      curAnswerHTML.removeEventListener('click', processAnswer);
      const answerWordHTML = curAnswerHTML.querySelector('.answer__word') as HTMLElement;
      if (i === curNumber) {
        answerWordHTML.classList.add('answer__word_width');
        answerWordHTML.style.opacity = '0.5';
        console.log(answerWordHTML.classList);
      } else if (curWord.wordTranslate !== curWord.answers[i]) {
        answerWordHTML.style.opacity = '0.5';
      }
    }
  }

 
}

export { processAnswer };
