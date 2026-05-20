async function loadDashboard() {
    showLoader('Loading your dashboard...');
    await initPortalData();

    const portalData = getPortalData();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!loggedInUser) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('welcomeMessage').textContent = `Welcome back, ${loggedInUser.name || loggedInUser.email}`;

    const statsGrid = document.getElementById('statsGrid');
    statsGrid.innerHTML = `
        <div class="stat-card">
            <h4>Hours studied</h4>
            <span>${Math.floor(Math.random() * 60) + 30}</span>
        </div>
        <div class="stat-card">
            <h4>Certifications</h4>
            <span>${portalData.certifications.length}</span>
        </div>
        <div class="stat-card">
            <h4>Projects</h4>
            <span>${portalData.projects.length}</span>
        </div>
        <div class="stat-card">
            <h4>Study Notes</h4>
            <span>${portalData.studyNotes ? portalData.studyNotes.length : 0}</span>
        </div>
    `;

    const studyMaterialsList = document.getElementById('studyMaterialsList');
    studyMaterialsList.innerHTML = portalData.studyMaterials.slice(0, 4).map(item => `
        <div class="item-card">
            <h4>${item.title}</h4>
            <p>${item.tech} • ${item.type}</p>
            <a href="${item.link}" target="_blank">Open resource</a>
        </div>
    `).join('');

    const studyNotesSection = document.getElementById('studyNotesList');
    if (studyNotesSection) {
        studyNotesSection.innerHTML = (portalData.studyNotes || []).map(note => `
            <a class="note-card" href="study.html?note=${encodeURIComponent(note.id)}">
                <div>
                    <h4>${note.title}</h4>
                    <p>${note.description}</p>
                </div>
                <span>Open</span>
            </a>
        `).join('');
    }

    const certificationsList = document.getElementById('certificationsList');
    certificationsList.innerHTML = portalData.certifications.map(cert => `
        <div class="item-card">
            <h4>${cert.title}</h4>
            <p>${cert.issuer} • ${cert.year}</p>
            <p>${cert.description}</p>
        </div>
    `).join('');

    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = portalData.projects.map(project => `
        <div class="item-card">
            <h4>${project.title}</h4>
            <p>${project.tech}</p>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View project</a>
        </div>
    `).join('');

    const videoList = document.getElementById('videoList');
    if (videoList) {
        videoList.innerHTML = (portalData.studyVideos || []).map(video => `
            <a class="video-card" href="${video.url}" target="_blank">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div>
                    <h4>${video.title}</h4>
                    <p>${video.channel}</p>
                </div>
            </a>
        `).join('');
    }

    hideLoader();
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

window.addEventListener('DOMContentLoaded', loadDashboard);
