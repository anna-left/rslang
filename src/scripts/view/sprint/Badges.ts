import {createHTMLElement} from "../../utils/CommonFunctions";
import './Badges.scss';

class Badges {
  private readonly container: HTMLElement;
  private readonly badgesPerLevel: number;
  constructor(badgesPerLevel: number) {
    this.container = createHTMLElement('div', 'badges');
    this.badgesPerLevel = badgesPerLevel;
    this.init();
  }

  init() {
    for (let i = 0; i < this.badgesPerLevel; i += 1) {
      const badge = createHTMLElement('div', 'badge');
      this.container.append(badge);
    }
  }

  reset() {
    this.container.innerHTML = '';
    this.init();
  }

  activateNextBadge() {
    if (!this.container.children[0].classList.contains('badge--super')) {
      let found = false;
      let count = 0;
      while (!found && count < this.badgesPerLevel) {
        if (!this.container.children[count].classList.contains('badge--active')) {
          found = true;
          this.container.children[count].classList.add('badge--active');
        }
        count += 1;
      }
    }
  }

  activateCup() {
    this.container.innerHTML = '';
    const badge = createHTMLElement('div', 'badge badge--super');
    this.container.append(badge);
  }

  render() {
    return this.container;
  }
}

export default Badges;
