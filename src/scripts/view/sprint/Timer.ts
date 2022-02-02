import {createHTMLElement, createNSElement, setAttributes} from "../../utils/CommonFunctions";

class Timer {
  private readonly svg: SVGElement;
  private readonly circle: SVGElement;
  private readonly path: number;
  private readonly container: HTMLElement;
  private readonly timer: number;
  private readonly timeDisplay: HTMLElement;
  private readonly radius: number;
  constructor(time: number, radius: number, thickness: number) {
    this.radius = radius - thickness;
    this.path = Math.ceil(2 * 3.14 * this.radius);
    const svgAttributes = {
      width: `${radius * 2}`,
      height: `${radius * 2}`
    }
    const circleAttribute = {
      r: this.radius,
      cy: radius,
      cx: radius,
      'stroke-width': thickness,
      'stroke-dasharray': `${this.path}`,
      stroke: "lightgreen",
      fill: "none"
    }
    this.timer = time;
    this.container = createHTMLElement('div', 'timer');
    this.timeDisplay = createHTMLElement('h2', 'timer__display', `${time}`);
    this.timeDisplay.style.color = 'white';
    this.timeDisplay.style.position = 'absolute';
    this.timeDisplay.style.textAlign = 'center';
    this.timeDisplay.style.width = `${radius * 2}px`;
    this.timeDisplay.style.lineHeight = `${radius * 2}px`;
    this.timeDisplay.style.fontSize = `${radius / 2}px`;
    this.svg = createNSElement('svg');
    this.svg.style.transform = 'rotate(-90deg)';
    setAttributes(this.svg, svgAttributes);
    this.circle = createNSElement('circle');
    this.circle.style.transition = `all 1s linear`;
    setAttributes(this.circle, circleAttribute);
    this.svg.append(this.circle);
    this.container.append(this.timeDisplay, this.svg);
    this.startTimer();
  }

  startTimer() {
    let timer = this.timer;
    const oneSecondChunk = this.path / this.timer;
    this.circle.style.strokeDashoffset = String(0);
    const timerId = setInterval(() => {
      this.changeRingColor(timer / this.timer);
      if (timer > 0) {
        this.timeDisplay.innerHTML = String(timer);
        timer -= 1;
        this.circle.style.strokeDashoffset = String(oneSecondChunk * (this.timer - timer));
      } else {
        this.timeDisplay.innerHTML = String(0);
        clearInterval(timerId);
        /* TODO dispatch event*/
      }
    }, 1000);
  }

  changeRingColor(ratio: number) {
    if (ratio <= 0.25) {
      this.circle.setAttribute('stroke', 'red');
    }
    else if (ratio <= 0.5) {
      this.circle.setAttribute('stroke', 'yellow');
    }
  }

  render() {
    return this.container;
  }
}

export default Timer;
