import { FooterView } from './footer/FooterView';
import { setHome } from './home/home/homeController';

import { BurgerView } from './burger/BurgerView';
import { HeaderView } from './header/HeaderView';
import { MainView } from './main/MainView';

function init() {
  const burger = new BurgerView();
  const main = new MainView();
  new HeaderView(burger.burger, main.main, main.mainBox);
  main.render();
  new FooterView();
  burger.render(main.main, main.mainBox);
  setHome(main.main, main.mainBox);
}

init();
