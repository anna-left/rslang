/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { createElement } from '../util/Util';

import 'chart.js/auto';
import { Chart } from 'chart.js';
import './general.scss';

export class GeneralStatistics {
  private _root: HTMLElement;

  canvasBox: HTMLElement;

  constructor(root: HTMLElement) {
    this._root = root;
    this.canvasBox = createElement('div', ['statistics__general_canvas-box', 'canvas-box']);
  }

  render(data: number[]) {
    this.clear();
    const canvas = <HTMLCanvasElement>createElement('canvas', ['statistics__general_canvas', 'canvas-box__canvas']);
    console.log(canvas);
    const labels = [];
    for (let i = 0; i < data.length; i++) {
      labels.push(i);
    }
    const dataChart = {
      labels: labels,
      datasets: [
        {
          label: 'Количество слов за день',
          backgroundColor: '#ffffff',
          borderColor: '#000000',
          data: [0, ...data],
        },
      ],
    };
    const config = {
      type: 'line',
      data: dataChart,
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'left',
            align: 'center',
            labels: {
              usePointStyle: true,
            },
          },
        },
      },
    };
    // @ts-ignore
    const myChart = new Chart(canvas, config);
    this.canvasBox.append(canvas);
    this._root.append(this.canvasBox);
  }

  clear() {
    this._root.replaceChildren();
    this.canvasBox.replaceChildren();
  }
}
