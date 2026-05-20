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
            <span>${Math.floor(Math.random() * 50) + 20}</span>
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
            <h4>Study notes</h4>
            <span>${portalData.studyMaterials.length}</span>
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

    hideLoader();
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

window.addEventListener('DOMContentLoaded', loadDashboard);
