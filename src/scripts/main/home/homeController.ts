/* TODO home controller */
import { HomeView } from './HomeVIew';

const rootEl: HTMLElement = document.querySelector('.main-box');
const root: HTMLElement = document.querySelector('main');

new HomeView(root, rootEl);
