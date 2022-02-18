import { IViewManager } from '../../manager/IViewManager';
import { About } from '../about/AboutView';

import './home.scss';

export class HomeView {
  render(manager: IViewManager) {
    new About(manager);
  }
}
