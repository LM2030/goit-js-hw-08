import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const CURRENT_TIME = 'videoplayer-current-time';
const currentTime = localStorage.getItem(CURRENT_TIME)
  ? localStorage.getItem(CURRENT_TIME)
  : 0;

player.on('timeupdate', throttle(getCurrentTime, 1000));

player.setCurrentTime(currentTime);

function getCurrentTime(event) {
  localStorage.setItem(CURRENT_TIME, event.seconds);
}
