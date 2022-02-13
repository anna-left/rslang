import ColoredRing from "./ColoredRing";
import {createHTMLElement} from "../utils/CommonFunctions";
import './Timer.scss';

class Timer extends ColoredRing {
  private readonly value: HTMLElement;
  private readonly time: number;
  constructor(radiusConstantName: string, borderThicknessConstantName: string, className = 'timer', time: number) {
    super(radiusConstantName, borderThicknessConstantName, className);
    this.time = time;
    this.value = createHTMLElement('h2', `${className}__value`, `${time}`);
    this.container.append(this.value);
  }

  startTimer() {
    let time = this.time;
    const oneSecondChunk = this.path / this.time;
    this.circle.style.strokeDashoffset = String(0);
    const timerId = setInterval(() => {
      this.changeRingColor(time / this.time);
      if (time > 0) {
        this.value.innerHTML = String(time);
        time -= 1;
        this.circle.style.strokeDashoffset = String(oneSecondChunk * (this.time - time));
      } else {
        this.value.innerHTML = String(0);
        clearInterval(timerId);
        window.dispatchEvent(new CustomEvent('time-over'));
      }
    }, 1000);
  }
}

export default Timer;
