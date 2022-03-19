class Word {
  id: string;

  group: 0;

  page: 0;

  word: string;

  image: string;

  audio: string;

  audioMeaning: string;

  audioExample: string;

  textMeaning: string;

  textExample: string;

  transcription: string;

  wordTranslate: string;

  textMeaningTranslate: string;

  textExampleTranslate: string;

  constructor(
    id: string,
    group: 0,
    page: 0,
    word: string,
    image: string,
    audio: string,
    audioMeaning: string,
    audioExample: string,
    textMeaning: string,
    textExample: string,
    transcription: string,
    wordTranslate: string,
    textMeaningTranslate: string,
    textExampleTranslate: string,
  ) {
    this.id = id;
    this.group = group;
    this.page = 0;
    this.word = word;
    this.image = image;
    this.audio = audio;
    this.audioMeaning = audioMeaning;
    this.audioExample = audioExample;
    this.textMeaning = textMeaning;
    this.textExample = textExample;
    this.transcription = transcription;
    this.wordTranslate = wordTranslate;
    this.textMeaningTranslate = textMeaningTranslate;
    this.textExampleTranslate = textExampleTranslate;
  }
}

export { Word };
