import ColoredRing from './ColoredRing';
import { createHTMLElement } from '../utils/CommonFunctions';
import './Timer.scss';

class Timer extends ColoredRing {
  private readonly value: HTMLElement;

  private readonly time: number;

  // eslint-disable-next-line no-undef
  private setIntervalId: NodeJS.Timer;

  constructor(radiusConstantName: string, borderThicknessConstantName: string, time: number, className = 'timer') {
    super(radiusConstantName, borderThicknessConstantName, className);
    this.time = time;
    this.value = createHTMLElement('h2', `${className}__value`, `${time}`);
    this.container.append(this.value);
    this.setIntervalId = null;
  }

  startTimer() {
    let time = this.time;
    const oneSecondChunk = this.path / this.time;
    this.circle.style.strokeDashoffset = String(0);
    this.setIntervalId = setInterval(() => {
      this.changeRingColor(time / this.time);
      if (time > 0) {
        this.value.innerHTML = String(time);
        time -= 1;
        this.circle.style.strokeDashoffset = String(oneSecondChunk * (this.time - time));
      } else {
        this.value.innerHTML = String(0);
        this.resetTimer();
        window.dispatchEvent(new CustomEvent('time-over'));
      }
    }, 1000);
  }

  resetTimer() {
    if (this.setIntervalId) {
      clearInterval(this.setIntervalId);
    }
    this.resetColor();
  }
}

export default Timer;
