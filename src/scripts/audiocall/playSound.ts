import { words } from './startRound';
import { GLOBAL_VALUES } from './constantsAndValues/globalValues';

function playSound(param: string, wordID = -1) {
  const myPlayer = new Audio();

  // myPlayer.volume = 0.5;
  let curSoundSrc = '';
  switch (param) {
    case 'word':
      let audioFile = words[GLOBAL_VALUES.currentQuestion].audio;
      if (wordID > -1) {
        audioFile = words[wordID].audio;
      }
      curSoundSrc = `https://react-learnwords-example.herokuapp.com/${audioFile}`;
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
      // case 4:
      //   curSoundSrc = '../../assets/sounds/.mp3';
      break;
    default:
      break;
  }
  if (curSoundSrc) {
    myPlayer.src = curSoundSrc;
    myPlayer.play();

    // import sound from '../assets/sound.mp3';
    // const audio = new Audio(sound);
    // audio.play();
  }
}

export { playSound };
