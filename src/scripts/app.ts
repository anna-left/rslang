import { FooterView } from './footer/FooterView';
import { setHome } from './home/home/homeController';

import { BurgerView } from './burger/BurgerView';
import { HeaderView } from './header/HeaderView';
import { MainView } from './main/MainView';
import Dictionary from './dictionary/Dictionary';
import Sprint from './sprint/Sprint';
import { LocalStorage } from './state/StorageSettings';
import Modal from "./api/Modal";

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
    +localStorage.getItem(LocalStorage.dictionaryPageNumber),
  );
  const body = document.querySelector('body');
  const modal = new Modal(body);

  burger.render(main.main, main.mainBox, dict);
  setHome(main.main, main.mainBox);
  window.addEventListener('go-to-login-screen', ()=> {
    setHome(main.main, main.mainBox);
  })
  window.addEventListener('show-error', (event: CustomEvent)=> {
    modal.setText(event.detail.error);
    modal.show();
  })
}

init();
