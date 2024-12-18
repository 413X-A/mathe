let score = 0;
let timer = 60;
let countdown = 3;
let interval;
const history = [];

document.addEventListener("DOMContentLoaded", () => {
    const timerElement = document.getElementById("timer");

    const countdownInterval = setInterval(() => {
        timerElement.innerText = `${countdown--}`;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            startGame();
        }
    }, 1000);

    // Anzeigen des Highscores des aktuellen Benutzers
    const highscoreDiv = document.getElementById("highscore");
    const currentUser = localStorage.getItem("currentUser");
    const scores = JSON.parse(localStorage.getItem("scores")) || {};
    const highscore = scores[currentUser] || 0;  // Highscore für den aktuellen Benutzer
    highscoreDiv.innerText = `Highscore: ${highscore}`;
});

function startGame() {
    const progressBarFill = document.getElementById("progress");

    interval = setInterval(() => {
        timer--;
        const progressPercentage = ((60 - timer) / 60) * 100;
        progressBarFill.style.width = `${progressPercentage}%`;
        if (timer <= 0) {
            endGame();
        }
    }, 1000);

    nextQuestion();
}

function nextQuestion() {
    const num1 = getRandomNumber(10, 20 + score * 2);
    const num2 = getRandomNumber(10, 20 + score * 2);
    const isAddition = Math.random() > 0.5;
    const correctAnswer = isAddition ? num1 + num2 : num1 - num2;

    const answers = [correctAnswer];
    while (answers.length < 6) {
        const wrongAnswer = getRandomNumber(correctAnswer - 10, correctAnswer + 10);
        if (!answers.includes(wrongAnswer)) answers.push(wrongAnswer);
    }

    shuffleArray(answers);

    document.getElementById("timer").innerText = `${num1} ${isAddition ? "+" : "-"} ${num2} = ?`;
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.onclick = () => {
            const isCorrect = answer === correctAnswer;
            history.push({ question: `${num1} ${isAddition ? "+" : "-"} ${num2}`, answer, isCorrect });
            updateHistory();
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
    historyDiv.innerHTML = "";
    history.forEach(entry => {
        const p = document.createElement("p");
        p.innerText = `${entry.isCorrect ? "✓" : "✖"} ${entry.question} = ${entry.answer}`;
        historyDiv.appendChild(p);
    });
}

function endGame() {
    clearInterval(interval);
    const finalScoreDiv = document.getElementById("final-score");
    finalScoreDiv.innerText = `Spiel vorbei! Dein Score: ${score}`;
    finalScoreDiv.style.display = "block";

    const answersHide = document.getElementById("answers");
    answersHide.style.display = "none";

    // Button für Spiel beenden anzeigen
    const endGameButton = document.getElementById("end-game-button");
    endGameButton.style.display = "block";

    // Highscore speichern, wenn der aktuelle Score höher ist
    saveHighscore();
    saveScore();
}

function saveScore() {
    const currentUser = localStorage.getItem("currentUser");
    const scores = JSON.parse(localStorage.getItem("scores")) || {};
    scores[currentUser] = Math.max(score, scores[currentUser] || 0);
    localStorage.setItem("scores", JSON.stringify(scores));
}

function saveHighscore() {
    const currentUser = localStorage.getItem("currentUser");
    const scores = JSON.parse(localStorage.getItem("scores")) || {};
    const currentHighscore = scores[currentUser] || 0;
    if (score > currentHighscore) {
        scores[currentUser] = score;
        localStorage.setItem("scores", JSON.stringify(scores));
    }
}

function endGameRedirect() {
    window.location.href = "hauptseite.html";
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
