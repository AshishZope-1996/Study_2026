function signup(){

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let existingUser = users.find(user => user.email === email);

    if(existingUser){
        alert("User already exists");
        return;
    }

    let user = {
        id: Date.now(),
        name: name,
        email: email,
        password: password
    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup Successful");

    window.location.href = "index.html";
}