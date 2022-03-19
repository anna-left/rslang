import { State } from '../state/State';
import { createHTMLElement } from '../utils/CommonFunctions';

class Page {
  readonly page: HTMLElement;

  constructor(className: string, tag = 'section') {
    this.page = createHTMLElement(tag, className);

    new State();
    const state = JSON.parse(localStorage.getItem('state'));
    if (state.colorScheme === 'light') {
      // this.page.style.background = 'linear-gradient(180deg, #cd8eff 0%, #fff 100%)';
    } else {
      // this.page.style.background = 'linear-gradient(180deg, #cd8eff 0%, #212121 100%)';
    }
  }

  render() {
    return this.page;
  }

  addClass(className: string[]) {
    this.page.classList.add(...className);
  }
}

export default Page;
