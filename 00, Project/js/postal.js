let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    window.location.href = "index.html";
}

const addressLineInput = document.getElementById("addressLine");
const cityInput = document.getElementById("city");
const stateInput = document.getElementById("state");
const postalCodeInput = document.getElementById("postalCode");
const countryInput = document.getElementById("country");
const savedAddress = document.getElementById("savedAddress");

addressLineInput.value = user.addressLine || "";
cityInput.value = user.city || "";
stateInput.value = user.state || "";
postalCodeInput.value = user.postalCode || "";
countryInput.value = user.country || "";

updateAddressSummary();

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

function updateAddressSummary() {
    const parts = [user.addressLine, user.city, user.state, user.postalCode, user.country].filter(Boolean);
    savedAddress.innerText = parts.length ? parts.join(", ") : "No postal details saved yet.";
}

function updateStoredUser(currentUser) {
    ["users", "googleUsers"].forEach(key => {
        const storedUsers = JSON.parse(localStorage.getItem(key)) || [];
        const index = storedUsers.findIndex(item => item.email === currentUser.email);

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