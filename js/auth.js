const BASE_URL = 'https://tu-api-url-publica.com';
const LOGIN_ENDPOINT = `${BASE_URL}/api/token/`;

function loginUser(username, password) {
    fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.access && data.refresh) {
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            window.location.href = 'dashboard.html'; // Redirigir al dashboard
        } else {
            document.getElementById('message').textContent = 'Credenciales inválidas.';
        }
    })
    .catch(err => console.error('Error al iniciar sesión', err));
}

function logoutUser() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = 'index.html'; // Redirigir al login
}

document.getElementById('login-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    loginUser(username, password);
});