import { createElement } from '../../util/Util';

import './features.scss';
import {
  getFeaturesImage,
  setAboutBox,
  setCrossBox,
  setProgressBox,
  // setSettingsBox,
  setHiddenFeaturesSVG,
} from './featuresBuilder';

export class Feature {
  constructor(rootEl: HTMLElement) {
    rootEl.innerHTML = '';
    const section = createElement('section', [
      'main-box__section',
      'main-box__section_type_features',
      'section-features',
    ]);

    section.append(setHiddenFeaturesSVG());
    const aboutBox = createElement('div', ['section-features__about-box', 'about-box']);
    setAboutBox(aboutBox);

    // Progress
    const progressBox = createElement('div', [
      'section-features__box',
      'section-features__progress-box',
      'progress-box',
    ]);
    setProgressBox(progressBox);

    // Settings
    // const settingsBox = createElement('div', [
    //   'section-features__box',
    //   'section-features__settings-box',
    //   'settings-box',
    // ]);
    // setSettingsBox(settingsBox);

    // crossplatform
    const crossplatformBox = createElement('div', [
      'section-features__box',
      'section-features__cross-box',
      'cross-box',
    ]);
    setCrossBox(crossplatformBox);

    const featuresBox = createElement('div', ['section-features__container']);
    const featuresBoxText = createElement('div', ['section-features__container_text']);
    const featuresBoxImage = getFeaturesImage();
    featuresBoxText.append(progressBox, crossplatformBox);
    featuresBox.append(featuresBoxText, featuresBoxImage);
    section.append(aboutBox, featuresBox);

    rootEl.append(section);
  }
}
