import { createHTMLElement } from '../utils/CommonFunctions';
import './ProgressRing.scss';
import ColoredRing from './ColoredRing';

class ProgressRing extends ColoredRing {
  private readonly value: HTMLElement;

  private readonly text: HTMLElement;

  constructor(radiusConstantName: string, borderThicknessConstantName: string, className = 'progress-ring') {
    super(radiusConstantName, borderThicknessConstantName, className);
    this.value = createHTMLElement('h2', `${className}__value`);
    this.text = createHTMLElement('p', `${className}__text`);
    this.container.append(this.value, this.text);
  }

  update(percent: number, text: string) {
    this.value.innerText = `${percent}%`;
    this.text.innerText = text;
    this.changeRingColor(percent / 100);
    this.partialRing(percent);
  }

  render() {
    return this.container;
  }
}

export default ProgressRing;
