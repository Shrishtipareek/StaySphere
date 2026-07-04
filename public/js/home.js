// ==========================================
// StaySphere Home JS
// ==========================================

// Navbar Background Change

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(255,255,255,.95)";
        navbar.style.backdropFilter = "blur(15px)";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

    } else {

        navbar.style.background = "transparent";
        navbar.style.boxShadow = "none";

    }

});

// ==========================================
// Typing Effect
// ==========================================

const heroTitle = document.querySelector(".hero-title span");

const words = [

    "StaySphere",
    "Dream Stay",
    "Luxury Living",
    "Perfect Vacation"

];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    if (!heroTitle) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        heroTitle.textContent = currentWord.substring(0, charIndex++);

    } else {

        heroTitle.textContent = currentWord.substring(0, charIndex--);

    }

    let speed = 120;

    if (!isDeleting && charIndex === currentWord.length + 1) {

        speed = 1500;
        isDeleting = true;

    }

    if (isDeleting && charIndex === 0) {

        isDeleting = false;
        wordIndex++;

        if (wordIndex >= words.length) {

            wordIndex = 0;

        }

    }

    setTimeout(typeEffect, speed);

}

typeEffect();

// ==========================================
// Counter Animation
// ==========================================

const counters = document.querySelectorAll(".stat-box h2");

const animateCounter = (counter) => {

    const target = counter.innerText;

    const number = parseInt(target);

    if (isNaN(number)) return;

    let current = 0;

    const increment = Math.ceil(number / 100);

    const update = () => {

        current += increment;

        if (current >= number) {

            counter.innerText = target;

        } else {

            counter.innerText = current + "+";

            requestAnimationFrame(update);

        }

    };

    update();

};

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            animateCounter(entry.target);

            observer.unobserve(entry.target);

        }

    });

});

counters.forEach(counter => {

    observer.observe(counter);

});

// ==========================================
// Scroll Reveal
// ==========================================

const revealElements = document.querySelectorAll(

    ".category-card,.why-card,.destination-card,.gallery-img,.testimonial-card,.founder-section"

);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: .15

});

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(60px)";
    element.style.transition = ".8s";

    revealObserver.observe(element);

});

// ==========================================
// Search Button Animation
// ==========================================

const searchBtn = document.querySelector(".search-btn");

if (searchBtn) {

    searchBtn.addEventListener("mouseenter", () => {

        searchBtn.style.transform = "scale(1.05)";

    });

    searchBtn.addEventListener("mouseleave", () => {

        searchBtn.style.transform = "scale(1)";

    });

}

// ==========================================
// Floating Hero
// ==========================================

const hero = document.querySelector(".hero-content");

window.addEventListener("scroll", () => {

    if (!hero) return;

    hero.style.transform = `translateY(${window.scrollY * 0.2}px)`;

});

// ==========================================
// Gallery Hover Zoom
// ==========================================

const gallery = document.querySelectorAll(".gallery-img");

gallery.forEach(img => {

    img.addEventListener("mousemove", () => {

        img.style.transform = "scale(1.08) rotate(.5deg)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "scale(1)";

    });

});

// ==========================================
// Back To Top Button
// ==========================================

const topBtn = document.createElement("button");

topBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

topBtn.classList.add("top-btn");

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.bottom = "30px";
topBtn.style.right = "30px";
topBtn.style.width = "55px";
topBtn.style.height = "55px";
topBtn.style.borderRadius = "50%";
topBtn.style.border = "none";
topBtn.style.background = "#ff4f81";
topBtn.style.color = "#fff";
topBtn.style.fontSize = "20px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "999";

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ==========================================
// Newsletter Validation
// ==========================================

const form = document.querySelector(".newsletter-form");

if (form) {

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const email = this.querySelector("input").value;

        if(email===""){

            alert("Please enter your email.");

            return;

        }

        alert("🎉 Thank you for subscribing!");

        this.reset();

    });

}

// ==========================================
// Footer Year
// ==========================================

const year = new Date().getFullYear();

const copyright = document.querySelector(".copyright");

if(copyright){

    copyright.innerHTML =
    `© ${year} StaySphere. Made with ❤️ by <strong>Shrishti Pareek</strong>`;

}