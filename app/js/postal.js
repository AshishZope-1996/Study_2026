async function loadPostal() {
    showLoader('Loading address book...');
    await initPortalData();

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!loggedInUser) {
        window.location.href = 'index.html';
        return;
    }

    const postalAddress = JSON.parse(localStorage.getItem('postalAddress') || 'null');
    const postalSummary = document.getElementById('postalSummary');
    if (postalAddress) {
        postalSummary.innerHTML = `
            <h4>Saved address</h4>
            <p>${postalAddress.street}, ${postalAddress.city}, ${postalAddress.state} ${postalAddress.zip}, ${postalAddress.country}</p>
        `;
    } else {
        postalSummary.innerHTML = `
            <h4>Saved address</h4>
            <p>No address saved yet.</p>
        `;
    }

    hideLoader();
}

function savePostalAddress() {
    const street = document.getElementById('street').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const country = document.getElementById('country').value.trim();

    if (!street || !city || !state || !zip || !country) {
        alert('Please fill in all the address fields.');
        return;
    }

    const address = { street, city, state, zip, country };
    localStorage.setItem('postalAddress', JSON.stringify(address));

    const postalSummary = document.getElementById('postalSummary');
    postalSummary.innerHTML = `
        <h4>Saved address</h4>
        <p>${street}, ${city}, ${state} ${zip}, ${country}</p>
    `;

    alert('Postal address saved successfully.');
}

window.addEventListener('DOMContentLoaded', loadPostal);
