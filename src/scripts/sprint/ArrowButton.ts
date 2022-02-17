import Page from './Page';
import './ArrowButton.scss';

class ArrowButton extends Page {
  private readonly className: string[];

  constructor(className: string, eventName: string, reverse = false) {
    super('arrow-button', 'button');
    this.className = [];
    if (reverse) {
      this.page.innerText = '🡠';
      this.className = [className, 'arrow-button--backward'];
      this.addClass(this.className);
    } else {
      this.page.innerText = '🡢';
      this.className = [className, 'arrow-button--forward'];
      this.addClass(this.className);
    }
    this.page.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent(eventName));
    });
  }
}

export default ArrowButton;
