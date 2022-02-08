import { createElement } from '../util/Util';

export class Games {
  constructor(rootEl: HTMLElement) {
    rootEl.innerHTML = '';
    const section = createElement('section', ['main-box__section', 'main-box__section_type_games', 'section-games']);

    const header = createElement('h2', ['section-games__header'], [], 'Подробнее об играх');

    const gameSprintBox = createElement('div', ['section-games__game-box']);
    const gameSprint = createElement(
      'img',
      ['section-games__game-img'],
      [
        ['src', '../../../assets/img/sprint.webp'],
        ['alt', 'sprint img'],
      ],
    );
    const gameSprintInfo = createElement(
      'p',
      ['section-games__game-info'],
      [],
      `Спринт! В этом режиме есть таймер с определённым временем, в течении которого пользователю предстоит выбрать как можно больше верных переводов.
       За серию верных ответов начисляются дополнительные баллы. Лучший результат сохраняется в статистике пользователя. Результат в данном режиме напрямую влияет на прогресс в изучении`,
    );

    const gameAudiocallBox = createElement('div', ['section-games__game-box']);
    const gameAudiocall = createElement(
      'img',
      ['section-games__game-img'],
      [
        ['src', '../../../assets/img/audiocall.webp'],
        ['alt', 'audiocall img'],
      ],
    );
    const gameAudiocallInfo = createElement(
      'p',
      ['section-games__game-info'],
      [],
      `Аудиовызов. В этом режиме пользователю предстоит внимательно вслушиваться в произношения слов и выбирать верный перевод.
       Данный режим позволит понять как стоит правильно произносить слова, а также улучшит восприятие этих слов на слух.`,
    );

    gameSprintBox.append(gameSprint, gameSprintInfo);
    gameAudiocallBox.append(gameAudiocall, gameAudiocallInfo);
    const gameBox = createElement('div', ['section-games__games-box']);
    gameBox.append(gameSprintBox, gameAudiocallBox);

    section.append(header, gameBox);

    rootEl.append(section);
  }
}
