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

    // Punktzahlen sortieren und die besten fünf Benutzer auswählen
    const sortedScores = Object.entries(scores)
        .sort(([, scoreA], [, scoreB]) => scoreB - scoreA) // Sortiere nach Punkten absteigend
        .slice(0, 5); // Begrenze auf die Top 5

    // Spieler und Punkte einfügen
    for (let i = 0; i < sortedScores.length; i++) {
        document.getElementById(`topUser${i + 1}`).innerText = sortedScores[i][0];
        document.getElementById(`topScore${i + 1}`).innerText = sortedScores[i][1];
    }
});

// Spiel starten
function startGame() {
    window.location.href = "game.html";
}
