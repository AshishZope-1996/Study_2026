let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    window.location.href = "index.html";
}

const welcomeElement = document.getElementById("welcome");
const emailElement = document.getElementById("userEmail");

welcomeElement.innerText = "Welcome " + (user.name || "Guest");
emailElement.innerText = user.email || "No email provided";

function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logout Successful");
    window.location.href = "index.html";
}