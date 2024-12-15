document.addEventListener("DOMContentLoaded", () => {
    // Hole den aktuellen Benutzer und die gespeicherten Scores aus localStorage
    const currentUser = localStorage.getItem("currentUser");
    const scores = JSON.parse(localStorage.getItem("scores")) || {};

    // Wenn kein Benutzer angemeldet ist, leite zur Login-Seite weiter
    if (!currentUser) {
        window.location.href = "index.html";
    }

    // Zeige den aktuellen Benutzernamen auf der Seite an
    document.getElementById("currentUser").innerText = currentUser;

    // Berechne den Highscore des aktuellen Benutzers
    const userHighscore = scores[currentUser] || 0;
    document.getElementById("userHighscore").innerText = userHighscore;

    // Berechne den Top-User mit dem höchsten Score
    const topUser = Object.keys(scores).reduce((top, user) => 
        scores[user] > (scores[top] || 0) ? user : top, "");

    // Zeige den Top-User und dessen Score an
    if (topUser) {
        document.getElementById("topUser").innerText = topUser;
        document.getElementById("topScore").innerText = scores[topUser];
    }
});

// Funktion zum Starten des Spiels
function startGame() {
    window.location.href = "spiel.html";
}
