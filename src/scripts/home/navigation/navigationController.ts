export function linkSeeker(links: HTMLElement[]) {
  const LINK_CLASS_ACTIVE = 'home-navigation__link_state_active';
  links.forEach((el) => {
    el.addEventListener('click', () => {
      links.forEach((link) => link.classList.remove(LINK_CLASS_ACTIVE));
      el.classList.add(LINK_CLASS_ACTIVE);
    });
  });
}
