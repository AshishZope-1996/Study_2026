function resetPassword(){

    let email = document.getElementById("email").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(user => user.email === email);

    if(user){

        let newPassword = prompt("Enter New Password");

        user.password = newPassword;

        localStorage.setItem("users", JSON.stringify(users));

        alert("Password Updated");

        window.location.href = "index.html";

    }else{
        alert("Email not found");
    }
}