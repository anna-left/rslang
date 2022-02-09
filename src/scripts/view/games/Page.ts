import {createHTMLElement} from "../../utils/CommonFunctions";

class Page {
  readonly page: HTMLElement;
  constructor(className: string) {
    this.page = createHTMLElement('section', className);
  }

  render() {
    return this.page;
  }
}

export default Page;
