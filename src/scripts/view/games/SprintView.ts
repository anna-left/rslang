import {createHTMLElement} from "../../utils/CommonFunctions";
import Timer from "../../components/games/sprint/Timer";
import SprintModal from "../../components/games/sprint/SprintModal";

class SprintView {
  private readonly scoreBlock: HTMLElement;
  private readonly timer: Timer;
  private score: number;
  private readonly page: HTMLElement;
  private readonly game: SprintModal;
  constructor() {
    this.score = 0;
    this.scoreBlock = createHTMLElement('div', 'sprint__score', `Score: ${this.score}`);
    this.timer = new Timer(6);
    this.timer.startTimer();
    this.game = new SprintModal();
    this.game.render().append(this.scoreBlock, this.timer.render())
    const info = createHTMLElement('div', 'sprint__info');
    const left = createHTMLElement('div', 'info__button info__left');
    const right = createHTMLElement('div', 'info__button info__right');
    info.append(left, right);
    this.page = createHTMLElement('section', 'sprint');
    this.page.append(this.game.render(), info);
  }

  addScore(n: number) {
    this.score += n;
  }

  render() {
    return this.page;
  }

  destroy() {
    this.page.remove();
  }

}

export default SprintView;
