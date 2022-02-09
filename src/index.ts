import './sass/style.scss';
import './scripts/app';
import Sprint from "./scripts/controllers/games/Sprint";

(async () => {
  const sprint = new Sprint();
  await sprint.init();
})();
