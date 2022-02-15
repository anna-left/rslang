import { FooterView } from './footer/FooterView';
import { setHome } from './home/home/homeController';

import { BurgerView } from './burger/BurgerView';
import { HeaderView } from './header/HeaderView';
import { MainView } from './main/MainView';
import Dictionary from "./dictionary/Dictionary";
import Sprint from "./sprint/Sprint";
import {LocalStorage} from "./state/StorageSettings";

async function init() {
  const burger = new BurgerView();
  const main = new MainView();
  new HeaderView(burger.burger, main.main, main.mainBox);
  main.render();
  new FooterView();

  const sprint = new Sprint();
  const dict = new Dictionary();
  await dict.init();
  await sprint.init();
  sprint.addDictionary(dict);
  dict.addSprint(sprint);
  dict.preSelectLevelAndPage(
    +localStorage.getItem(LocalStorage.dictionaryDifficultyLevel),
    +localStorage.getItem(LocalStorage.dictionaryPageNumber)
  )

  burger.render(main.main, main.mainBox, dict);
  setHome(main.main, main.mainBox);
}

init();
