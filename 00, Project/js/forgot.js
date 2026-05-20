async function resetPassword() {
    const email = document.getElementById('email').value.trim();
    if (!email) {
        alert('Please enter your registered email.');
        return;
    }

    showLoader('Looking up your account...');
    await initPortalData();

    const users = getStoredUsers();
    const userIndex = users.findIndex(user => user.email === email);

    await sleep(400);

    if (userIndex === -1) {
        hideLoader();
        alert('No account found with that email.');
        return;
    }

    const newPassword = prompt('Enter your new password:');
    if (!newPassword || !newPassword.trim()) {
        hideLoader();
        alert('Password reset was canceled.');
        return;
    }

    users[userIndex].password = newPassword.trim();
    saveStoredUsers(users);

    hideLoader();
    alert('Password updated successfully. Please login with your new password.');
    window.location.href = 'index.html';
}
