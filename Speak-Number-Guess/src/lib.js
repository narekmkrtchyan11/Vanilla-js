function initElemments(main) {
    const winGameContainer = document.createElement("div");
    winGameContainer.classList.add("winGameContainer")
    const playBtn = document.createElement("button");
    playBtn.classList.add("playBtn");
    playBtn.innerText = "Play";
    winGameContainer.appendChild(playBtn);

    const container = document.createElement("div");
    container.classList.add("container")
    const micImg = document.createElement("img");
    micImg.src = "./images/mic.png";
    container.appendChild(micImg);
    const title = document.createElement("h1");
    title.innerText = "Guess a Number Between 1 - 100";
    container.appendChild(title);
    const subTitle = document.createElement("h4");
    subTitle.innerText = "Speak the number into your microphone";
    container.appendChild(subTitle);
    const game = document.createElement("div");
    game.classList.add("game");
    const answerBlock = document.createElement("h3");
    answerBlock.innerText = "You said:";
    game.appendChild(answerBlock);

    container.appendChild(game);

    main.appendChild(winGameContainer);
    main.appendChild(container);

    return {
        winGameContainer: winGameContainer,
        playBtn: playBtn,
        container: container,
        micImg: micImg,
        title: title,
        subTitle: subTitle,
        game: game,
        answerBlock: answerBlock
    };
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}

export function initTextGame(rootElement) {
    const State = {
        root: rootElement,
        elements: initElemments(rootElement),
        recognation: null,
    }

    function initCallbacks({ playBtn }) {
        playBtn.addEventListener("click", play)
    }
    
    function startGame() {
        State.elements.winGameContainer.style.display = "none";
        State.elements.container.style.display = "flex";
    }

    function checkNumber(result, number) {
        if(number === result){
            winGame(number);
        } else if(result > number) {
            State.elements.controlText.innerText = "Go Lower";
        } else if(result < number) {
            State.elements.controlText.innerText = "Go Higher"
        }
    }

    function onSpeak(e, number) {
        if (!State.elements.answerText) {
            State.elements.answerText = document.createElement("span");
            State.elements.answerBlock.after(State.elements.answerText);
        }

        if (!State.elements.controlText) {
            State.elements.controlText = document.createElement("h2");
            State.elements.answerText.after(State.elements.controlText);
        }
        
        const result = e.results[0][0].transcript;
        State.elements.game.style.display = "flex";
        State.elements.answerText.innerText = result;
        
        if(!isNaN(result)){
            if(result <= 100 && result >= 1) {
                checkNumber(+result, number);
            }else {
                State.elements.controlText.innerText = "Number must be 1-100";
            }
        } else {
            State.elements.controlText.innerText = "It's not a number";
        }
    }

    function winGame(number) {
        const congratsMessage = document.createElement("h2");
        congratsMessage.innerText = "Congrats You have guessed number!";
        State.elements.winGameContainer.appendChild(congratsMessage);
        const latestNum = document.createElement("h3");
        latestNum.innerText = `It was ${number}`;
        State.elements.winGameContainer.appendChild(latestNum);

        State.elements.winGameContainer.style.display = "flex";
        State.elements.container.style.display = "none";
        State.elements.game.style.display = "none";
        State.recognation.stop();
    }

    function play () {
        State.recognation = new window.SpeechRecognition();

        let number;
        
        number = getRandomNumber();
        console.log(number)
    
        State.recognation.start();
        startGame();
        
        State.recognation.addEventListener('result', (e) => onSpeak(e, number));
        State.recognation.addEventListener('end', State.recognation.start)
    }

    initCallbacks(State.elements);
}
