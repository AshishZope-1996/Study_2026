let user = JSON.parse(localStorage.getItem("loggedInUser"));

if(!user){
    window.location.href = "index.html";
}

document.getElementById("welcome").innerText =
    "Welcome " + user.name;

function logout(){

    localStorage.removeItem("loggedInUser");

    alert("Logout Successful");

    window.location.href = "index.html";
}