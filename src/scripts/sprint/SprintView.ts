import SprintViewGame from './SprintViewGame';
import SprintViewIntro from './SprintViewIntro';
import Page from './Page';
import SprintViewResults from './SprintViewResults';
import SprintViewShowWords from './SprintViewShowWords';
import { ISprintWord } from '../types/types';

class SprintView extends Page {
  private readonly intro: SprintViewIntro;

  private readonly game: SprintViewGame;

  private readonly results: SprintViewResults;

  private readonly words: SprintViewShowWords;

  constructor(className: string) {
    super(className);
    this.intro = new SprintViewIntro(`${className}-intro`);
    this.game = new SprintViewGame(`${className}-game`);
    this.results = new SprintViewResults(`${className}-results`);
    this.words = new SprintViewShowWords(`${className}-results`);
  }

  init() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      window.dispatchEvent(new CustomEvent('sprint-wrong'));
    }
    if (event.key === 'ArrowRight') {
      window.dispatchEvent(new CustomEvent('sprint-right'));
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
    new Audio('./assets/audio/correct.mp3').play();
  }

  onWrongAnswer() {
    this.game.onWrongAnswer();
    new Audio('./assets/audio/error.mp3').play();
  }

  onLevelUp() {
    this.game.onLevelUp();
    new Audio('./assets/audio/correct.mp3').play();
  }

  onGameOver(learned: ISprintWord[], toLearn: ISprintWord[]) {
    window.removeEventListener('keydown', this.handleKeyPress);
    this.results.showResults(learned.length, toLearn.length);
    this.words.showResults(learned, toLearn);
    this.showResults();
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

  showWords() {
    this.page.innerHTML = '';
    this.page.append(this.words.render());
  }

  startTimer() {
    this.game.startTimer();
  }

  clearTimer() {
    this.game.clearTimer();
  }

  disableLevelSelection() {
    this.intro.disableLevelSelection();
  }

  enableLevelSelection() {
    this.intro.enableLevelSelection();
  }
}

export default SprintView;
