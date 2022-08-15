const container = document.getElementById("container");
const textBoxBtn = document.getElementById("textBoxBtn");
const textBox = document.getElementById("textBox");
const closeTextBox = document.getElementById("closeTextBox");
const voiceSelect = document.getElementById("voices");
const readTextBtn = document.getElementById("readTextBtn");
const textArea= document.getElementById("textArea");
let voices;
const data = [
    {
      image: './img/drink.jpeg',
      text: "I'm Thirsty"
    },
    {
      image: './img/food.jpeg',
      text: "I'm Hungry"
    },
    {
      image: './img/tired.jpeg',
      text: "I'm Tired"
    },
    {
      image: './img/hurt.jpeg',
      text: "I'm Hurt"
    },
    {
      image: './img/happy.jpeg',
      text: "I'm Happy"
    },
    {
      image: './img/angry.jpeg',
      text: "I'm Angry"
    },
    {
      image: './img/sad.jpeg',
      text: "I'm Sad"
    },
    {
      image: './img/scared.jpeg',
      text: "I'm Scared"
    },
    {
      image: './img/outside.jpeg',
      text: 'I Want To Go Outside'
    },
    {
      image: './img/home.jpeg',
      text: 'I Want To Go Home'
    },
    {
      image: './img/school.jpeg',
      text: 'I Want To Go To School'
    },
    {
      image: './img/grandma.jpeg',
      text: 'I Want To Go To Grandmas'
    }
];

createBoxes(data)
const boxes = document.querySelectorAll(".box");
const speech = new SpeechSynthesisUtterance();

textBoxBtn.addEventListener("click", () => {
    textBox.classList.toggle("textBox")
})

closeTextBox.addEventListener("click", () => {
    textBox.classList.remove("textBox");
})

function createBoxes(data) {
    data.forEach(item => {
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
        <img src="${item.image}"></img>
        <p>${item.text}</p>
        `;
        container.appendChild(box);
    })
}

boxes.forEach(box => {
    box.addEventListener("click", () => {
            const text = box.querySelector("p").innerText;
            speak(text);
            box.classList.add("shadow")
            setTimeout(() => box.classList.remove("shadow"),1000)
    })
})

function speak(text) {
    speech.text = text;
    speechSynthesis.speak(speech);
}

function getVoices() {
    voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.innerText = `${voice.name} ${voice.lang}`;
      voiceSelect.appendChild(option);
    });

}

function setVoice(e) {
    speech.voice = voices.find(voice => voice.name === e.target.value);
}

voiceSelect.addEventListener("change", setVoice)

speechSynthesis.addEventListener('voiceschanged', getVoices)

readTextBtn.addEventListener("click", (e) => {
    speak(textArea.value)
})









