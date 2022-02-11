import { FooterView } from './footer/FooterView';
import './controllers/main';

import './home/auth/authContorller';
import {setHome} from './home/home/homeController';

import { BurgerView } from './burger/BurgerView';
import { HeaderView } from './header/HeaderView';
import { MainView } from './main/MainView';

function init() {
  new HeaderView();
  new BurgerView();
  new MainView();
  new FooterView();

  setHome();
}

init();
