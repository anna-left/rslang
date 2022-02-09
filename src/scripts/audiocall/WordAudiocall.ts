class WordAudiocall {
  // id: string;
  word: string;

  image: string;

  audio: string;

  wordTranslate: string;

  answers: Array<string>;

  correctAnswer: Boolean;

  answerReceived: Boolean;

  constructor(
    // id: string,
    word: string,
    image: string,
    audio: string,
    wordTranslate: string,
    answers: Array<string>,
    correctAnswer: Boolean,
    answerReceived: Boolean,
  ) {
    // this.id = id;
    this.word = word;
    this.image = image;
    this.audio = audio;
    this.wordTranslate = wordTranslate;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.answerReceived = answerReceived;
  }
}

export { WordAudiocall };
