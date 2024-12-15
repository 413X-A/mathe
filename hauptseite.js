document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");
    const scores = JSON.parse(localStorage.getItem("scores")) || {};

    if (!currentUser) {
        window.location.href = "index.html";
        return;
    }

    // Benutzername und Highscore des aktuellen Benutzers anzeigen
    document.getElementById("currentUser").innerText = currentUser;
    const userHighscore = scores[currentUser] || 0;
    document.getElementById("userHighscore").innerText = userHighscore;

    // Top 5 Spieler anzeigen
    const sortedScores = Object.entries(scores)
        .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
        .slice(0, 5);

    const leaderboardList = document.getElementById("leaderboardList");
    leaderboardList.innerHTML = ""; // Leere die Liste, bevor neue Einträge hinzugefügt werden

    sortedScores.forEach(([user, score]) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="username">${user}</span> <span class="score">${score}</span>`;
        leaderboardList.appendChild(li);
    });
});

function startGame() {
    window.location.href = "spiel.html";
}
