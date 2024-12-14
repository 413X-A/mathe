const mathQuestion = document.getElementById('mathQuestion');
const answerOptions = document.getElementById('answerOptions');
const taskHistory = document.getElementById('taskHistory');
const endGameBtn = document.getElementById('endGameBtn');
const progressBarFill = document.querySelector('.progress-bar .fill');

let score = 0;
let timeLeft = 60;
let range = 5;
let interval;
let currentPlayer;

function generateMathTask() {
    const num1 = Math.floor(Math.random() * range);
    const num2 = Math.floor(Math.random() * range);
    const isAddition = Math.random() > 0.5;
    const correctAnswer = isAddition ? num1 + num2 : num1 - num2;
    const answers = Array.from({ length: 6 }, (_, i) => i === 0 ? correctAnswer : correctAnswer + Math.floor(Math.random() * 10 - 5));

    mathQuestion.textContent = `${num1} ${isAddition ? '+' : '-'} ${num2} = ?`;
    answers.sort(() => Math.random() - 0.5);

    answerOptions.innerHTML = answers
        .map(answer => `<div class='answer'>${answer}</div>`)
        .join('');

    document.querySelectorAll('.answer').forEach(answer => {
        answer.addEventListener('click', () => checkAnswer(Number(answer.textContent), correctAnswer));
    });
}

function checkAnswer(selected, correct) {
    const taskLog = document.createElement('div');
    const symbol = document.createElement('span');
    symbol.textContent = selected === correct ? '✓' : '✗';
    symbol.style.color = 'gray';
    symbol.style.marginRight = '10px';
    
    taskLog.appendChild(symbol);
    taskLog.appendChild(document.createTextNode(mathQuestion.textContent));

    taskHistory.appendChild(taskLog);  // Task log wird hinzugefügt

    if (selected === correct) {
        score++;
        range++;
        generateMathTask();
    } else {
        endGame();
    }
}

function updateProgressBar() {
    progressBarFill.style.width = `${((60 - timeLeft) / 60) * 100}%`;
    if (timeLeft === 0) {
        endGame();
    }
    timeLeft--;
}

function startGame() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    currentPlayer = Object.keys(users)[0]; // Assuming the first user for now
    interval = setInterval(updateProgressBar, 1000);
    generateMathTask();
}

function endGame() {
    clearInterval(interval);
    answerOptions.innerHTML = '';
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[currentPlayer]) {
        const previousScore = users[currentPlayer].score;
        if (score > previousScore) {
            users[currentPlayer].score = score;
            localStorage.setItem('users', JSON.stringify(users));
        }

        const summary = document.createElement('div');
        summary.textContent = `Spiel beendet! Dein Score: ${score}. ${score > previousScore ? 'Neuer Highscore!' : ''}`;
        taskHistory.appendChild(summary);
    }

    endGameBtn.style.display = 'block';
}

endGameBtn.addEventListener('click', () => {
    window.location.href = 'hauptseite.html';
});

startGame();
