async function handleGoogleSignup(response) {
    showLoader('Signing up with Google...');
    await initPortalData();

    const userData = parseJwt(response.credential);
    const googleUsers = getStoredGoogleUsers();
    const existingGoogleUser = googleUsers.find(user => user.email === userData.email);

    const newGoogleUser = {
        name: userData.name || userData.email.split('@')[0],
        email: userData.email,
        password: '',
        joined: new Date().toLocaleDateString(),
        type: 'Google'
    };

    if (!existingGoogleUser) {
        googleUsers.push(newGoogleUser);
        saveStoredGoogleUsers(googleUsers);
    }

    localStorage.setItem('loggedInUser', JSON.stringify(existingGoogleUser || newGoogleUser));
    await sleep(600);
    hideLoader();
    window.location.href = 'dashboard.html';
}
