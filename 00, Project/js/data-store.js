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

async function initPortalData() {
    if (!localStorage.getItem("portalData")) {
        const data = await fetchPortalDataFile();
        localStorage.setItem("portalData", JSON.stringify(data));
    }
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([]));
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
