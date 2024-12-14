function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Bitte füllen Sie alle Felder aus!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    
    if (users[username]) {
        // Benutzer existiert
        if (users[username] === password) {
            alert("Anmeldung erfolgreich!");
            localStorage.setItem("currentUser", username);
            window.location.href = "main.html";
        } else {
            alert("Falsches Passwort!");
        }
    } else {
        // Neuer Benutzer
        users[username] = password;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", username);
        alert("Neuer Benutzer angelegt!");
        window.location.href = "hauptseite.html";
    }
}
