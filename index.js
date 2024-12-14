document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const messageDiv = document.getElementById("message");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Verhindert das Neuladen der Seite

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            displayMessage("Bitte füllen Sie alle Felder aus!", "error");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || {};

        if (users[username]) {
            // Benutzer existiert
            if (users[username] === password) {
                localStorage.setItem("currentUser", username);
                displayMessage("Anmeldung erfolgreich!", "success");
                setTimeout(() => {
                    window.location.href = "hauptseite.html";
                }, 1000);
            } else {
                displayMessage("Falsches Passwort!", "error");
            }
        } else {
            // Neuer Benutzer
            users[username] = password;
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("currentUser", username);
            displayMessage("Neuer Benutzer angelegt!", "success");
            setTimeout(() => {
                window.location.href = "hauptseite.html";
            }, 1000);
        }
    });

    function displayMessage(message, type) {
        messageDiv.innerText = message;
        messageDiv.className = type === "success" ? "success" : "error";
    }
});
