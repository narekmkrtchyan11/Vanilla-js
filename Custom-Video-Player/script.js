const video = document.querySelector("video");
const playBtn = document.querySelector(".playBtn");
const resetBtn = document.querySelector(".resetBtn");
const span = document.querySelector("span");
const progressDiv = document.querySelector(".progressDiv");
const progress = document.querySelector(".progress");
let isPlaying = false;

function playVideo () {
    video.play();
    playBtn.querySelector(".fa-solid").classList.remove("fa-play");
    playBtn.querySelector(".fa-solid").classList.add("fa-pause");
    playBtn.querySelector(".fa-solid").style.color = "white";
    isPlaying = !isPlaying
    
    let time = setInterval (function () {
        if(Math.floor(video.currentTime) < 10) {
            span.innerText = `00:0${Math.floor(video.currentTime)}`;
        } else {
            span.innerText = `00:${Math.floor(video.currentTime)}`;
        }
    },1000)
    
    let timeProgress = setInterval(() => {
        progress.style.left = progress.offsetLeft + (progressDiv.clientWidth / video.duration)  + "px";
    },1030);

    resetBtn.addEventListener("click", function (event) {
        event.preventDefault();
        clearInterval(timeProgress)
        progress.style.left = "0px";
    })
    
    playBtn.addEventListener("click", function (e) {
        e.preventDefault();
        clearInterval(timeProgress)
    })
}

function pauseVideo () {
    video.pause();
    playBtn.querySelector(".fa-solid").classList.remove("fa-pause");
    playBtn.querySelector(".fa-solid").classList.add("fa-play");
    playBtn.querySelector(".fa-solid").style.color = "green";
    isPlaying = !isPlaying;
};

playBtn.addEventListener("click",function () {
    if(isPlaying){
        pauseVideo()
    } else {
        playVideo()
    }
})

resetBtn.addEventListener("click",() => {
    video.currentTime = 0;
    pauseVideo();
})

progressDiv.addEventListener("click",function (event) {
    let width = this.clientWidth;
    let clickX = event.offsetX;
    let duration = video.duration;
    video.currentTime = (clickX / width) * duration;
    progress.style.left = clickX + "px";
    console.log(parseInt(progress.style.left))
})

video.addEventListener("ended",() => {
    progress.style.left = "";
    video.currentTime = 0;
    playVideo();
})

