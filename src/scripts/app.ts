import Dictionary from './dictionary/Dictionary';
import Sprint from './sprint/Sprint';
import { LocalStorage } from './state/StorageSettings';
import { ViewManager } from './manager/ViewManager';
import Modal from "./api/Modal";

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
  const body = document.querySelector('body');
  const modal = new Modal(body);

  const viewManager = new ViewManager();
  viewManager.renderFooter();
  window.addEventListener('go-to-login-screen', ()=> {
    viewManager.renderHome();
  })
  window.addEventListener('show-error', (event: CustomEvent)=> {
    modal.setText(event.detail.error);
    modal.show();
  })
}

init();
