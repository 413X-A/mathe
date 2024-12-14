let score = 0;
let timer = 60;
let countdown = 5;
let interval;
const history = [];

document.addEventListener("DOMContentLoaded", () => {
    const timerElement = document.getElementById("timer");

    // Countdown vor dem Spielstart
    const countdownInterval = setInterval(() => {
        timerElement.innerText = `Spiel startet in ${countdown--} Sekunden...`;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            startGame();
        }
    }, 1000);
});

function startGame() {
    const progressBarFill = document.getElementById("progress");

    // Timer für das Spiel
    interval = setInterval(() => {
        timer--;
        const progressPercentage = ((60 - timer) / 60) * 100;
        progressBarFill.style.width = `${progressPercentage}%`;

        // Wenn die Zeit abgelaufen ist, beende das Spiel
        if (timer <= 0) {
            endGame();
        }
    }, 1000);

    nextQuestion();
}

function nextQuestion() {
    // Generiere eine neue Aufgabe
    const num1 = getRandomNumber(10, 20 + score * 2);
    const num2 = getRandomNumber(10, 20 + score * 2);
    const isAddition = Math.random() > 0.5;
    const correctAnswer = isAddition ? num1 + num2 : num1 - num2;

    // Erstelle mögliche Antworten (1 richtige, 5 falsche)
    const answers = [correctAnswer];
    while (answers.length < 6) {
        const wrongAnswer = getRandomNumber(correctAnswer - 10, correctAnswer + 10);
        if (!answers.includes(wrongAnswer)) answers.push(wrongAnswer);
    }

    shuffleArray(answers);

    // Zeige die Frage an
    document.getElementById("timer").innerText = `${num1} ${isAddition ? "+" : "-"} ${num2} = ?`;

    // Antwortmöglichkeiten anzeigen
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = ""; // Vorherige Antworten löschen

    answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.onclick = () => {
            const isCorrect = answer === correctAnswer;

            // Füge die Antwort zur Historie hinzu
            history.push({
                question: `${num1} ${isAddition ? "+" : "-"} ${num2}`,
                answer,
                isCorrect
            });
            updateHistory();

            // Bei korrekter Antwort geht es weiter, bei falscher ist das Spiel vorbei
            if (isCorrect) {
                score++;
                nextQuestion();
            } else {
                endGame();
            }
        };
        answersDiv.appendChild(button);
    });
}

function updateHistory() {
    const historyDiv = document.getElementById("history");
    historyDiv.innerHTML = ""; // Historie leeren

    // Historie aktualisieren
    history.forEach(entry => {
        const p = document.createElement("p");
        p.className = entry.isCorrect ? "correct" : "incorrect";
        p.innerText = `${entry.question} = ${entry.answer} (${entry.isCorrect ? "Richtig" : "Falsch"})`;
        historyDiv.appendChild(p);
    });
}

function endGame() {
    clearInterval(interval);

    // Zeige den finalen Score an
    const finalScoreDiv = document.getElementById("final-score");
    finalScoreDiv.innerText = `Spiel vorbei! Dein Score: ${score}`;
    finalScoreDiv.style.display = "block";

    // Speichere den Highscore
    saveScore();
}

function saveScore() {
    const currentUser = localStorage.getItem("currentUser");
    const scores = JSON.parse(localStorage.getItem("scores")) || {};

    // Aktualisiere den Highscore nur, wenn der neue Score höher ist
    scores[currentUser] = Math.max(score, scores[currentUser] || 0);
    localStorage.setItem("scores", JSON.stringify(scores));
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
