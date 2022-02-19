// use strict;

import { createElement } from '../util/Util';

export function getCommonBoxContent(learnedWordsOverall: number, rightAnswerOverall: number) {
  const learnWordBox = createElement('div', ['daily-common__word_box']);
  const learnWordAmount = createElement('span', ['daily-common__word_amount'], [], `${learnedWordsOverall}`);
  const learnWordText = createElement('span', ['daily-common__word_text'], [], 'слов изучено');
  learnWordBox.append(learnWordAmount, learnWordText);

  const rightAnswerBox = createElement('div', ['daily-common__answer_box']);
  const rightAnswerAmountBox = createElement('span', ['daily-common__answer_amount-box']);
  const rightAnswerAmount = createElement('span', ['daily-common__answer_amount'], [], `${rightAnswerOverall}`);
  rightAnswerAmountBox.append(rightAnswerAmount, '%');
  const rightAnswerAmountText = createElement('span', ['daily-common__answer_text'], [], 'правильных ответов');
  rightAnswerBox.append(rightAnswerAmountBox, rightAnswerAmountText);

  return [learnWordBox, rightAnswerBox];
}

export function getGameBoxContent(game: { wordsLearned: number; rightAnswers: number; maxSequence: number }) {
  const learnedWordsBox = createElement('span', ['daily-card__learned_box'], [], 'Изучено ');
  const learnedWords = createElement('span', ['daily-card__learned'], [], `${game.wordsLearned}`);
  learnedWordsBox.append(learnedWords, 'слов');

  const rightAnswersBox = createElement('span', ['daily-card__right_box'], [], 'Правильных ответов: ');
  const rightAnswers = createElement('span', ['daily-card__right'], [], `${game.rightAnswers}`);
  rightAnswersBox.append(rightAnswers, '%');

  const maxSequenceBox = createElement(
    'span',
    ['daily-card__sequence_box'],
    [],
    'Самая длинная серия правильных ответов: ',
  );
  const maxSequence = createElement('span', ['daily-card__sequence'], [], `${game.maxSequence}`);
  maxSequenceBox.append(maxSequence, '%');

  return [learnedWordsBox, rightAnswersBox, maxSequenceBox];
}
