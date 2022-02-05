import {createHTMLElement} from "../../../utils/CommonFunctions";
import Badges from "./Badges";
import SprintSettings, {SprintColors} from "./SprintSettings";

class SprintModalHeader {
  private readonly header: HTMLElement;
  private readonly badgesRow: Badges;
  private readonly scoreStep: HTMLElement;
  private readonly firstFloor: HTMLElement;
  private readonly basement: HTMLElement;
  private level: number;
  constructor() {
    this.level = 1;
    this.header = createHTMLElement('div', 'modal__header');
    this.firstFloor = createHTMLElement('div', 'header__floor header__roof');
    this.updateColor();
    this.basement = createHTMLElement('div', 'header__floor header__basement');
    this.updateAnimal();
    this.badgesRow = new Badges(SprintSettings.subLevels);
    this.scoreStep = createHTMLElement('div', 'header__score', `+${SprintSettings.baseScore} очков за слово`);
    this.firstFloor.append(this.badgesRow.render(), this.scoreStep);
    this.header.append(this.firstFloor, this.basement);
  }

  onRightAnswer() {
    this.badgesRow.activateNextBadge();
  }

  updateColor() {
    this.firstFloor.style.backgroundColor = SprintColors[this.level - 1];
  }

  updateScoreStep() {
    this.scoreStep.innerText = `+${SprintSettings.baseScore * this.level} очков за слово`;
  }

  updateAnimal() {
    this.basement.innerHTML = '';
    for (let i = 0; i < this.level; i += 1) {
      const img = createHTMLElement('img', 'header__animal');
      img.setAttribute('src', `./../../../assets/sprint/${i + 1}.png`);
      this.basement.append(img);
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
    this.updateAnimal();
  }

  render() {
    return this.header;
  }
}

export default SprintModalHeader;
