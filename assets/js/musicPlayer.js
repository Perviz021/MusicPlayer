class MusicPlayer {
  constructor(musicList, ui) {
    this.musicList = musicList;
    this.ui = ui;
    this.index = 0;
    this.played = false;
    this.volumed = true;
    this.currentVolume = 100;

    this.event();
  }

  displayMusic() {
    const music = this.musicList[this.index];
    this.ui.musicPhoto.src = `/assets/img/${music.img}`;
    this.ui.audio.src = `/assets/mp3/${music.mp3}`;
    this.ui.name.textContent = music.name;
    this.ui.author.textContent = music.author;
  }

  next() {
    if (this.index + 1 < this.musicList.length) this.index++;
    else this.index = 0;

    this.displayMusic();
    this.createPlayList();
    if (this.played) {
      this.play(true);
    }
  }

  previous() {
    if (this.index > 0) this.index--;
    else this.index = this.musicList.length - 1;

    this.displayMusic();
    this.createPlayList();
    if (this.played) {
      this.play(true);
    }
  }

  play(status = false) {
    if (status) {
      this.played = true;
    } else {
      this.played = !this.played;
    }

    if (this.played) {
      this.ui.audio.play();
      this.ui.btnPlay.querySelector("i").classList =
        "icon icon-lg fas fa-pause color-white";
    } else {
      this.ui.audio.pause();
      this.ui.btnPlay.querySelector("i").classList =
        "icon icon-lg fas fa-play color-white";
    }
  }

  calculateTime(seconder) {
    const minute = Math.floor(seconder / 60);
    const second = Math.floor(seconder % 60);

    return `${minute}:${second < 10 ? "0" + second : second}`;
  }

  createPlayList() {
    let html = ``;
    this.musicList.forEach((music, musicIndex) => {
      html += `<button class="btnChangeMusic btn btnHover flex py-5 ${
        this.index === musicIndex ? "color-orange" : "color-white"
      } align-center justify-between w-full" data-index="${musicIndex}">
                  <span>${music.author} - ${music.name}</span>
                </button>`;
    });

    this.ui.musicList.innerHTML = html;

    document.querySelectorAll(".btnChangeMusic").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        this.index = parseInt(index);
        this.displayMusic();
        this.createPlayList();
        this.play(true);
      });
    });
  }

  event() {
    const obj = this;
    this.ui.btnNext.addEventListener("click", () => this.next());
    this.ui.btnPrev.addEventListener("click", () => this.previous());
    this.ui.btnPlay.addEventListener("click", () => this.play());

    this.ui.audio.addEventListener("loadedmetadata", () => {
      const endTime = this.calculateTime(this.ui.audio.duration);
      const currentTime = this.calculateTime(this.ui.audio.currentTime);

      this.ui.startTime.textContent = currentTime;
      this.ui.endTime.textContent = endTime;
    });

    this.ui.audio.addEventListener("timeupdate", () => {
      const currentTime = this.calculateTime(this.ui.audio.currentTime);
      const endTime = this.calculateTime(
        this.ui.audio.duration - this.ui.audio.currentTime
      );

      this.ui.startTime.textContent = currentTime;
      this.ui.endTime.textContent = endTime;

      const total = (this.ui.audio.currentTime / this.ui.audio.duration) * 100;
      this.ui.progressBar.style.width = total + "%";

      if (this.ui.audio.currentTime === this.ui.audio.duration) {
        this.next();
      }
    });

    this.ui.volume.addEventListener("click", () => {
      this.volumed = !this.volumed;

      if (!this.volumed) {
        this.ui.audio.muted = true;
        this.ui.volume.classList = "icon icon fas fa-volume-mute";
        this.ui.volumeLevel.style.width = "0%";
      } else {
        this.ui.audio.muted = false;
        this.ui.volume.classList = "icon icon fas fa-volume-up";
        this.ui.volumeLevel.style.width = `${
          this.currentVolume * 100 > 100 ? 100 : this.currentVolume * 100
        }%`;
        console.log(this.currentVolume);
      }
    });

    this.ui.volumeControl.addEventListener("click", function (e) {
      const controlVolume = this.getBoundingClientRect();
      const progress = (e.clientX - controlVolume.left) / controlVolume.width;
      obj.ui.audio.volume = progress;
      obj.currentVolume = progress;
      obj.ui.volumeLevel.style.width = `${obj.currentVolume * 100}%`;
    });

    this.ui.progressBarContent.addEventListener("click", function (e) {
      const controlBar = this.getBoundingClientRect();
      const progress = (e.clientX - controlBar.left) / controlBar.width;
      obj.ui.progressBar.style.width = `${progress * 100}%`;

      obj.ui.startTime.textContent = obj.calculateTime(
        progress * obj.ui.audio.duration
      );
      obj.ui.audio.currentTime = progress * obj.ui.audio.duration;
    });

    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") this.play();
      else if (e.code === "ArrowRight") {
        this.next();
        this.play(true);
      } else if (e.code === "ArrowLeft") {
        this.previous();
        this.play(true);
      }
    });
  }
}
