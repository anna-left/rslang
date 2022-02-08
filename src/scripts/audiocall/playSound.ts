import { words } from './startRound';
import { GLOBAL_VALUES } from './constantsAndValues/globalValues';

function playSound(param: string) {
  const myPlayer = new Audio();

  // myPlayer.volume = 0.5;
  let curSoundSrc = '';
  switch (param) {
    case 'word':
      curSoundSrc = `https://react-learnwords-example.herokuapp.com/${words[GLOBAL_VALUES.currentQuestion].audio}`;
      break;
    case 'right':
      curSoundSrc = '../../assets/sounds/piu.mp3';
      break;
    case 'wrong':
      curSoundSrc = '../../assets/sounds/wrongAnswer.mp3';
      break;
    case 'end of round':
      // curSoundSrc = '../../assets/sounds/.mp3';
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
