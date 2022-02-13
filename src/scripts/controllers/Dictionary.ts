import DictionaryView from "../view/DictionaryView";
import DictionaryModel from "../models/DictionaryModel";

class Dictionary {
  private readonly model: DictionaryModel;
  private readonly view: DictionaryView;
  constructor() {
    this.model = new DictionaryModel();
    this.view = new DictionaryView('dictionary');
  }

  async init() {
    const data = await this.model.fetchWords(0, 0);
    this.view.init(data);
    this.view.displayActiveWord();
    const root = document.querySelector('.main-box');
    root.innerHTML = '';
    root.append(this.view.render());
    window.addEventListener('dict-level',  async (event: CustomEvent) => {
      this.view.deactivateCurrentLevel();
      this.view.activateDifficultyLevel(event.detail.id);
      const data = await this.model.fetchWords(event.detail.id, 0);
      this.view.updateData(data);
    })
    window.addEventListener('activate-word', (event: CustomEvent) => {
      this.view.deactivateCurrentWord();
      this.view.activateWord(event.detail.id);
      this.view.displayActiveWord();
    })
  }
}

export default Dictionary;
