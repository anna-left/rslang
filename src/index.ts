import './sass/style.scss';
import './scripts/app';
import SprintView from "./scripts/view/games/Sprint";

const root = document.querySelector('.main-box');
const elem = new SprintView();
root.append(elem.render());
let counter = 0;

// document.addEventListener('click', () => {
//   if (counter < 30) {
//     counter += 1;
//     if (counter % 4 === 0) {
//       elem.onLevelUp();
//     } else {
//       elem.onRightAnswer();
//     }
//   }
// })
//
// document.addEventListener('dblclick', () => {
//   counter = 0;
//   elem.onWrongAnswer();
// })
