import SprintView from './SprintView';
import SprintModel from './SprintModel';
import { ISprintWord } from '../types/types';
import { SprintSettings } from './SprintSettings';
import Dictionary from '../dictionary/Dictionary';
import API from '../api/API';

class Sprint {
  private readonly view: SprintView;

  private readonly model: SprintModel;

  private round: ISprintWord[];

  private currentWordIndex: number;

  private streak: number;

  private group: number;

  private page: number;

  private score: number;

  private level: number;

  private wrongWords: ISprintWord[];

  private rightWords: ISprintWord[];

  private dict: Dictionary;

  private longestStreak: number;

  constructor(api: API) {
    this.dict = null;
    this.group = null;
    this.page = null;
    this.view = new SprintView('sprint');
    this.model = new SprintModel(api);
  }

  async initializeGameState() {
    this.round = [];
    this.currentWordIndex = -1;
    this.streak = 0;
    this.score = 0;
    this.level = 1;
    this.wrongWords = [];
    this.rightWords = [];
    this.longestStreak = 0;
    this.view.clearTimer();
    await this.model.checkAuthorizationStatus();
  }

  addDictionary(dictionary: Dictionary) {
    this.dict = dictionary;
  }

  async init() {
    window.addEventListener('sprint-right', async () => {
      this.checkAnswer(true);
      await this.nextRound();
    });
    window.addEventListener('sprint-wrong', async () => {
      this.checkAnswer(false);
      await this.nextRound();
    });
    window.addEventListener('time-over', async () => {
      await this.onGameOver();
    });
    window.addEventListener('sprint-start', async () => {
      this.view.init();
      await this.initializeGameState();
      this.model.selectWords(this.group, this.page);
      this.round = await this.model.getWords();
      if (this.round && this.round.length > 0) {
        await this.nextRound();
        this.view.showGame();
        this.view.startTimer();
      }
    });
    window.addEventListener('sprint-again', async () => {
      this.view.showIntro();
      this.view.enableLevelSelection();
    });
    window.addEventListener('sprint-workbook', async () => {
      this.dict.preSelectLevelAndPage(this.group, this.page);
      await this.dict.start();
    });
    window.addEventListener('sprint-forward', async () => {
      this.view.showWords();
    });
    window.addEventListener('sprint-backward', async () => {
      this.view.showResults();
    });
    window.addEventListener('sprint-group-select', async (event: CustomEvent) => {
      this.group = event.detail.group;
      this.page = Math.floor(Math.random() * 30);
    });
    window.addEventListener('sprint-burger-start', () => {
      this.start();
    });
  }

  async nextRound() {
    if (await this.canAskMore()) {
      this.nextQuestion();
    } else {
      await this.onGameOver();
    }
  }

  checkAnswer(answer: boolean) {
    if (this.isCorrectAnswer(answer)) {
      this.updateScore();
      this.rightWords.push(this.round[this.currentWordIndex]);
      this.longestStreak += 1;
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

  async onGameOver() {
    this.view.onGameOver(this.rightWords, this.wrongWords);
    if (await this.model.checkAuthorizationStatus()) {
      // TODO send statistics
    }
  }

  async start(group = -1, page = -1) {
    if (group === -1) {
      this.group = 0;
      this.page = 0;
    } else {
      this.group = group;
      this.page = page;
      this.view.disableLevelSelection();
    }
    const root = document.querySelector('.main-box');
    root.innerHTML = '';
    root.append(this.view.render());
    window.dispatchEvent(new CustomEvent('hide-footer'));
    window.dispatchEvent(new CustomEvent('hide-nav'));
    this.view.showIntro();
  }
}

export default Sprint;
