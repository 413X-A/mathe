// Funktion, um das Leaderboard zu aktualisieren
function updateLeaderboard() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const sortedPlayers = Object.entries(users)
        .map(([username, data]) => ({ username, score: data.score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5); // Top 5 Spieler

    const topPlayersList = document.getElementById('topPlayers');
    
    if (sortedPlayers.length > 0) {
        topPlayersList.innerHTML = sortedPlayers
            .map(player => `<li>${player.username}: ${player.score}</li>`)
            .join('');
    } else {
        topPlayersList.innerHTML = '<li>Keine Spieler gefunden.</li>';
    }
}

// Funktion, um das Spiel zu starten
function startGame() {
    // Spieler zur Spielseite weiterleiten
    window.location.href = 'spiel.html';
}

// Event-Listener hinzufügen, wenn die Seite geladen ist
document.addEventListener('DOMContentLoaded', () => {
    updateLeaderboard();  // Leaderboard aktualisieren bei der Seitenladung

    // Event-Listener für den "Spiel starten"-Button
    const startGameBtn = document.getElementById('startGameBtn');
    startGameBtn.addEventListener('click', startGame);

    // Event-Listener für den "Highscores anzeigen"-Button
    const viewLeaderboardBtn = document.getElementById('viewLeaderboardBtn');
    viewLeaderboardBtn.addEventListener('click', () => {
        const leaderboardElement = document.querySelector('.leaderboard');
        leaderboardElement.style.display = leaderboardElement.style.display === 'none' ? 'block' : 'none';
    });
});
