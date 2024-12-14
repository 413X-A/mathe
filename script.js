document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");
    const scores = JSON.parse(localStorage.getItem("scores")) || {};

    // Wenn kein aktueller Benutzer gefunden wird, zurück zur Login-Seite
    if (!currentUser) {
        window.location.href = "index.html";
        return;
    }

    // Zeige den aktuellen Benutzer an
    document.getElementById("currentUser").innerText = currentUser;

    // Punktzahlen sortieren und die besten drei Benutzer auswählen
    const sortedScores = Object.entries(scores)
        .sort(([, scoreA], [, scoreB]) => scoreB - scoreA) // Sortiere nach Punkten absteigend
        .slice(0, 3); // Begrenze auf die Top 3

    // Platz 1
    if (sortedScores[0]) {
        document.getElementById("topUser1").innerText = sortedScores[0][0];
        document.getElementById("topScore1").innerText = sortedScores[0][1];
    }

    // Platz 2
    if (sortedScores[1]) {
        document.getElementById("topUser2").innerText = sortedScores[1][0];
        document.getElementById("topScore2").innerText = sortedScores[1][1];
    }

    // Platz 3
    if (sortedScores[2]) {
        document.getElementById("topUser3").innerText = sortedScores[2][0];
        document.getElementById("topScore3").innerText = sortedScores[2][1];
    }
});

// Spiel starten
function startGame() {
    window.location.href = "game.html";
}

// Benutzer wechseln
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
