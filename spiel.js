<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spiel</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
        }
        .answers {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }
        .answers button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .answers button:hover {
            background-color: #0056b3;
        }
        .progress-bar {
            width: 100%;
            background-color: #ddd;
            height: 20px;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 20px;
        }
        .progress-bar-fill {
            height: 100%;
            background-color: #28a745;
            width: 0%; /* Start empty */
            transition: width 1s linear;
        }
        .history {
            margin-top: 20px;
            text-align: left;
        }
        .history p {
            margin: 5px 0;
        }
        .correct {
            color: green;
        }
        .incorrect {
            color: red;
        }
        .final-score {
            margin-top: 20px;
            font-size: 1.5em;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Spiel</h1>
        <div class="progress-bar">
            <div class="progress-bar-fill" id="progress"></div>
        </div>
        <h2 id="timer">Spiel startet in 5 Sekunden...</h2>
        <div class="answers" id="answers"></div>
        <div class="history" id="history"></div>
        <div class="final-score" id="final-score" style="display: none;"></div>
    </div>
    <script>
        let score = 0;
        let timer = 60;
        let countdown = 5;
        let interval;
        const history = [];

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
                    if (isCorrect) {
                        score++;
                        history.push({ question: `${num1} ${isAddition ? "+" : "-"} ${num2}`, answer, isCorrect });
                        updateHistory();
                        nextQuestion();
                    } else {
                        history.push({ question: `${num1} ${isAddition ? "+" : "-"} ${num2}`, answer, isCorrect });
                        updateHistory();
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
                p.className = entry.isCorrect ? "correct" : "incorrect";
                p.innerText = `${entry.question} = ${entry.answer} (${entry.isCorrect ? "Richtig" : "Falsch"})`;
                historyDiv.appendChild(p);
            });
        }

        function endGame() {
            clearInterval(interval);
            const finalScoreDiv = document.getElementById("final-score");
            finalScoreDiv.innerText = `Spiel vorbei! Dein Score: ${score}`;
            finalScoreDiv.style.display = "block";
            saveScore();
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
