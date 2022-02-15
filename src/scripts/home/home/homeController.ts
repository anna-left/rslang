import { HomeView } from './HomeVIew';

export function setHome(root: HTMLElement, rootEl: HTMLElement) {
  new HomeView(root, rootEl);
}

export function linkSeeker(links: HTMLElement[]) {
  const LINK_CLASS_ACTIVE = 'home-navigation__link_state_active';
  links.forEach((el) => {
    el.addEventListener('click', () => {
      links.forEach((el) => el.classList.remove(LINK_CLASS_ACTIVE));
      el.classList.add(LINK_CLASS_ACTIVE);
    });
  });
}
