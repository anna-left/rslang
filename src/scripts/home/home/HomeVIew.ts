import { About } from '../about/AboutView';

import './home.scss';

export class HomeView {
  render(mainBox: HTMLElement) {
    new About(mainBox);
  }
}
