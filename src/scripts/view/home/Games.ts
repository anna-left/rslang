import { createElement } from '../util/Util';

export class Games {
  constructor(rootEl: HTMLElement){
    rootEl.innerHTML = '';
    const section = createElement('section', ['main-box__section', 'main-box__section_type_review', 'section-games']);

    const header = createElement('h2', ['section-games__header']);

    const gameSprintBox = createElement('div', ['section-games__game-box']);
    const gameSprint = createElement('img', ['section-games__game'], [['src', '']]);
    const gameSprintInfo = createElement('p', ['section-games__game-info']);

    const gameAudiocallBox = createElement('div', ['section-games__game-box']);
    const gameAudiocall = createElement('img', ['section-games__game'], [['src', '']]);
    const gameAudiocallInfo = createElement('p', ['section-games__game-info']);

    gameSprintBox.append(gameSprint, gameSprintInfo);
    gameAudiocallBox.append(gameAudiocall, gameAudiocallInfo);
    const gameBox = createElement('div', ['section-games__games-box']);
    gameBox.append(gameSprintBox, gameAudiocallBox);

    section.append(header, gameBox);

    rootEl.append(section);
  }
}
