import SprintViewGame from "../../components/games/sprint/SprintViewGame";
import SprintViewIntro from "../../components/games/sprint/SprintViewIntro";
import Page from "./Page";
import SprintViewResults from "../../components/games/sprint/SprintViewResults";

class SprintView extends Page {
  private readonly intro: SprintViewIntro;
  private readonly game: SprintViewGame;
  private readonly results: SprintViewResults;
  constructor(className: string) {
    super(className);
    this.intro = new SprintViewIntro(`${className}-intro`);
    this.game = new SprintViewGame(`${className}-game`);
    this.results = new SprintViewResults(`${className}-results`)
  }

  init() {
    window.addEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      window.dispatchEvent(new CustomEvent('sprint-wrong'))
    }
    if (event.key === 'ArrowRight') {
      window.dispatchEvent(new CustomEvent('sprint-right'))
    }
  }

  updateScore(score: number) {
    this.game.updateScore(score);
  }

  updateWords(word: string, translation: string) {
    this.game.updateWords(word, translation);
  }

  onRightAnswer() {
    this.game.onRightAnswer();
    new Audio('../assets/audio/correct.mp3').play();
  }

  onWrongAnswer() {
    this.game.onWrongAnswer()
    new Audio('../assets/audio/error.mp3').play();
  }

  onLevelUp() {
    this.game.onLevelUp();
    new Audio('../assets/audio/correct.mp3').play();
  }

  onGameOver() {
    window.removeEventListener('keydown', this.handleKeyPress);
    //results.render()
  }

  showIntro() {
    this.page.innerHTML = '';
    this.page.append(this.intro.render());
  }

  showGame() {
    this.page.innerHTML = '';
    this.page.append(this.game.render());
  }

  showResults() {
    this.page.innerHTML = '';
    this.page.append(this.results.render());
  }

  startTimer() {
    this.game.startTimer();
  }

}

export default SprintView;
