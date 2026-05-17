let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    window.location.href = "index.html";
}

const profileImage = document.getElementById("profileImage");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userType = document.getElementById("userType");
const userId = document.getElementById("userId");
const userLoginType = document.getElementById("userLoginType");
const addressSummary = document.getElementById("addressSummary");

userName.innerText = user.name || "Guest User";
userEmail.innerText = user.email || "No email provided";
userType.innerText = user.loginType === "google" ? "Google Account" : "Standard Account";
userId.innerText = user.id || "—";
userLoginType.innerText = user.loginType || "password";
addressSummary.innerText = getAddressText();

if (user.picture) {
    profileImage.src = user.picture;
} else {
    const initials = user.name ? user.name.trim()[0].toUpperCase() : "U";
    profileImage.src = `https://via.placeholder.com/120/007bff/ffffff?text=${initials}`;
}

function getAddressText() {
    const parts = [user.addressLine, user.city, user.state, user.postalCode, user.country].filter(Boolean);
    return parts.length ? parts.join(", ") : "No address saved";
}

function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logout Successful");
    window.location.href = "index.html";
}