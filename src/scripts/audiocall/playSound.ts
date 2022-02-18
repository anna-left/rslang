import { words } from './startRound';
import { GLOBAL_VALUES } from './constantsAndValues/globalValues';
import { API_PATH } from './constantsAndValues/constants';

function playSound(param: string, wordID = -1) {
  const myPlayer = new Audio();
  let audioFile = words[GLOBAL_VALUES.currentQuestion].audio;
  let curSoundSrc = '';
  switch (param) {
    case 'word':
      if (wordID > -1) {
        audioFile = words[wordID].audio;
      }
      curSoundSrc = `${API_PATH}${audioFile}`;
      break;
    case 'right':
      curSoundSrc = '../../assets/sounds/piu.mp3';
      break;
    case 'wrong':
      curSoundSrc = '../../assets/sounds/wrongAnswer.mp3';
      break;
    case 'end of round':
      curSoundSrc = '../../assets/sounds/roundEnd.mp3';
      break;
    default:
      break;
  }
  if (curSoundSrc) {
    myPlayer.src = curSoundSrc;
    myPlayer.play();
  }
}

export { playSound };
