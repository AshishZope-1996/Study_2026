async function loadProfile() {
    showLoader('Loading profile details...');
    await initPortalData();

    const portalData = getPortalData();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!loggedInUser) {
        window.location.href = 'index.html';
        return;
    }

    const userAssets = getUserAssets(loggedInUser.email);

    document.getElementById('profileName').textContent = loggedInUser.name || loggedInUser.email;
    document.getElementById('profileEmail').textContent = loggedInUser.email;
    document.getElementById('profileJoined').textContent = `Joined on ${loggedInUser.joined || 'Unknown'}`;
    document.getElementById('accountType').textContent = loggedInUser.type || 'Standard';
    document.getElementById('accountEmail').textContent = loggedInUser.email;
    document.getElementById('profileBio').textContent = 'Your study portal profile saves your certifications, projects and materials in one place.';

    document.getElementById('certCount').textContent = userAssets.certificationDocs.length;
    document.getElementById('projectCount').textContent = portalData.projects.length;
    document.getElementById('materialCount').textContent = portalData.studyMaterials.length;
    document.getElementById('techCount').textContent = portalData.technologies.length;

    const avatarImage = document.getElementById('avatarImage');
    avatarImage.src = userAssets.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(loggedInUser.name || loggedInUser.email)}&background=38bdf8&color=0f172a&size=256`;

    renderCertificationList(userAssets.certificationDocs);
    hideLoader();
}

function renderCertificationList(docs) {
    const list = document.getElementById('certList');
    if (!list) return;

    if (!docs.length) {
        list.innerHTML = '<p>No documents uploaded yet.</p>';
        return;
    }

    list.innerHTML = docs.map(doc => `
        <div class="file-item">
            <div>
                <strong>${doc.name}</strong>
                <p>${new Date(doc.uploadedAt).toLocaleDateString()}</p>
            </div>
            <a href="${doc.data}" download="${doc.name}">Download</a>
        </div>
    `).join('');
}

function uploadProfilePhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!loggedInUser) return;

    const reader = new FileReader();
    reader.onload = () => {
        saveUserAssets(loggedInUser.email, { photo: reader.result });
        document.getElementById('avatarImage').src = reader.result;
        alert('Profile photo uploaded successfully.');
    };
    reader.readAsDataURL(file);
}

function uploadCertificationDocs(event) {
    const file = event.target.files[0];
    if (!file) return;

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!loggedInUser) return;

    const reader = new FileReader();
    reader.onload = () => {
        const existing = getUserAssets(loggedInUser.email);
        const newDocs = existing.certificationDocs.concat([{
            name: file.name,
            type: file.type,
            uploadedAt: Date.now(),
            data: reader.result
        }]);
        saveUserAssets(loggedInUser.email, { certificationDocs: newDocs });
        renderCertificationList(newDocs);
        document.getElementById('certUpload').value = '';
        alert('Certification document uploaded successfully.');
    };
    reader.readAsDataURL(file);
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

window.addEventListener('DOMContentLoaded', loadProfile);
