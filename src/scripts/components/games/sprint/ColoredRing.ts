import {createHTMLElement, createNSElement, setAttributes} from "../../../utils/CommonFunctions";
import './ColoredRing.scss'

class ColoredRing {
  private readonly svg: SVGElement;
  readonly circle: SVGElement;
  readonly path: number;
  readonly container: HTMLElement;
  readonly radius: number;
  constructor(radiusConstantName: string, borderThicknessConstantName: string, className = 'colored-ring') {
    const radius = Number(getComputedStyle(document.documentElement).getPropertyValue(radiusConstantName));
    const thickness = Number(getComputedStyle(document.documentElement).getPropertyValue(borderThicknessConstantName));
    this.radius = radius - thickness;
    this.path = Math.ceil(2 * 3.14 * this.radius);
    const circleAttribute = {
      r: this.radius,
      cy: radius,
      cx: radius,
      'stroke-width': thickness,
      'stroke-dasharray': `${this.path}`,
      stroke: "lightgreen",
      fill: "none"
    }
    this.container = createHTMLElement('div', className);
    this.svg = createNSElement('svg');
    this.svg.classList.add(`${className}__circle`);
    this.circle = createNSElement('circle');
    setAttributes(this.circle, circleAttribute);
    const innerCircle = createNSElement('circle');
    setAttributes(innerCircle, circleAttribute);
    innerCircle.setAttribute('stroke', 'gray');
    innerCircle.style.position = 'absolute;';
    this.svg.append(innerCircle, this.circle);
    this.container.append(this.svg);
  }

  changeRingColor(ratio: number) {
    if (ratio <= 0.25) {
      this.circle.setAttribute('stroke', 'red');
    }
    else if (ratio <= 0.5) {
      this.circle.setAttribute('stroke', 'yellow');
    }
  }

  partialRing(percent: number) {
    this.circle.style.strokeDashoffset = String(this.path - this.path * percent / 100);
  }

  render() {
    return this.container;
  }
}

export default ColoredRing;