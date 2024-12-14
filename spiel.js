const progressBar = document.getElementById("progressBar");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const historyElement = document.getElementById("history");
const endGameButton = document.getElementById("endGame");

let timer, timeLeft = 60;
let range = 5;
let score = 0;
let history = [];
let correctAnswer;

function startGame() {
    timer = setInterval(() => {
        timeLeft--;
        progressBar.style.width = `${(60 - timeLeft) * 100 / 60}%`;
        if (timeLeft <= 0) endGame();
    }, 1000);

    generateQuestion();
}

function generateQuestion() {
    const num1 = Math.floor(Math.random() * (range + 1));
    const num2 = Math.floor(Math.random() * (range + 1));
    const isAddition = Math.random() < 0.5;
    correctAnswer = isAddition ? num1 + num2 : num1 - num2;

    questionElement.textContent = `${num1} ${isAddition ? '+' : '-'} ${num2}`;
    generateAnswers();
}

function generateAnswers() {
    answersElement.innerHTML = '';
    const correctIndex = Math.floor(Math.random() * 6);
    for (let i = 0; i < 6; i++) {
        const answer = document.createElement("button");
        if (i === correctIndex) {
            answer.textContent = correctAnswer;
        } else {
            answer.textContent = Math.floor(Math.random() * (range * 2 + 1)) - range;
        }
        answer.addEventListener("click", () => checkAnswer(parseInt(answer.textContent)));
        answersElement.appendChild(answer);

        if (i === 2) answersElement.appendChild(document.createElement("br"));
    }
}

function checkAnswer(selectedAnswer) {
    const entry = `${questionElement.textContent} = ${selectedAnswer}`;
    if (selectedAnswer === correctAnswer) {
        score++;
        range++;
        history.push(`${entry} ✓`);
        generateQuestion();
    } else {
        history.push(`${entry} ✗`);
        endGame();
    }
    updateHistory();
}

function updateHistory() {
    historyElement.innerHTML = history.map(item => `<p>${item}</p>`).join('');
}

function endGame() {
    clearInterval(timer);
    questionElement.textContent = 'Spiel beendet!';
    answersElement.innerHTML = '';
    endGameButton.style.display = 'block';

    const users = JSON.parse(localStorage.getItem("users")) || {};
    const currentUser = localStorage.getItem("currentUser");
    const userScore = users[currentUser]?.score || 0;

    if (score > userScore) {
        users[currentUser].score = score;
        localStorage.setItem("users", JSON.stringify(users));
        historyElement.innerHTML += `<p>Neuer Highscore!</p>`;
    }

    endGameButton.addEventListener("click", () => {
        window.location.href = "hauptseite.html";
    });
}

startGame();
