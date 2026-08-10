function toggleMenu() {
    const nav = document.querySelector('.page-nav');
    if (!nav) return;
    nav.classList.toggle('active');
}

function showLoader(message = 'Loading...') {
    const loader = document.getElementById('globalLoader');
    if (!loader) return;
    const label = loader.querySelector('p');
    if (label) label.textContent = message;
    loader.classList.add('active');
}

function hideLoader() {
    const loader = document.getElementById('globalLoader');
    if (!loader) return;
    loader.classList.remove('active');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function parseJwt(token) {
    const base64Url = token.split('.')[1] || '';
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
}
