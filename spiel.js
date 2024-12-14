let score = 0;
let timer = 60;
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
    interval = setInterval(() => {
        timer--;
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
    while (answers.length < 3) {
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
            if (answer === correctAnswer) {
                score++;
                nextQuestion();
            } else {
                endGame();
            }
        };
        answersDiv.appendChild(button);
    });
}

function endGame() {
    clearInterval(interval);
    alert(`Spiel vorbei! Dein Score: ${score}`);
    saveScore();
    window.location.href = "main.html";
}

function saveScore() {
    const currentUser = localStorage.getItem("currentUser");
    const scores = JSON.parse(localStorage.getItem("scores")) || {};
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
