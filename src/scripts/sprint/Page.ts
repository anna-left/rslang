import {createHTMLElement} from "../utils/CommonFunctions";

class Page {
  readonly page: HTMLElement;
  constructor(className: string, tag = 'section') {
    this.page = createHTMLElement(tag, className);
  }

  render() {
    return this.page;
  }

  addClass(className: string[]) {
    this.page.classList.add(...className);
  }
}

export default Page;
