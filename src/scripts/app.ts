import { ViewManager } from './manager/ViewManager';

async function init() {
  const viewManager = new ViewManager();
  await viewManager.init();
  viewManager.renderFooter();
  window.addEventListener('go-to-login-screen', () => {
    viewManager.renderHome();
  })
}

init();
