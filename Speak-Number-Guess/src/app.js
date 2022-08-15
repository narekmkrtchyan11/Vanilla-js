import { initTextGame } from '/src/lib.js';

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const main = document.getElementById("main")
initTextGame(main);
