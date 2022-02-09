import {createHTMLElement} from "../../../utils/CommonFunctions";
import Badges from "./Badges";
import {SprintColors, SprintGameText, SprintSettings} from "./SprintSettings";
import Timer from "./Timer";
import './SprintGameDisplay.scss';

class SprintGameDisplay {
  private readonly header: HTMLElement;
  private readonly badgesRow: Badges;
  private readonly secondRow: HTMLElement;
  private readonly thirdRow: HTMLElement;
  private level: number;
  private readonly score: HTMLElement;
  private timer: Timer;
  private readonly centralBlock: HTMLElement;
  private readonly className: string;
  constructor(className: string) {
    this.className = `${className}-display`;
    this.header = createHTMLElement('div', `${this.className}`);
    this.score = createHTMLElement('div', `${this.className}__score`, `${SprintGameText.score} ${0}`);
    this.timer = new Timer(60, this.className);

    this.centralBlock = createHTMLElement('div', `${this.className}__central`);
    this.badgesRow = new Badges(SprintSettings.subLevels);
    const firstRow = this.badgesRow.render();
    this.secondRow = createHTMLElement('div', `${this.className}__score-info`, `+${SprintSettings.baseScore} ${SprintGameText.scoreStep}`);
    this.thirdRow = createHTMLElement('div', `${this.className}__level`);
    this.centralBlock.append(firstRow, this.secondRow, this.thirdRow)
    this.header.append(this.timer.render(), this.centralBlock, this.score);

    this.level = 1;
    this.updateColor();
    this.updateLevel();
  }

  onRightAnswer() {
    this.badgesRow.activateNextBadge();
  }

  updateColor() {
    this.secondRow.style.color = SprintColors[this.level - 1];
  }

  updateScore(score: number) {
    this.score.innerText = `${SprintGameText.score} ${score}`;
  }

  updateScoreStep() {
    this.secondRow.innerText = `+${SprintSettings.baseScore * this.level} очков за слово`;
  }

  updateLevel() {
    this.thirdRow.innerHTML = '';
    for (let i = 0; i < this.level; i += 1) {
      const img = createHTMLElement('img', `${this.className}__level-img`);
      img.setAttribute('src', `./../../../assets/sprint/${i + 1}.png`);
      this.thirdRow.append(img);
    }
  }

  increaseLevel() {
    this.level = this.level < SprintSettings.maxLevel ? this.level + 1 : SprintSettings.maxLevel;
  }

  resetLevel() {
    this.level = 1;
  }

  onLevelChange() {
    if (this.level === SprintSettings.maxLevel) {
      this.badgesRow.activateCup();
    } else {
      this.badgesRow.reset();
    }
    this.updateScoreStep();
    this.updateColor();
    this.updateLevel();
  }

  startTimer() {
    this.timer.startTimer();
  }

  render() {
    return this.header;
  }
}

export default SprintGameDisplay;
