// hauptseite.js
const topPlayersList = document.getElementById('topPlayers');
const startGameBtn = document.getElementById('startGameBtn');

function updateLeaderboard() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const sortedPlayers = Object.entries(users)
        .map(([username, data]) => ({ username, score: data.score }))
        .sort((a, b) => b.score - a.score) // Sortiere absteigend nach dem Score
        .slice(0, 5); // Zeige die besten 5 Spieler

    topPlayersList.innerHTML = sortedPlayers
        .map(player => `<li>${player.username}: ${player.score}</li>`)
        .join('');
}

startGameBtn.addEventListener('click', () => {
    window.location.href = 'spiel.html';
});

updateLeaderboard();
