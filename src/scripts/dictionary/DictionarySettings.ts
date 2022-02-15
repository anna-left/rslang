export enum DictionaryText {
  header = 'Учебник',
  subheader = 'Уровень сложности слов',
  wordHeader = 'Слова',
  gamesHeader = 'Игры',
  audioCall = 'Аудиовызов',
  audioCallDesc = 'Тренировка Аудиовызов - улучшает восприятие речи на слух',
  sprint = 'Спринт',
  sprintDesc = 'Тренировка Спринт - повторение заученных слов из вашего словаря',
  example = 'Пример',
  noWords = 'Нет слов для отображения!',
}

export const DictionaryDifficulty = {
  '0': {
    level: 'Easy',
    range: '1-600',
    label: 'A1'
  },
  '1': {
    level: 'Easy',
    range: '601-1200',
    label: 'A2'
  },
  '2': {
    level: 'Medium',
    range: '1201-1800',
    label: 'B1'
  },
  '3': {
    level: 'Medium',
    range: '1801-2400',
    label: 'B2'
  },
  '4': {
    level: 'Hard',
    range: '2401-3000',
    label: 'C1'
  },
  '5': {
    level: 'Hard',
    range: '3001-3600',
    label: 'C2'
  },
  '6': {
    level: 'User',
    range: 'words',
    label: 'H'
  },
}

