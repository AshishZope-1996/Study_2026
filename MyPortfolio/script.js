document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        alert(
            "Thank you for contacting me. I will get back to you soon."
        );

        this.reset();

    });

const hamburger =
    document.getElementById("hamburger");

const navLinks =
    document.getElementById("navLinks");

hamburger.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});