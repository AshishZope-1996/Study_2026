function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user =>
        user.email === email &&
        user.password === password
    );

    if(validUser){

        localStorage.setItem("loggedInUser", JSON.stringify(validUser));

        alert("Login Successful");

        window.location.href = "dashboard.html";

    }else{
        alert("Invalid Email or Password");
    }
}