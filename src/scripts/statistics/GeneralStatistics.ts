/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { createElement } from '../util/Util';

import 'chart.js/auto';
import { Chart } from 'chart.js';
import './general.scss';
import { getLongTermStatistics } from '../audiocall/getStatistics';

export class GeneralStatistics {
  private _root: HTMLElement;

  canvasBox: HTMLElement;

  constructor(root: HTMLElement) {
    this._root = root;
    this.canvasBox = createElement('div', ['statistics__general_canvas-box', 'canvas-box']);
  }

  async render() {
    this.clear();
    const data = await getLongTermStatistics();
    const dates: string[] = [];
    const newWordsAmount: number[] = [];
    const knownWordsAmount: number[] = [];
    data.forEach((el) => {
      dates.push(el.date);
      newWordsAmount.push(el.newWordsCount);
      knownWordsAmount.push(el.knownWordsCount);
    });

    console.log({ dates, newWordsAmount, knownWordsAmount });
    console.log(typeof dates[0], typeof newWordsAmount[0], typeof knownWordsAmount[0]);
    const canvas = <HTMLCanvasElement>createElement('canvas', ['statistics__general_canvas', 'canvas-box__canvas']);
    console.log(canvas);
    const dataChart = {
      labels: dates,
      datasets: [
        {
          label: 'Новых слов за день',
          backgroundColor: '#43d26c',
          borderColor: '#43d26c',
          data: newWordsAmount,
        },
        {
          label: 'Изучено слов за день',
          backgroundColor: '#cd8eff',
          borderColor: '#cd8eff',
          data: knownWordsAmount,
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
