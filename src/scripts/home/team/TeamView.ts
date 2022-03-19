import { createElement } from '../../util/Util';

import './team.scss';
import { getHiddenSvgs, getSvgs } from './teamBuilder';

export class Team {
  constructor(rootEl: HTMLElement) {
    rootEl.innerHTML = '';
    const section = createElement('section', ['main-box__section', 'main-box__section_type_team', 'section-team']);
    section.append(getHiddenSvgs());

    const header = createElement('h2', ['section-team__header'], [], 'О Команде');
    const teamList = createElement('ul', ['section-team__list']);

    const teamMemberAndrey = createElement('li', ['section-team__item']);
    const teamMemberAnna = createElement('li', ['section-team__item']);
    const teamMemberValentin = createElement('li', ['section-team__item']);

    const svgs = getSvgs();

    const imgBoxAndrey = createElement('div', ['section-team__item_icon-box']);
    imgBoxAndrey.append(svgs.figureAndrey, svgs.iconAndrey);
    const imgBoxAnna = createElement('div', ['section-team__item_icon-box']);
    imgBoxAnna.append(svgs.figureAnna, svgs.iconAnna);
    const imgBoxValentin = createElement('div', ['section-team__item_icon-box']);
    imgBoxValentin.append(svgs.figureValentin, svgs.iconValentin);

    const textBoxAndrey = createElement('div', ['section-team__item_text-box']);
    const textBoxAnna = createElement('div', ['section-team__item_text-box']);
    const textBoxValentin = createElement('div', ['section-team__item_text-box']);

    const memberAndreyHeader = createElement('h3', ['section-team__item_header']);
    const gitLinkAndrey = createElement(
      'a',
      ['section-team__item_git-link'],
      [
        ['href', 'https://github.com/ts-andrey'],
        ['target', '_blank'],
      ],
      'Andrei Tsakunou (Team Lead)',
    );
    memberAndreyHeader.append(gitLinkAndrey);
    const memberAnnaHeader = createElement('h3', ['section-team__item_header']);
    const gitLinkAnna = createElement(
      'a',
      ['section-team__item_git-link'],
      [
        ['href', 'https://github.com/anna-left'],
        ['target', '_blank'],
      ],
      'Anna Rybakova (Encourager)',
    );
    memberAnnaHeader.append(gitLinkAnna);
    const memberValentinHeader = createElement('h3', ['section-team__item_header']);
    const gitLinkValentin = createElement(
      'a',
      ['section-team__item_git-link'],
      [
        ['href', 'https://github.com/valentine909'],
        ['target', '_blank'],
      ],
      'Valiantsin Nazarau (Tech Brain)',
    );
    memberValentinHeader.append(gitLinkValentin);

    const memberAndreyInfo = createElement(
      'p',
      ['section-team__item_text'],
      [],
      `Стэк проделанной работы:
      - разработал структуру проекта.
      - разработал информационный блок сайта;
      - настроил авторизацию;
      - сверстал и подключил статистику;
      - решал организационные и технические вопросы/проблемы;
      - проводил Code Review.`,
    );
    const memberAnnaInfo = createElement(
      'p',
      ['section-team__item_text'],
      [],
      `Стэк проделанной работы:
      - разработала макет сайта;
      - разработала игру Audiocall;
      - разработала функционал для записи и чтения статистики;
      - помогала команде с мотивацией и вдохновлением;
      - проводила Code Review.`,
    );
    const memberValentinInfo = createElement(
      'p',
      ['section-team__item_text'],
      [],
      `Стэк проделанной работы:
      - разработал игру Sprint;
      - разработал словарь;
      - настроил back-end часть;
      - помогал решать многие технические вопросы;
      - проводил Code Review.`,
    );

    textBoxAndrey.append(memberAndreyHeader, memberAndreyInfo);
    textBoxAnna.append(memberAnnaHeader, memberAnnaInfo);
    textBoxValentin.append(memberValentinHeader, memberValentinInfo);

    teamMemberAndrey.append(imgBoxAndrey, textBoxAndrey);
    teamMemberAnna.append(imgBoxAnna, textBoxAnna);
    teamMemberValentin.append(imgBoxValentin, textBoxValentin);

    teamList.append(teamMemberAndrey, teamMemberAnna, teamMemberValentin);
    section.append(header, teamList);
    rootEl.append(section);
  }
}
