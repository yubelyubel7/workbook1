let song;
let isPlaying = false;

function setup() {
  song = createAudio('../IMG/usong.mp3');
  song.elt.onended = function() {
    isPlaying = false;
    document.querySelector('.player-controls button:nth-child(1)').classList.remove('active');
    document.querySelector('.player-controls button:nth-child(2)').classList.remove('active');
  };
  
  song.hide();
  
  const playButton = document.querySelector('.player-controls button:nth-child(1)');
  const pauseButton = document.querySelector('.player-controls button:nth-child(2)');
  
  playButton.addEventListener('click', function() {
    if (!isPlaying) {
      song.play();
      isPlaying = true;
      
      playButton.classList.add('active');
      pauseButton.classList.remove('active');
      
      console.log("Play clicked, attempting to play audio");
    }
  });
  
  pauseButton.addEventListener('click', function() {
    if (isPlaying) {
      song.pause();
      isPlaying = false;
      
      playButton.classList.remove('active');
      pauseButton.classList.add('active');
    }
  });
}