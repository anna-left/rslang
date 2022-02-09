/* TODO home controller */
import { HomeView } from './HomeVIew';

import { authBtnHandler, authInputHandler } from '../auth/authContorller';

const rootEl: HTMLElement = document.querySelector('.main-box');
const root: HTMLElement = document.querySelector('main');

new HomeView(root, rootEl, authInputHandler, authBtnHandler);
