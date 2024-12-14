function updateLeaderboard() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const sortedPlayers = Object.entries(users)
        .map(([username, data]) => ({ username, score: data.score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5); // Zeigt nur die Top 5 Spieler an

    const topPlayersList = document.getElementById('topPlayers');
    topPlayersList.innerHTML = sortedPlayers
        .map(player => `<li>${player.username}: ${player.score}</li>`)
        .join('');
}

document.getElementById('startGameBtn').addEventListener('click', () => {
    window.location.href = 'spiel.html';
});

updateLeaderboard();
