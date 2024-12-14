document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username && password) {
        const users = JSON.parse(localStorage.getItem("users")) || {};

        if (users[username]) {
            // Benutzer existiert, Passwort überprüfen
            if (users[username] === password) {
                alert("Erfolgreich angemeldet!");
                localStorage.setItem("currentUser", username);
                window.location.href = "main.html";
            } else {
                alert("Falsches Passwort!");
            }
        } else {
            // Neuer Benutzer erstellen
            users[username] = password;
            localStorage.setItem("users", JSON.stringify(users));
            alert("Benutzer erstellt und angemeldet!");
            localStorage.setItem("currentUser", username);
            window.location.href = "main.html";
        }
    } else {
        alert("Bitte Benutzername und Passwort eingeben!");
    }
});});
