const musicContainer = document.querySelector(".musicContainer");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progressContainer");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

let songs = ["Piano","Despacito","Vivir"];
let songIndex = 1;
loadSong (songs[songIndex]);

function loadSong (song) {
    title.innerText = song;
    audio.src = `Musics/${song}.mp3`;
    cover.src = `images/${song}.jpeg`
}

function playSong () {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");
    audio.pause()
};

function prevSong () {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong () {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

setInterval (() => {
    let duration = audio.duration;
    let currentTime = audio.currentTime
    let progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    if(duration === currentTime) nextSong();
},1000);


function setProgress (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    let duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
};

playBtn.addEventListener("click", () => {
    let isPlaying = musicContainer.classList.contains("play");
    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener("click", () => prevSong());
nextBtn.addEventListener("click", () => nextSong());
progressContainer.addEventListener("click",setProgress);
