class WordAudiocall {
  id: string;

  word: string;

  group: number;

  page: number;

  image: string;

  audio: string;

  wordTranslate: string;

  answers: Array<string>;

  correctAnswer: Boolean;

  answerReceived: Boolean;

  constructor(
    id: string,
    word: string,
    group: number,
    page: number,
    image: string,
    audio: string,
    wordTranslate: string,
    answers: Array<string>,
    correctAnswer: Boolean,
    answerReceived: Boolean,
  ) {
    this.id = id;
    this.image = image;
    this.word = word;
    this.group = group;
    this.page = page;
    this.audio = audio;
    this.wordTranslate = wordTranslate;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.answerReceived = answerReceived;
  }
}

export { WordAudiocall };
