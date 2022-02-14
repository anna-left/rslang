import Page from "../sprint/Page";
import {createHTMLElement} from "../utils/CommonFunctions";
import './Pagination.scss';

class Pagination extends Page {
  private readonly className: string;
  private readonly list: HTMLElement[];
  private currentActivePage: number;
  private readonly size: number;
  private readonly modifier: string;

  constructor(className: string, size: number) {
    super(className, 'ul');
    this.className = className + '__page';
    this.modifier = '--active';
    this.size = size;
    this.list = [];
    this.createList(size);
    this.currentActivePage = 0
    this.activatePage(this.currentActivePage);
  }

  createList(size: number) {
    for (let i = 0; i < size; i += 1) {
      const li = createHTMLElement('li', `${this.className}`, `${i + 1}`);
      this.page.append(li);
      this.list.push(li);
      li.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('dict-page', {detail: {page: i}}))
      })
    }
  }

  activatePage(number: number) {
    this.list[number].classList.add(`${this.className}${this.modifier}`);
    this.currentActivePage = number;
  }

  deactivatePage() {
    this.list[this.currentActivePage].classList.remove(`${this.className}--active`);
  }
}

export default Pagination;
