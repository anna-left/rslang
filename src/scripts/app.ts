import { FooterView } from './footer/FooterView';
import { setHome } from './home/home/homeController';

import { BurgerView } from './burger/BurgerView';
import { HeaderView } from './header/HeaderView';
import { MainView } from './main/MainView';

function init() {
  new HeaderView();
  new BurgerView();
  const main = new MainView();
  new FooterView();

  setHome(main.main, main.mainInnerContainer);
}

init();
