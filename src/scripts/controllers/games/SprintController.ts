import SprintView from "../../view/games/SprintView";
import SprintModel from "../../models/SprintModel";

class SprintController {
  private readonly view: SprintView;
  private readonly model: SprintModel;
  private readonly root: Element;
  constructor() {
    this.view = new SprintView();
    this.model = new SprintModel();
    this.root = document.querySelector('.main-box');
    this.root.append(this.view.render());
  }

  init() {
    window.addEventListener('sprint-right', () => {
      console.log('right');
    })
    window.addEventListener('sprint-wrong', () => {
      console.log('wrong');
    })
    window.addEventListener('time-over', () => {
      console.log('time-over');
    })
  }
}

export default SprintController;
