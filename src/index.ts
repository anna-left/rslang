import './sass/style.scss';
import './scripts/app';
import Dictionary from "./scripts/controllers/Dictionary";

// (async () => {
//   const sprint = new Sprint();
//   await sprint.init();
// })();

(async () => {
  const dict = new Dictionary();
  await dict.init();
})();