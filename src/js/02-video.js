const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
var throttle = require('lodash.throttle');

const savedTime = localStorage.getItem("videoplayer-current-time");
console.log(savedTime);

player.setCurrentTime(savedTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
const onPlay = function(data) {
    // data is an object containing properties specific to that event
};

player.on('timeupdate', throttle (function(timeObj) {
    localStorage.setItem("videoplayer-current-time", JSON.stringify(timeObj.seconds));
}, 1000));