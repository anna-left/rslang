import SprintView from "../../view/games/SprintView";
import SprintModel from "../../models/SprintModel";
import {ISprintWord} from "../../types/types";
import {SprintSettings} from "../../components/games/sprint/SprintSettings";

class Sprint {
  private readonly view: SprintView;
  private readonly model: SprintModel;
  private readonly root: Element;
  private round: ISprintWord[];
  private currentWordIndex: number;
  private streak: number;
  private readonly group: number;
  private readonly page: number;
  private score: number;
  private level: number;
  constructor(group = 0, page = 0) {
    this.group = group;
    this.page = page;
    this.root = document.querySelector('.main-box');
    this.view = new SprintView('sprint');
    this.model = new SprintModel(group, page);
    this.view.showIntro();
    this.root.append(this.view.render());
    this.round = [];
    this.currentWordIndex = -1;
    this.streak = 0;
    this.score = 0;
    this.level = 1;
  }

  async init() {
    this.view.init();
    this.round = await this.model.getWords();
    await this.nextRound();
    window.addEventListener('sprint-right', async () => {
      this.checkAnswer(true);
      await this.nextRound();
    })
    window.addEventListener('sprint-wrong', async () => {
      this.checkAnswer(false);
      await this.nextRound();
    })
    window.addEventListener('time-over', async () => {
      this.onGameOver();
    })
    window.addEventListener('sprint-start', async () => {
      this.view.showGame();
      this.view.startTimer();
    })
  }

  async nextRound() {
    if (await this.canAskMore()) {
      this.nextQuestion();
    } else {
      this.onGameOver();
    }
  }

  checkAnswer(answer: boolean) {
    if (this.isCorrectAnswer(answer)) {
      this.updateScore();
      if (this.canLevelUp()) {
        this.streak = 0;
        this.level = this.level === SprintSettings.maxLevel ? this.level : this.level + 1;
        this.view.onLevelUp();
      } else {
        this.streak += 1;
        this.view.onRightAnswer();
      }
    } else {
      this.streak = 0;
      this.level = 1;
      this.view.onWrongAnswer();
    }
  }

  calculateScore() {
    return this.level * SprintSettings.baseScore;
  }

  updateScore() {
    this.score += this.calculateScore();
    this.view.updateScore(this.score);
  }

  canLevelUp() {
    return this.streak === SprintSettings.subLevels;
  }

  async canAskMore() {
    this.currentWordIndex += 1;
    if (this.hasWordsInRound()) {
      return true;
    }
    if (this.canHaveAnotherRound()) {
      this.currentWordIndex = 0;
      this.round = await this.model.getMoreWords();
      return true;
    }
    return false;
  }

  nextQuestion() {
    const nextWord = this.round[this.currentWordIndex];
    this.view.updateWords(nextWord.word, nextWord.gameTranslate);
  }

  isCorrectAnswer(answer: boolean) {
    return this.round[this.currentWordIndex].answer === answer;
  }

  hasWordsInRound() {
    return this.currentWordIndex < this.round.length;
  }

  canHaveAnotherRound() {
    return this.model.hasMoreWords();
  }

  onGameOver() {
    this.view.onGameOver();
  }
}

export default Sprint;
