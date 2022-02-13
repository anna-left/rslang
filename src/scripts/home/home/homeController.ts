import { HomeView } from './HomeVIew';

export function setHome(root: HTMLElement, rootEl: HTMLElement) {
  new HomeView(root, rootEl);
}
