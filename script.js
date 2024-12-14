// Benutzer-Daten im localStorage verwalten
const loginForm = document.getElementById('loginForm');
const startGameButton = document.getElementById('startGame');
const endGameButton = document.getElementById('endGame');
const progressBar = document.getElementById('progressBar');
const mathTask = document.getElementById('mathTask');
const answersContainer = document.getElementById('answers');
const taskHistory = document.getElementById('taskHistory');
const resultContainer = document.getElementById('result');

let timerInterval;
let currentScore = 0;
let currentRange = 5;

// Anmeldelogik
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (!users[username]) {
        users[username] = { password, highScore: 0 };
        localStorage.setItem('users', JSON.stringify(users));
    }

    switchPage('hauptseite');
});

// Spiel starten
startGameButton.addEventListener('click', () => {
    currentScore = 0;
    currentRange = 5;
    resetProgressBar();
    generateTask();
    switchPage('spielseite');
    startTimer();
});

// Spiel beenden
endGameButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    let users = JSON.parse(localStorage.getItem('users'));
    const user = users[username];

    if (currentScore > user.highScore) {
        user.highScore = currentScore;
    }
    localStorage.setItem('users', JSON.stringify(users));
    updateLeaderboard();
    switchPage('hauptseite');
});

// Seitenwechsel
function switchPage(pageId) {
    document.querySelectorAll('div').forEach(div => div.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

// Timer starten
function startTimer() {
    let timeLeft = 60;
    progressBar.style.width = '0%';

    timerInterval = setInterval(() => {
        timeLeft--;
        progressBar.style.width = `${(60 - timeLeft) / 60 * 100}%`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame('Zeit abgelaufen!');
        }
    }, 1000);
}

function resetProgressBar() {
    clearInterval(timerInterval);
    progressBar.style.width = '0%';
}

// Aufgabe generieren
function generateTask() {
    const num1 = Math.floor(Math.random() * currentRange);
    const num2 = Math.floor(Math.random() * currentRange);
    const operator = Math.random() > 0.5 ? '+' : '-';
    const correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;

    mathTask.textContent = `${num1} ${operator} ${num2}`;
    createAnswers(correctAnswer);
}

// Antwortmöglichkeiten erstellen
function createAnswers(correctAnswer) {
    answersContainer.innerHTML = '';
    const correctPosition = Math.floor(Math.random() * 6);

    for (let i = 0; i < 6; i++) {
        const button = document.createElement('button');
        button.textContent = i === correctPosition ? correctAnswer : Math.floor(Math.random() * (currentRange * 2)) - currentRange;
        button.addEventListener('click', () => checkAnswer(Number(button.textContent), correctAnswer));
        answersContainer.appendChild(button);

        if ((i + 1) % 3 === 0) {
            answersContainer.appendChild(document.createElement('br'));
        }
    }
}

// Antwort überprüfen
function checkAnswer(selectedAnswer, correctAnswer) {
    const task = document.createElement('li');
    task.textContent = `${mathTask.textContent} = ${selectedAnswer}`;
    task.style.color = selectedAnswer === correctAnswer ? 'green' : 'red';
    taskHistory.appendChild(task);

    if (selectedAnswer === correctAnswer) {
        currentScore++;
        currentRange++;
        generateTask();
    } else {
        endGame('Falsche Antwort!');
    }
}

// Spiel beenden
function endGame(message) {
    clearInterval(timerInterval);
    resultContainer.style.display = 'block';
    resultContainer.textContent = `${message} Dein Punktestand: ${currentScore}`;
    endGameButton.style.display = 'block';
    mathTask.textContent = '';
    answersContainer.innerHTML = '';
}

// Leaderboard aktualisieren
function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    let users = JSON.parse(localStorage.getItem('users')) || {};
    const sortedUsers = Object.entries(users).sort(([, a], [, b]) => b.highScore - a.highScore).slice(0, 5);

    sortedUsers.forEach(([username, data]) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${username}: ${data.highScore}`;
        leaderboardList.appendChild(listItem);
    });
}

// Initiales Leaderboard laden
updateLeaderboard();
