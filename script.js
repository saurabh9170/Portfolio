// Dynamic Typing Effect
const phrases = ["Backend Developer", "Python Enthusiast", "REST API Architect", "Machine Learning Builder"];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typedTextElement = document.getElementById("typed-text");

function typeEffect() {
    const currentPhrase = phrases[phraseIdx];
    
    if (isDeleting) {
        typedTextElement.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typedTextElement.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentPhrase.length) {
        speed = 1800; // Pause at full phrase
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});

// Reveal Elements on Scroll
const revealElements = document.querySelectorAll(".reveal");
const skillBars = document.querySelectorAll(".skill-progress");

function handleScroll() {
    const triggerBottom = window.innerHeight * 0.88;

    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
            el.classList.add("active");
        }
    });

    // Animate Skill Progress Bars when visible
    skillBars.forEach(bar => {
        const top = bar.getBoundingClientRect().top;
        if (top < triggerBottom) {
            bar.style.width = bar.getAttribute("data-width");
        }
    });

    // Active Section Navigation Tracking
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);

// Follow Cursor Pointer Dot Effect
const cursorDot = document.getElementById("cursor-dot");
window.addEventListener("mousemove", (e) => {
    cursorDot.style.left = `${e.clientX - 4}px`;
    cursorDot.style.top = `${e.clientY - 4}px`;
});

// Modal Dialog Controls
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add("open");
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove("open");
    }
}

// Close Modal when clicking outside content
window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
        e.target.classList.remove("open");
    }
});

// Copy to Clipboard Utility
function copyToClipboard(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
        const icon = btnElement.querySelector('i');
        if (icon) {
            icon.className = 'fa-solid fa-check text-emerald-400';
            setTimeout(() => {
                icon.className = 'fa-regular fa-copy';
            }, 2000);
        }
    });
}

// Form Submission Handler
function handleFormSubmit(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Transmitting...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-check text-emerald-400"></i> Transmission Sent!';
        event.target.reset();
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 3000);
    }, 1200);
}
// Lightweight Interactive Canvas Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

// Particle Constructor
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5; // Fine star-like dots
        this.speedX = (Math.random() - 0.5) * 0.3; // Slow drift
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#06b6d4' : '#6366f1'; // Cyan or Indigo
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges smoothly
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Generate 70 floating particles
for (let i = 0; i < 70; i++) {
    particles.push(new Particle());
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

animate();