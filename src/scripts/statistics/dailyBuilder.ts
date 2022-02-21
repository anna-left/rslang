// use strict;

import { createElement } from '../util/Util';

export function getCommonBoxContent(learnedWordsOverall: number, newWordsOverall: number, rightAnswerOverall: number) {
  const learnWordBox = createElement('div', ['daily-common__word_box']);
  const learnWordAmount = createElement('span', ['daily-common__word_amount'], [], `${learnedWordsOverall}`);
  const learnWordText = createElement('span', ['daily-common__word_text'], [], 'слов изучено');
  learnWordBox.append(learnWordAmount, learnWordText);

  const newWordBox = createElement('div', ['daily-common__word_box']);
  const newWordAmount = createElement('span', ['daily-common__word_amount'], [], `${newWordsOverall}`);
  const newWordText = createElement('span', ['daily-common__word_text'], [], 'новых слов изучено');
  newWordBox.append(newWordAmount, newWordText);

  const rightAnswerBox = createElement('div', ['daily-common__answer_box']);
  const rightAnswerAmountBox = createElement('span', ['daily-common__answer_amount-box']);
  const rightAnswerAmount = createElement('span', ['daily-common__answer_amount'], [], `${rightAnswerOverall}`);
  rightAnswerAmountBox.append(rightAnswerAmount, '%');
  const rightAnswerAmountText = createElement('span', ['daily-common__answer_text'], [], 'правильных ответов');
  rightAnswerBox.append(rightAnswerAmountBox, rightAnswerAmountText);

  return [learnWordBox, newWordBox, rightAnswerBox];
}

export function getGameBoxContent(game: { newWordsLearned: number; rightAnswerNum: number; maxSequence: number }) {
  const learnedWordsBox = createElement('span', ['daily-card__learned_box'], [], 'Новых слов: ');
  const learnedWords = createElement('span', ['daily-card__learned'], [], `${game.newWordsLearned}`);
  learnedWordsBox.append(learnedWords);

  const rightAnswersBox = createElement('span', ['daily-card__right_box'], [], 'Правильных ответов: ');
  const rightAnswers = createElement('span', ['daily-card__right'], [], `${game.rightAnswerNum}`);
  rightAnswersBox.append(rightAnswers, '%');

  const maxSequenceBox = createElement(
    'span',
    ['daily-card__sequence_box'],
    [],
    'Самая длинная серия\nправильных ответов: ',
  );
  const maxSequence = createElement('span', ['daily-card__sequence'], [], `${game.maxSequence}`);
  maxSequenceBox.append(maxSequence, '%');

  return [learnedWordsBox, rightAnswersBox, maxSequenceBox];
}
