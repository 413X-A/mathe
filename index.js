document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[username]) {
        users[username] = { score: 0 };
        localStorage.setItem("users", JSON.stringify(users));
    }
    localStorage.setItem("currentUser", username);
    window.location.href = "hauptseite.html";
});
