// Funktion, um das Leaderboard zu aktualisieren
function updateLeaderboard() {
    // Daten aus dem localStorage abrufen
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    // Spieler nach Punktestand sortieren und die Top 5 auswählen
    const sortedPlayers = Object.entries(users)
        .map(([username, data]) => ({ username, score: data.score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    // HTML-Element für die Anzeige der Top-Spieler abrufen
    const topPlayersList = document.getElementById('topPlayers');
    
    // Liste der Top-Spieler generieren
    topPlayersList.innerHTML = sortedPlayers
        .map(player => `<li>${player.username}: ${player.score}</li>`)
        .join('');
}

// Funktion, um das Spiel zu starten
function startGame() {
    // Spieler zur Spielseite weiterleiten
    window.location.href = 'spiel.html';
}

// Event-Listener hinzufügen, wenn die Seite geladen ist
document.addEventListener('DOMContentLoaded', () => {
    // Leaderboard aktualisieren
    updateLeaderboard();

    // Event-Listener für den "Spiel starten"-Button
    const startGameBtn = document.getElementById('startGameBtn');
    startGameBtn.addEventListener('click', startGame);
});
