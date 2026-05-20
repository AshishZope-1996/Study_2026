async function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    showLoader('Signing you in...');
    await initPortalData();

    const users = getStoredUsers();
    const validUser = users.find(user => user.email === email && user.password === password);

    await sleep(400);

    if (validUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(validUser));
        hideLoader();
        window.location.href = 'dashboard.html';
    } else {
        hideLoader();
        alert('Invalid credentials or user not found.');
    }
}

function handleGoogleSignin(response) {
    showLoader('Checking Google account...');
    const userData = parseJwt(response.credential);
    const googleUsers = getStoredGoogleUsers();
    const existingGoogleUser = googleUsers.find(user => user.email === userData.email);

    if (existingGoogleUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(existingGoogleUser));
        hideLoader();
        window.location.href = 'dashboard.html';
    } else {
        hideLoader();
        alert('Google account not registered. Please signup first.');
        window.location.href = 'signup.html';
    }
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
}
