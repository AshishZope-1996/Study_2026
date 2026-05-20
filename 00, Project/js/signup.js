async function signup() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!name || !email || !password) {
        alert('Please provide your name, email, and password.');
        return;
    }

    showLoader('Creating your account...');
    await initPortalData();

    const users = getStoredUsers();
    const googleUsers = getStoredGoogleUsers();
    const emailExists = users.some(user => user.email === email) || googleUsers.some(user => user.email === email);

    if (emailExists) {
        hideLoader();
        alert('This email is already registered. Please login or use a different email.');
        return;
    }

    const newUser = {
        name,
        email,
        password,
        joined: new Date().toLocaleDateString(),
        type: 'Standard'
    };

    users.push(newUser);
    saveStoredUsers(users);
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));

    await sleep(500);
    hideLoader();
    window.location.href = 'dashboard.html';
}
