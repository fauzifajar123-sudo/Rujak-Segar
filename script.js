// ========================================
// NAVIGATION
// ========================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay for elements with stagger class
            if (entry.target.classList.contains('animate-stagger')) {
                const siblings = entry.target.parentElement.querySelectorAll('.animate-stagger');
                const idx = Array.from(siblings).indexOf(entry.target);
                entry.target.style.animationDelay = `${idx * 0.15}s`;
            }

            // Add stagger delay for timeline items
            if (entry.target.classList.contains('animate-step')) {
                const siblings = document.querySelectorAll('.animate-step');
                const idx = Array.from(siblings).indexOf(entry.target);
                entry.target.style.animationDelay = `${idx * 0.2}s`;
            }

            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
    '.animate-fade-up, .animate-fade-in, .animate-slide-right, .animate-slide-left, .animate-stagger, .animate-step'
);

animatedElements.forEach(el => {
    observer.observe(el);
});

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// HERO ANIMATION ON LOAD
// ========================================

window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero .animate-fade-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 200 + (index * 150));
    });
});

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
