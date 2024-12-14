window.onload = function () {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const topPlayers = Object.entries(users)
        .sort((a, b) => b[1].score - a[1].score)
        .slice(0, 5);

    const topPlayersList = document.getElementById("topPlayers");
    topPlayers.forEach(([username, data]) => {
        const li = document.createElement("li");
        li.textContent = `${username}: ${data.score}`;
        topPlayersList.appendChild(li);
    });

    document.getElementById("startGame").addEventListener("click", () => {
        window.location.href = "spiel.html";
    });
};
