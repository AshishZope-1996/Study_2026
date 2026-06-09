const contactForm = document.getElementById("contactForm");
const visitorBox = document.getElementById("visitorBox");

if (visitorBox) {
    const storedVisitors = Number(localStorage.getItem("portfolioVisitorCount") || 0);
    const nextCount = storedVisitors + 1;
    localStorage.setItem("portfolioVisitorCount", String(nextCount));
    visitorBox.querySelector("strong").textContent = nextCount;
}

if (contactForm) {
    const statusBox = document.getElementById("formStatus");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (statusBox) {
            statusBox.textContent = "Thank you for contacting me. I will get back to you soon.";
            statusBox.classList.add("show");
            setTimeout(() => statusBox.classList.remove("show"), 3200);
        }

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