let score = 0;
let timer = 60; // Gesamte Spielzeit
let countdown = 5;
let interval;

document.addEventListener("DOMContentLoaded", () => {
    const timerElement = document.getElementById("timer");

    const countdownInterval = setInterval(() => {
        timerElement.innerText = `Spiel startet in ${countdown--} Sekunden...`;
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
        const progressPercentage = (elapsed / 60) * 100; // 60 = gesamte Spielzeit
        progressBar.style.width = `${progressPercentage}%`;

        if (timer <= 0) {
            endGame();
        }
    }, 1000);

    nextQuestion();
}

function nextQuestion() {
    // Dynamischer Bereich für Zahlen, abhängig vom Score
    const baseRange = 10 + Math.floor(score / 5) * 5; // Der Basisbereich wird schrittweise erhöht
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

    document.getElementById("timer").innerText = `${num1} ${isAddition ? "+" : "-"} ${num2} = ?`;

    // Antwortmöglichkeiten in zwei Reihen anzeigen
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    for (let i = 0; i < answers.length; i++) {
        const button = document.createElement("button");
        button.innerText = answers[i];
        button.onclick = () => {
            if (answers[i] === correctAnswer) {
                score++;
                nextQuestion();
            } else {
                endGame();
            }
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

    if (score > previousScore) {
        scores[currentUser] = score;
        localStorage.setItem("scores", JSON.stringify(scores));
        alert(`Spiel vorbei! Dein neuer Highscore: ${score} Punkte!`);
    } else {
        alert(`Spiel vorbei! Dein Score: ${score}. Dein Highscore bleibt bei ${previousScore} Punkten.`);
    }

    window.location.href = "main.html";
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
