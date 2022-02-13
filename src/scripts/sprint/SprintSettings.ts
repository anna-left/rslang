export enum SprintSettings {
  subLevels = 3,
  maxLevel = 4,
  baseScore = 10,
  great = 0.5,
  good = 0.25
}

export enum WordsSettings {
  endpoint = 'https://rslang-909.herokuapp.com/',
  groups = 6,
  pages = 30,
  pagesInView = 5,
}

export enum SprintIntroText {
  header = 'Спринт',
  description = 'Тренировка Спринт - повторение\nзаученных слов из вашего словаря',
  tooltip = 'Выбрать уровень:',
  startButton = 'Начать',
}

export enum SprintGameText {
  score = 'Счет:',
  right = 'Верно',
  wrong = 'Неверно',
  scoreStep = 'очков за слово',
}

export enum SprintResultText {
  learned = 'Изучено слов: ',
  toLearn = 'слов на изучении: ',
  percentage = 'изученных слов',
  again = 'Сыграть еще раз',
  workbook = 'Перейти в учебник',
  subheaderWrong = 'Ошибок',
  subheaderRight = 'Знаю',
}

export enum GreatResult {
  ratio = 0.5,
  color = 'lightgreen',
  congratulation = 'Отличный результат!'
}

export enum GoodResult {
  ratio = 0.25,
  color = 'yellow',
  congratulation = 'Хороший результат!'
}

export enum BadResult {
  ratio = 0,
  color = 'red',
  congratulation = 'Надо постараться!'
}

export const SprintColors = ['#ddd', '#fbcee3', '#F2D265', '#CFB276'];
