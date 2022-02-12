import {createHTMLElement} from "../../../utils/CommonFunctions";

class Page {
  readonly page: HTMLElement;
  constructor(className: string, tag = 'section') {
    this.page = createHTMLElement(tag, className);
  }

  render() {
    return this.page;
  }
}

export default Page;
