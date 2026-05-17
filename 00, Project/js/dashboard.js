let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    window.location.href = "index.html";
}

const welcomeElement = document.getElementById("welcome");
const emailElement = document.getElementById("userEmail");
const typeElement = document.getElementById("userType");
const idElement = document.getElementById("userId");
const loginTypeElement = document.getElementById("userLoginType");
const profileImage = document.getElementById("profileImage");
const addressLineInput = document.getElementById("addressLine");
const cityInput = document.getElementById("city");
const stateInput = document.getElementById("state");
const postalCodeInput = document.getElementById("postalCode");
const countryInput = document.getElementById("country");
const savedAddress = document.getElementById("savedAddress");

welcomeElement.innerText = "Welcome " + (user.name || "Guest");
emailElement.innerText = user.email || "No email provided";
typeElement.innerText = user.loginType === "google" ? "Google Account" : "Standard Account";
idElement.innerText = user.id || "—";
loginTypeElement.innerText = user.loginType || "password";

if (user.picture) {
    profileImage.src = user.picture;
} else {
    const initials = user.name ? user.name.trim()[0].toUpperCase() : "U";
    profileImage.src = `https://via.placeholder.com/120/007bff/ffffff?text=${initials}`;
}

addressLineInput.value = user.addressLine || "";
cityInput.value = user.city || "";
stateInput.value = user.state || "";
postalCodeInput.value = user.postalCode || "";
countryInput.value = user.country || "";

updateAddressSummary();

function updateAddressSummary() {
    const addressParts = [
        user.addressLine,
        user.city,
        user.state,
        user.postalCode,
        user.country
    ].filter(Boolean);

    if (addressParts.length === 0) {
        savedAddress.innerText = "No postal details saved yet.";
    } else {
        savedAddress.innerText = addressParts.join(", ");
    }
}

function savePostal(event) {
    event.preventDefault();

    user.addressLine = addressLineInput.value.trim();
    user.city = cityInput.value.trim();
    user.state = stateInput.value.trim();
    user.postalCode = postalCodeInput.value.trim();
    user.country = countryInput.value.trim();

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    updateStoredUser(user);
    updateAddressSummary();

    alert("Postal address saved successfully.");
}

function updateStoredUser(currentUser) {
    const storedKeys = ["users", "googleUsers"];

    storedKeys.forEach(key => {
        let storedUsers = JSON.parse(localStorage.getItem(key)) || [];
        let index = storedUsers.findIndex(item => item.email === currentUser.email);
        if (index !== -1) {
            storedUsers[index] = {
                ...storedUsers[index],
                ...currentUser
            };
            localStorage.setItem(key, JSON.stringify(storedUsers));
        }
    });
}

function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logout Successful");
    window.location.href = "index.html";
}