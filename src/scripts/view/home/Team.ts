import { createElement } from '../util/Util';

export class Team {
  constructor(rootEl: HTMLElement) {
    rootEl.innerHTML = '';
    const section = createElement('section', ['main-box__section', 'main-box__section_type_team', 'section-team']);

    const header = createElement('h2', ['section-team__header']);
    const teamList = createElement('ul', ['section-team__list']);

    const teamMemberAndrey = createElement('li', ['section-team__item']);
    const teamMemberAnna = createElement('li', ['section-team__item']);
    const teamMemberValentin = createElement('li', ['section-team__item']);

    const memberAndreyImg = createElement('img', ['section-team__member-img'], [['src', '']]);
    const memberAnnaImg = createElement('img', ['section-team__member-img'], [['src', '']]);
    const memberValentinImg = createElement('img', ['section-team__member-img'], [['src', '']]);

    const memberAndreyInfo = createElement(
      'p',
      ['section-team__member-info'],
      [],
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, perspiciatis. Minima explicabo sapiente reprehenderit consequatur eligendi neque fuga blanditiis, asperiores unde repudiandae. Aliquid placeat non vel, sint eius facere porro enim consequatur aut amet dolores illum libero reprehenderit expedita cum maxime dolorem nam tempora qui numquam laboriosam hic reiciendis in?'
    );
    const memberAnnaInfo = createElement(
      'p',
      ['section-team__member-info'],
      [],
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, perspiciatis. Minima explicabo sapiente reprehenderit consequatur eligendi neque fuga blanditiis, asperiores unde repudiandae. Aliquid placeat non vel, sint eius facere porro enim consequatur aut amet dolores illum libero reprehenderit expedita cum maxime dolorem nam tempora qui numquam laboriosam hic reiciendis in?'
    );
    const memberValentinInfo = createElement(
      'p',
      ['section-team__member-info'],
      [],
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, perspiciatis. Minima explicabo sapiente reprehenderit consequatur eligendi neque fuga blanditiis, asperiores unde repudiandae. Aliquid placeat non vel, sint eius facere porro enim consequatur aut amet dolores illum libero reprehenderit expedita cum maxime dolorem nam tempora qui numquam laboriosam hic reiciendis in?'
    );

    teamMemberAndrey.append(memberAndreyImg, memberAndreyInfo);
    teamMemberAnna.append(memberAnnaImg, memberAnnaInfo);
    teamMemberValentin.append(memberValentinImg, memberValentinInfo);

    teamList.append(teamMemberAndrey, teamMemberAnna, teamMemberValentin);
    section.append(header, teamList);
    rootEl.append(section);
  }
}
