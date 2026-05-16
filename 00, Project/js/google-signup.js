function handleGoogleSignup(response) {

    let userData = parseJwt(response.credential);

    console.log(userData);

    let googleUsers = JSON.parse(
        localStorage.getItem("googleUsers")
    ) || [];

    let existingGoogleUser = googleUsers.find(user =>
        user.email === userData.email
    );

    if(existingGoogleUser){

        alert("Google User Already Registered");

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(existingGoogleUser)
        );

        window.location.href = "dashboard.html";

        return;
    }

    let googleUser = {

        id: userData.sub,

        name: userData.name,

        email: userData.email,

        picture: userData.picture,

        loginType: "google"
    };

    googleUsers.push(googleUser);

    localStorage.setItem(
        "googleUsers",
        JSON.stringify(googleUsers)
    );

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(googleUser)
    );

    alert("Google Signup Successful");

    window.location.href = "dashboard.html";
}


/* ========================= */
/* JWT TOKEN PARSER */
/* ========================= */

function parseJwt(token) {

    let base64Url = token.split('.')[1];

    let base64 = base64Url
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    let jsonPayload = decodeURIComponent(

        atob(base64)
        .split('')
        .map(function(c) {

            return '%' + ('00' +
                c.charCodeAt(0).toString(16)).slice(-2);

        }).join('')

    );

    return JSON.parse(jsonPayload);
}