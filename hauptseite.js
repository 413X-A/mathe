document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");
    const scores = JSON.parse(localStorage.getItem("scores")) || {};

    if (!currentUser) {
        window.location.href = "index.html";
    }

    document.getElementById("currentUser").innerText = currentUser;

    const topUser = Object.keys(scores).reduce((top, user) => 
        scores[user] > (scores[top] || 0) ? user : top, "");

    if (topUser) {
        document.getElementById("topUser").innerText = topUser;
        document.getElementById("topScore").innerText = scores[topUser];
    }
});

function startGame() {
    window.location.href = "spiel.html";
}
