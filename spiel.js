let score = 0;
let timeLeft = 60;
let range = 5;
let interval;

function generateMathTask() {
    const num1 = Math.floor(Math.random() * range);
    const num2 = Math.floor(Math.random() * range);
    const isAddition = Math.random() > 0.5;
    const correctAnswer = isAddition ? num1 + num2 : num1 - num2;
    const answers = Array.from({ length: 6 }, (_, i) => i === 0 ? correctAnswer : correctAnswer + Math.floor(Math.random() * 10 - 5));

    document.getElementById('mathQuestion').textContent = `${num1} ${isAddition ? '+' : '-'} ${num2} = ?`;
    answers.sort(() => Math.random() - 0.5);

    const answerOptions = document.getElementById('answerOptions');
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
    taskLog.appendChild(document.createTextNode(document.getElementById('mathQuestion').textContent));

    document.getElementById('taskHistory').appendChild(taskLog);  // Task log wird hinzugefügt

    if (selected === correct) {
        score++;
        range++;
        generateMathTask();
    } else {
        endGame();
    }
}

function updateProgressBar() {
    const progressBarFill = document.querySelector('.progress-bar .fill');
    progressBarFill.style.width = `${((60 - timeLeft) / 60) * 100}%`;
    if (timeLeft === 0) {
        endGame();
    }
    timeLeft--;
}

function startGame() {
    interval = setInterval(updateProgressBar, 1000);
    generateMathTask();
}

function endGame() {
    clearInterval(interval);
    document.getElementById('answerOptions').innerHTML = '';

    const summary = document.createElement('div');
    summary.textContent = `Spiel beendet! Dein Score: ${score}`;
    document.getElementById('taskHistory').appendChild(summary);

    document.getElementById('endGameBtn').style.display = 'block';
}

document.getElementById('endGameBtn').addEventListener('click', () => {
    window.location.href = 'hauptseite.html';
});

startGame();
