import { words } from './startRound';
import { GLOBAL_VALUES } from './constantsAndValues/globalValues';

function playSound(param: string) {
  // if (!curVolume) {
  //   return;
  // }
  const myPlayer = new Audio();

  // const myPlayer = document.querySelector('.audio') as HTMLAudioElement;
  // myPlayer.play();

  myPlayer.volume = 0.5;
  let curSoundSrc = '';
  switch (param) {
    case 'word':
      curSoundSrc = `https://react-learnwords-example.herokuapp.com/${words[GLOBAL_VALUES.currentQuestion].audio}`;
      break;
    case 'right':
      // myPlayer.src = './assets/sounds/sms.mp3';
      break;
    case 'wrong':
      // myPlayer.src = './assets/sounds/gong.mp3';
      break;
    case 'end of round':
      // myPlayer.src = './assets/sounds/fanfaryi.mp3';
      break;
    // case 4:
    //   myPlayer.src = './assets/sounds/wrong_answer.mp3';
    //   break;
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
