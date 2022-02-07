import { createElement } from '../util/Util';

export class Feature {
  constructor(rootEl: HTMLElement) {
    rootEl.innerHTML = '';
    const section = createElement('section', [
      'main-box__section',
      'main-box__section_type_features',
      'section-features',
    ]);

    const aboutBox = createElement('div', ['section-features__about-box', 'about-box']);
    setAboutBox(aboutBox);

    // Games
    const gameList = createElement('div', ['section-features__game-box', 'game-box']);
    setFeatureGameBox(gameList);

    // Progress
    const progressBox = createElement('div', ['section-features__progress-box', 'progress-box']);
    setProgressBox(progressBox);

    // Settings
    const settingsBox = createElement('div', ['section-features__settings-box', 'settings-box']);
    setSettingsBox(settingsBox);

    // crossplatform
    const crossplatformBox = createElement('div', ['section-features__cross-box', 'cross-box']);
    setCrossBox(crossplatformBox);

    section.append(aboutBox, gameList, progressBox, settingsBox, crossplatformBox);

    rootEl.append(section);
  }
}

function setAboutBox(aboutBox: HTMLElement) {
  const aboutHeader = createElement('h2', ['section-features__header', 'about-box__header'], [], 'Немного о RS Lang');
  const aboutInfo = createElement(
    'p',
    ['about-box__info'],
    [],
    `Есть возможность как просто учить слова, так и играть в игры.
  Также можно настраивать приложение под себя и ещё много чего другого.
  Ниже есть подробное описание всего функционала.`,
  );
  aboutBox.append(aboutHeader, aboutInfo);
}

// setting games part
function setFeatureGameBox(gameBox: HTMLElement) {
  // default info
  const gameHeader = createElement('h3', ['section-features__header', 'game-box__header'], [], 'Об играх');

  const gameInfo = createElement(
    'p',
    ['game-box__info'],
    [],
    `Благодаря играм можно позволить себе изучать ангийский в увлекательной форме.
  Но игры позволяют не только изучить английский, они также развивают внимательность и пробуждают в нас соревновательный характер!`,
  );

  // pop-up info about games
  const gameList = createElement('ul', ['section-features__game-list']);

  const gameSprint = createElement('li', ['section-features__item', 'game-box__game', 'game-box__game_sprint']);
  const gameAudiocall = createElement('li', ['section-features__item', 'game-box__game', 'game-box__game_audiocall']);

  gameList.append(gameSprint, gameAudiocall);

  gameBox.append(gameHeader, gameInfo);
}

function setProgressBox(progressBox: HTMLElement) {
  const progressHeader = createElement('h3', ['section-features__header', 'progress-box__header'], [], 'О статистике');

  const progressInfo = createElement(
    'p',
    ['progress-box__info'],
    [],
    `Статистика позволяет подкорректировать программу изучения под возможности каждого пользователя.
  Статистика отслеживает какие слова запоминаются труднее, а какие легче.
  В зависимости от полученных данных изменяется программа обучения.
  Также в зависимости от трудности запоминая каждого слова регулируется как часто оно должно повторяться.
  Ваша статистика позаботится о том, чтобы вы наверняка выучили все слова и чтобы уж точно их не забыли!.`,
  );
  progressBox.append(progressHeader, progressInfo);
}

function setSettingsBox(settingsBox: HTMLElement) {
  const settingsHeader = createElement('h3', ['section-features__header', 'settings-box__header'], [], 'О настройках');

  const settingsInfo = createElement(
    'p',
    ['settings-box__info'],
    [],
    `В меню настроек есть возможность выбора различных функций.
  Вы можете выбрать для себя как светслую схему для дневных занятий, так  ночную - для вечерних.
  Есть возможность выбрать дневную цель, регулируя таким образом сколько слов в день вы готовы изучать.
  Имеется возможность выбрать стиль анимации, либо ее отключение.
  Также можно выбрать анлийский язык интерфейса, для еще большего углубления в изучение английского.`,
  );

  settingsBox.append(settingsHeader, settingsInfo);
}

function setCrossBox(crossplatformBox: HTMLElement) {
  const crossHeader = createElement(
    'h3',
    ['section-features__header', 'cross-box__header'],
    [],
    'RS Lang всегда рядом',
  );

  const crossInfo = createElement(
    'p',
    ['cross-box__info'],
    [],
    `Вы можете заниматься в любом месте, в любое время и на любом подходящем устройстве.
  Можно заниматься дома сидя за компьютером и наслаждаться кофе.
  Либо заниматься в более раслабленной форме: лежа на диване с планшетом.
  Также можно заниматься на телефоне во время рабочего перерыва или стоя в длинной очереди.
  И все это бесплатно. Необходимо лишь наличие интернета и желание.`,
  );

  crossplatformBox.append(crossHeader, crossInfo);
}
