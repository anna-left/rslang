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
  private group: number;
  private page: number;
  private score: number;
  private level: number;
  private wrongWords: ISprintWord[];
  private rightWords: ISprintWord[];
  constructor(group = -1, page = -1) {
    this.group = group;
    this.page = page;
    if (group === -1) {
      this.group = 0;
      this.page = 0;
    } else {
      this.view.disableLevelSelection();
    }
    this.root = document.querySelector('.main-box');
    this.view = new SprintView('sprint');
    this.model = new SprintModel();
    this.view.showIntro();
    this.root.innerHTML = '';
    this.root.append(this.view.render());
    this.round = [];
    this.currentWordIndex = -1;
    this.streak = 0;
    this.score = 0;
    this.level = 1;
    this.wrongWords = [];
    this.rightWords = [];

  }

  async init() {
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
      this.view.init();
      this.model.selectWords(this.group, this.page);
      this.round = await this.model.getWords();
      await this.nextRound();
      this.view.showGame();
      this.view.startTimer();
    })
    window.addEventListener('sprint-again', async () => {
      this.view.showIntro();
      this.view.enableLevelSelection();
    })
    window.addEventListener('sprint-workbook', async () => {
      // this.view.showIntro();
      // TODO proceed to workbook;
    })
    window.addEventListener('sprint-forward', async () => {
      this.view.showWords();
    })
    window.addEventListener('sprint-backward', async () => {
      this.view.showResults();
    })
    window.addEventListener('sprint-group-select', async (event: CustomEvent) => {
      this.group = event.detail.group;
      this.page = Math.floor(Math.random() * 30)
      console.log(this.group, this.page);
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
      this.rightWords.push(this.round[this.currentWordIndex]);
      if (this.canLevelUp()) {
        this.streak = 0;
        this.level = this.level === SprintSettings.maxLevel ? this.level : this.level + 1;
        this.view.onLevelUp();
      } else {
        this.streak += 1;
        this.view.onRightAnswer();
      }
    } else {
      this.wrongWords.push(this.round[this.currentWordIndex]);
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
    this.view.onGameOver(this.rightWords, this.wrongWords);
    // TODO send statistics
  }
}

export default Sprint;
