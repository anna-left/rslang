import SprintView from "../../view/games/SprintView";
import SprintModel from "../../models/SprintModel";
import SprintSettings from "../../components/games/sprint/SprintSettings";

class Sprint {
  private readonly view: SprintView;
  private readonly model: SprintModel;
  private readonly root: Element;
  private words: any[];
  private currentWordIndex: number;
  private streak: number;
  private readonly group: number;
  private readonly page: number;
  constructor(group = 0, page = 0) {
    this.group = group;
    this.page = page;
    this.view = new SprintView();
    this.model = new SprintModel(group, page);
    this.root = document.querySelector('.main-box');
    this.root.append(this.view.render());
    this.words = [];
    this.currentWordIndex = -1;
    this.streak = 0;
  }

  async init() {
    this.view.init();
    this.words = await this.model.getWords();
    window.addEventListener('sprint-right', () => {
      if (this.streak < SprintSettings.subLevels) {
        this.view.onRightAnswer();
      }
      this.view.updateWords(this.nextQuestion());
    })
    window.addEventListener('sprint-wrong', () => {
      this.view.updateWords(this.nextQuestion());
    })
    window.addEventListener('time-over', () => {
      console.log('time-over');
    })
  }

  nextQuestion() {
    this.currentWordIndex += 1;
    return this.currentWordIndex < this.words.length ? this.words[this.currentWordIndex] : ['Words over', 'Words over'];
  }
}

export default Sprint;
