import { HomeView } from './HomeVIew';

export function setHome() {
  const rootEl: HTMLElement = document.querySelector('.main-box');
  const root: HTMLElement = document.querySelector('main');
  new HomeView(root, rootEl);
}
