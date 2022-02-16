import { FooterView } from './footer/FooterView';

import { BurgerView } from './burger/BurgerView';
import { HeaderView } from './header/HeaderView';
import { MainView } from './main/MainView';
import Dictionary from './dictionary/Dictionary';
import Sprint from './sprint/Sprint';
import { LocalStorage } from './state/StorageSettings';
import { ViewManager } from './manager/ViewManager';

async function init() {
  const sprint = new Sprint();
  const dict = new Dictionary();
  await dict.init();
  await sprint.init();
  sprint.addDictionary(dict);
  dict.addSprint(sprint);
  dict.preSelectLevelAndPage(
    +localStorage.getItem(LocalStorage.dictionaryDifficultyLevel),
    +localStorage.getItem(LocalStorage.dictionaryPageNumber),
  );

  const viewManager = new ViewManager();
  viewManager.renderFooter();
}

init();
