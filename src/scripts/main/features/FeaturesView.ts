import { createElement } from '../../util/Util';

import './features.scss';

export class Feature {
  constructor(rootEl: HTMLElement) {
    rootEl.innerHTML = '';
    const section = createElement('section', [
      'main-box__section',
      'main-box__section_type_features',
      'section-features',
    ]);

    const aboutBox = createElement('div', ['section-features__box', 'section-features__about-box', 'about-box']);
    setAboutBox(aboutBox);


    // Progress
    const progressBox = createElement('div', [
      'section-features__box',
      'section-features__progress-box',
      'progress-box',
    ]);
    setProgressBox(progressBox);

    // Settings
    const settingsBox = createElement('div', [
      'section-features__box',
      'section-features__settings-box',
      'settings-box',
    ]);
    setSettingsBox(settingsBox);

    // crossplatform
    const crossplatformBox = createElement('div', [
      'section-features__box',
      'section-features__cross-box',
      'cross-box',
    ]);
    setCrossBox(crossplatformBox);

    const featuresBox = createElement('div', ['section-features__container']);
    featuresBox.append(progressBox, settingsBox, crossplatformBox);

    section.append(aboutBox, featuresBox);

    rootEl.append(section);
  }
}

function setAboutBox(aboutBox: HTMLElement) {
  const aboutHeader = createElement('h2', ['section-features__header', 'about-box__header'], [], 'Немного о RS Lang');
  const aboutInfo = createElement(
    'p',
    ['about-box__info'],
    [],
    `Есть возможность как просто учить слова, так и играть в игры,
  можно настраивать приложение под себя, а ещё во время обучения ведется статистика!`,
  );
  aboutBox.append(aboutHeader, aboutInfo);
}

function setProgressBox(progressBox: HTMLElement) {
  const progressHeader = createElement('h3', ['section-features__header', 'progress-box__header'], [], 'О статистике');

  const progressInfo = createElement(
    'p',
    ['progress-box__info'],
    [],
    `Для каждого пользователя ведется статистика во время обучения, что позволяет:
    - отслеживть трудные слова;
    - корректировать программу изучения под возможности каждого пользователя;
    - регулировать частоту появления слов
    - смотреть свой прогресс.`,
  );
  progressBox.append(progressHeader, progressInfo);
}

function setSettingsBox(settingsBox: HTMLElement) {
  const settingsHeader = createElement('h3', ['section-features__header', 'settings-box__header'], [], 'О настройках');

  const settingsInfo = createElement(
    'p',
    ['settings-box__info'],
    [],
    `В меню настроек есть возможность выбора различных функций:
    - выбор цветовой схемы;
    - выбор дневной нормы;
    - вид анимации;
    - язык интерфейса.`,
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
    `Занимайся в любом месте, в любое время и на любом подходящем устройстве.
  Можно заниматься дома за компьютером, любо лежа на диване с планшетом, а еще можно
  заниматься на телефоне во время рабочего перерыва, или стоя в длинной очереди.`,
  );

  crossplatformBox.append(crossHeader, crossInfo);
}
