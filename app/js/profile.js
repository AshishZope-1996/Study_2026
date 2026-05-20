async function loadProfile() {
    showLoader('Loading profile details...');
    await initPortalData();

    const portalData = getPortalData();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!loggedInUser) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('profileName').textContent = loggedInUser.name || loggedInUser.email;
    document.getElementById('profileEmail').textContent = loggedInUser.email;
    document.getElementById('profileJoined').textContent = `Joined on ${loggedInUser.joined || 'Unknown'}`;
    document.getElementById('accountType').textContent = loggedInUser.type || 'Standard';
    document.getElementById('accountEmail').textContent = loggedInUser.email;
    document.getElementById('profileBio').textContent = 'Your study portal profile saves your certifications, projects and materials in one place.';

    document.getElementById('certCount').textContent = portalData.certifications.length;
    document.getElementById('projectCount').textContent = portalData.projects.length;
    document.getElementById('materialCount').textContent = portalData.studyMaterials.length;
    document.getElementById('techCount').textContent = portalData.technologies.length;

    const avatarImage = document.getElementById('avatarImage');
    avatarImage.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(loggedInUser.name || loggedInUser.email)}&background=38bdf8&color=0f172a&size=256`;

    hideLoader();
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

window.addEventListener('DOMContentLoaded', loadProfile);
