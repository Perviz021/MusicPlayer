const ui = {
  musicPhoto: document.querySelector("#music-photo"),
  author: document.querySelector("#author"),
  name: document.querySelector("#name"),
  audio: document.querySelector("#audio"),
  startTime: document.querySelector("#startTime"),
  endTime: document.querySelector("#endTime"),
  btnPrev: document.querySelector("#btnPrev"),
  btnPlay: document.querySelector("#btnPlay"),
  btnNext: document.querySelector("#btnNext"),
  musicList: document.querySelector("#musicList"),
  progressBar: document.querySelector("#progressBar"),
  progressBarContent: document.querySelector("#progressBarContent"),
  volumeControl: document.querySelector("#volumeControl"),
  volumeLevel: document.querySelector("#volumeLevel"),
  volume: document.querySelector("#volume"),
};

const player = new MusicPlayer(musics, ui);

player.displayMusic();
player.createPlayList();
