export function curLinkHandler(links: HTMLElement[]) {
  const LINK_ACTIVE_CLASS = 'nav-list__item_state_active';
  links.forEach((el) => {
    el.addEventListener('click', () => {
      links.forEach((el) => {
        el.classList.remove(LINK_ACTIVE_CLASS);
      });
      el.classList.add(LINK_ACTIVE_CLASS);
    });
  });
}
