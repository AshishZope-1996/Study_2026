/* ============================ */
/* NORMAL LOGIN */
/* ============================ */

function login() {

    let email =
        document.getElementById("email").value;

    let password =
        document.getElementById("password").value;

    let users =
        JSON.parse(localStorage.getItem("users"))
        || [];

    let validUser = users.find(user =>

        user.email === email &&
        user.password === password

    );

    if(validUser){

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(validUser)
        );

        alert("Login Successful");

        window.location.href =
            "dashboard.html";
    }
    else{

        alert("Invalid Credentials");

    }
}


/* ============================ */
/* GOOGLE SIGNIN */
/* ============================ */

function handleGoogleSignin(response){

    let userData =
        parseJwt(response.credential);

    console.log(userData);

    let googleUsers =
        JSON.parse(
            localStorage.getItem("googleUsers")
        ) || [];

    let existingGoogleUser =
        googleUsers.find(user =>

            user.email === userData.email

        );

    /* CHECK USER EXISTS */

    if(existingGoogleUser){

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(existingGoogleUser)
        );

        alert("Google Login Successful");

        window.location.href =
            "dashboard.html";

    }
    else{

        alert(
            "Google Account Not Registered. Please Signup First."
        );

        window.location.href =
            "signup.html";
    }
}


/* ============================ */
/* JWT PARSER */
/* ============================ */

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
                c.charCodeAt(0).toString(16))
                .slice(-2);

        }).join('')

    );

    return JSON.parse(jsonPayload);
}