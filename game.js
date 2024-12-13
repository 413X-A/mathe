let score = 0;
let timer = 60; // Gesamte Spielzeit in Sekunden
let countdown = 3; // Countdown vor Spielstart in Sekunden
let interval;

document.addEventListener("DOMContentLoaded", () => {
    const questionElement = document.getElementById("question");

    const countdownInterval = setInterval(() => {
        questionElement.innerText = `Spiel startet in ${countdown--} Sekunden...`;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            startGame();
        }
    }, 1000);
});

function startGame() {
    const progressBar = document.getElementById("progress-bar");
    let elapsed = 0;

    interval = setInterval(() => {
        elapsed++;
        timer--;

        // Fortschrittsleiste aktualisieren
        const progressPercentage = (elapsed / 60) * 100; // 60 Sekunden = gesamte Spielzeit
        progressBar.style.width = `${progressPercentage}%`;

        if (timer <= 0) {
            endGame();
        }
    }, 1000);

    nextQuestion();
}

function nextQuestion() {
    const baseRange = 10 + Math.floor(score / 5) * 5; // Dynamischer Bereich abhängig vom Score
    const num1 = getRandomNumber(baseRange - 10, baseRange + 10);
    const num2 = getRandomNumber(baseRange - 10, baseRange + 10);

    const isAddition = Math.random() > 0.5;
    const correctAnswer = isAddition ? num1 + num2 : num1 - num2;

    const answers = [correctAnswer];
    while (answers.length < 6) {
        const wrongAnswer = getRandomNumber(correctAnswer - 10, correctAnswer + 10);
        if (!answers.includes(wrongAnswer)) answers.push(wrongAnswer);
    }

    shuffleArray(answers);

    const questionElement = document.getElementById("question");
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    // Frage anzeigen
    questionElement.innerText = `${num1} ${isAddition ? "+" : "-"} ${num2} = ?`;

    // Antwortmöglichkeiten anzeigen
    for (let i = 0; i < answers.length; i++) {
        const button = document.createElement("button");
        button.innerText = answers[i];
        button.onclick = () => {
            const logElement = document.getElementById("game-log");
            const result = document.createElement("div");

            if (answers[i] === correctAnswer) {
                score++;
                result.innerText = `✓ ${num1} ${isAddition ? "+" : "-"} ${num2} = ${answers[i]}!`;
                nextQuestion();
            } else {
                result.innerText = `✖ ${num1} ${isAddition ? "+" : "-"} ${num2} = ${answers[i]}!`;
                endGame();
            }

            logElement.appendChild(result);
        };
        answersDiv.appendChild(button);

        // Nach drei Buttons einen Zeilenumbruch
        if ((i + 1) % 3 === 0) {
            const br = document.createElement("br");
            answersDiv.appendChild(br);
        }
    }
}

function endGame() {
    clearInterval(interval);

    const currentUser = localStorage.getItem("currentUser");
    const scores = JSON.parse(localStorage.getItem("scores")) || {};
    const previousScore = scores[currentUser] || 0;

    const endMessageElement = document.getElementById("end-message");
    const endButton = document.getElementById("end-button");

    if (score > previousScore) {
        scores[currentUser] = score;
        localStorage.setItem("scores", JSON.stringify(scores));
        endMessageElement.innerText = `Spiel vorbei!\nDein neuer Highscore: ${score}!`;
    } else {
        endMessageElement.innerText = `Spiel vorbei!\nDein Score: ${score}. Dein Highscore: ${previousScore}!`;
    }

    // "Spiel beenden"-Button anzeigen
    endButton.style.display = "block";
    endButton.onclick = () => {
        window.location.href = "main.html";
    };
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
