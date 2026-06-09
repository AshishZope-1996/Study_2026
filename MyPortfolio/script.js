const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Thank you for contacting me. I will get back to you soon.");
        this.reset();
    });
}

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

const year = document.getElementById("year");
if (year) {
    year.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));