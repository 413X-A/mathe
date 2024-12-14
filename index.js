// index.js
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Bitte füllen Sie alle Felder aus!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (!users[username]) {
        users[username] = { password, score: 0 };
        localStorage.setItem('users', JSON.stringify(users));
    }

    window.location.href = 'hauptseite.html';
});
