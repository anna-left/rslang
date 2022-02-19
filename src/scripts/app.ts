import { ViewManager } from './manager/ViewManager';

const viewManager = new ViewManager();
export const dict = viewManager.getDict();
export const api = viewManager.getAPI();

async function init() {
  await viewManager.init();
  viewManager.renderFooter();
}

init();
