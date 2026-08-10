const portalDefaults = {
    certifications: [],
    projects: [],
    studyMaterials: [],
    technologies: [],
};

async function fetchPortalDataFile() {
    try {
        const response = await fetch("data/portal-data.json");
        if (!response.ok) {
            throw new Error("Failed to fetch portal data");
        }
        return await response.json();
    } catch (error) {
        return portalDefaults;
    }
}

async function fetchUserSeedFile() {
    try {
        const response = await fetch("data/users.json");
        if (!response.ok) {
            throw new Error("Failed to fetch user seed file");
        }
        return await response.json();
    } catch (error) {
        return [];
    }
}

async function initPortalData() {
    if (!localStorage.getItem("portalData")) {
        const data = await fetchPortalDataFile();
        localStorage.setItem("portalData", JSON.stringify(data));
    }
    if (!localStorage.getItem("users")) {
        const seedUsers = await fetchUserSeedFile();
        localStorage.setItem("users", JSON.stringify(seedUsers));
    }
    if (!localStorage.getItem("googleUsers")) {
        localStorage.setItem("googleUsers", JSON.stringify([]));
    }
}

function getPortalData() {
    return JSON.parse(localStorage.getItem("portalData")) || portalDefaults;
}

function savePortalData(data) {
    localStorage.setItem("portalData", JSON.stringify(data));
}

function getStoredUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveStoredUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function getStoredGoogleUsers() {
    return JSON.parse(localStorage.getItem("googleUsers")) || [];
}

function saveStoredGoogleUsers(users) {
    localStorage.setItem("googleUsers", JSON.stringify(users));
}

function getUserAssets(email) {
    if (!email) return { photo: null, certificationDocs: [] };
    const raw = localStorage.getItem(`userAssets:${email}`) || '{}';
    try {
        const assets = JSON.parse(raw);
        return {
            photo: assets.photo || null,
            certificationDocs: assets.certificationDocs || []
        };
    } catch {
        return { photo: null, certificationDocs: [] };
    }
}

function saveUserAssets(email, assets) {
    if (!email) return;
    const existing = getUserAssets(email);
    const merged = {
        ...existing,
        ...assets,
        certificationDocs: assets.certificationDocs || existing.certificationDocs || []
    };
    localStorage.setItem(`userAssets:${email}`, JSON.stringify(merged));
}

const cacheConfig = {
    markdownTtl: 1000 * 60 * 60 * 8,
};

function getCachedMarkdown(key) {
    const cache = JSON.parse(localStorage.getItem('markdownCache') || '{}');
    const entry = cache[key];
    if (!entry) return null;
    if (Date.now() - entry.timestamp > cacheConfig.markdownTtl) {
        delete cache[key];
        localStorage.setItem('markdownCache', JSON.stringify(cache));
        return null;
    }
    return entry.content;
}

function saveCachedMarkdown(key, content) {
    const cache = JSON.parse(localStorage.getItem('markdownCache') || '{}');
    cache[key] = {
        content,
        timestamp: Date.now()
    };
    localStorage.setItem('markdownCache', JSON.stringify(cache));
}

// Per-user persistent data (bookmarks, last opened note, preferences)
function getUserData(email) {
    if (!email) return {};
    try {
        const raw = localStorage.getItem(`userData:${email}`) || '{}';
        return JSON.parse(raw);
    } catch {
        return {};
    }
}

function saveUserData(email, data) {
    if (!email) return;
    const existing = getUserData(email);
    const merged = { ...existing, ...data };
    localStorage.setItem(`userData:${email}`, JSON.stringify(merged));
}
