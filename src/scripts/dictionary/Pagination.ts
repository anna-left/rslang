import Page from "../sprint/Page";
import {createHTMLElement} from "../utils/CommonFunctions";
import './Pagination.scss';

class Pagination extends Page {
  private readonly className: string;
  private readonly list: HTMLElement[];
  private currentActivePage: number;
  private readonly size: number;
  private readonly modifier: string;
  private readonly paginationWing: number;

  constructor(className: string, size: number) {
    super(className, 'ul');
    this.className = className + '__page';
    this.modifier = '--active';
    this.size = size;
    this.list = [];
    this.paginationWing = 2;
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

  collapseList() {
    for (let i = 1; i  < this.list.length - 1; i += 1) {
      if (i < this.currentActivePage - this.paginationWing || i > this.currentActivePage + this.paginationWing) {
        this.list[i].classList.add('conceal');
      } else {
        this.list[i].classList.remove('conceal');
      }
    }
  }

  manageEllipsis() {
    if (1 < this.currentActivePage - this.paginationWing) {
      this.list[0].classList.add('ellipsis-right');
    } else {
      this.list[0].classList.remove('ellipsis-right');
    }
    if (this.currentActivePage + this.paginationWing < this.list.length - 1) {
      this.list[this.list.length - 1].classList.add('ellipsis-left');
    } else {
      this.list[this.list.length - 1].classList.remove('ellipsis-left');
    }
  }
}

export default Pagination;
