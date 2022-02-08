/* TODO home controller */
import { HomeView } from '../view/home/Home';
const rootEl: HTMLElement = document.querySelector('.main-box');
const root: HTMLElement = document.querySelector('main');

new HomeView(root, rootEl, authInputHandler, authHandler);

function authInputHandler(
  mode: string,
  email: HTMLElement,
  pass: HTMLElement,
  passRepeat?: HTMLElement,
  name?: HTMLElement,
) {}

function authHandler(
  mode: string,
  email: HTMLElement,
  pass: HTMLElement,
  passRepeat?: HTMLElement,
  name?: HTMLElement,
) {}
