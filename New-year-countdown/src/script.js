const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const nextYear = document.querySelector(".nextYear")

const currentYear = new Date().getFullYear();
nextYear.innerText = currentYear + 1;

const newYearTime = new Date(currentYear + 1,0,01,00,00,00);

function updateTime(newYearTime) {
    const current = new Date();
    const countedTime = newYearTime - current;

    const countedDays = Math.floor(countedTime / 1000 / 3600 / 24);
    const countedHours = Math.floor(countedTime / 1000 / 60 / 60) % 24;
    const countedMinutes = Math.floor(countedTime / 1000 / 60) % 60;
    const countedSeconds = Math.floor(countedTime / 1000) % 60;

    days.innerText = countedDays;
    hours.innerText = countedHours < 10 ? `0${countedHours}` : countedHours;
    minutes.innerText = countedMinutes < 10 ? `0${countedMinutes}` : countedMinutes;
    seconds.innerText = countedSeconds < 10 ? `0${countedSeconds}` : countedSeconds;
}

setInterval(() => updateTime(newYearTime),1000);


