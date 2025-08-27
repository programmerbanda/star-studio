// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.getElementById('nav');
const body = document.body;

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    body.classList.toggle('no-scroll');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        body.classList.remove('no-scroll');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');

    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }

    // Animation on scroll
    const fadeElems = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');

    fadeElems.forEach(elem => {
        const elemTop = elem.getBoundingClientRect().top;
        const elemBottom = elem.getBoundingClientRect().bottom;
        const isVisible = (elemTop < window.innerHeight - 100) && (elemBottom > 0);

        if (isVisible) {
            elem.classList.add('appear');
        }
    });
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get filter value
        const filterValue = button.getAttribute('data-filter');

        // Show/hide portfolio items based on filter
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Form Submission
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage'); // Get the message div

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous messages
    formMessage.textContent = '';
    formMessage.classList.remove('success', 'error');

    // Basic Form Validation
    const name = bookingForm.querySelector('#booking-name').value;
    const email = bookingForm.querySelector('#booking-email').value;
    const phone = bookingForm.querySelector('#booking-phone').value;
    const service = bookingForm.querySelector('#booking-service').value;
    const date = bookingForm.querySelector('#booking-date').value;
    const message = bookingForm.querySelector('#booking-message').value;
    const honeypot = bookingForm.querySelector('#website-url').value; // Get honeypot field value

    // Check honeypot field - if filled, it's likely a bot
    if (honeypot) {
        formMessage.textContent = 'Spam detected. Your request could not be submitted.';
        formMessage.classList.add('error');
        bookingForm.reset();
        return;
    }

    if (!name || !email || !phone || service === '' || !date || !message) {
        formMessage.textContent = 'Please fill in all required fields.';
        formMessage.classList.add('error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.classList.add('error');
        return;
    }

    // Phone number validation (basic, for 10 digits)
    const phoneRegex = /^\\d{10}$/;
    if (!phoneRegex.test(phone)) {
        formMessage.textContent = 'Please enter a valid 10-digit phone number.';
        formMessage.classList.add('error');
        return;
    }

    // Simulate form submission
    setTimeout(() => {
        formMessage.textContent = 'Thank you for your booking request! We will contact you shortly.';
        formMessage.classList.add('success');
    bookingForm.reset();
    }, 1000);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize with header class and animations on scroll
window.dispatchEvent(new Event('scroll'));

// Enhanced counter animation for stats section
function initEnhancedCounter(container) {
    const statsContainer = container; // Use the passed container
    if (!statsContainer) return; // Exit if stats container is not found

    // Create progress bars for each stat item
    const statItems = statsContainer.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        const progressBar = document.createElement('div');
        progressBar.className = 'stat-progress';
        progressBar.innerHTML = '<div class="stat-progress-bar"></div>';
        item.appendChild(progressBar);
    });

    function animateCounter() {
        const counters = statsContainer.querySelectorAll('.stat-number');
        const progressBars = statsContainer.querySelectorAll('.stat-progress-bar');

        counters.forEach((counter, index) => {
            const target = +counter.getAttribute('data-count');
            const duration = 3000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                if (elapsedTime < duration) {
                    const progress = elapsedTime / duration;
                    const currentValue = Math.floor(progress * target);

                    counter.textContent = currentValue.toLocaleString();

                    if (progressBars[index]) {
                        progressBars[index].style.width = `${progress * 100}%`;
                    }

                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                    if (progressBars[index]) {
                        progressBars[index].style.width = '100%';
                    }

                    counter.classList.add('celebrate');
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    const sectionToObserve = statsContainer.closest('section');
    if (!sectionToObserve) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsContainer.dataset.animationStarted) {
                statsContainer.dataset.animationStarted = 'true';
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(sectionToObserve);

    return animateCounter;
}

// Add CSS for progress bars
const progressStyle = document.createElement('style');
progressStyle.textContent = `
.stat-progress {
width: 80%;
height: 6px;
background: #f0f0f0;
border-radius: 3px;
margin: 15px auto 0;
overflow: hidden;
}

.stat-progress-bar {
height: 100%;
width: 0;
background: var(--accent);
border-radius: 3px;
transition: width 0.3s ease;
}

.stat-number.celebrate {
animation: celebrate 0.5s ease-in-out;
}

@keyframes celebrate {
0% { transform: scale(1); }
50% { transform: scale(1.2); color: #ff6b6b; }
100% { transform: scale(1); }
}
`;
document.head.appendChild(progressStyle);

// Initialize enhanced counter
document.addEventListener('DOMContentLoaded', function () {
    const animateCounterFunctions = [];

    document.querySelectorAll('.stats-container').forEach(container => {
        const animateFn = initEnhancedCounter(container);
        if (animateFn) {
            animateCounterFunctions.push({
                container: container,
                animate: animateFn
            });
        }
    });

    // Manually trigger animations for elements already in view on load
    animateCounterFunctions.forEach(item => {
        const container = item.container;
        const animateFn = item.animate;

        const sectionToObserve = container.closest('section');
        if (sectionToObserve) {
            const rect = sectionToObserve.getBoundingClientRect();
            const isVisible = (rect.top < window.innerHeight && rect.bottom >= 0);
            if (isVisible && !container.dataset.animationStarted) {
                container.dataset.animationStarted = 'true';
                animateFn();
            }
        }
    });
});

// Set minimum date for booking calendar to today's date
document.addEventListener('DOMContentLoaded', function() {
    const bookingDateInput = document.getElementById('booking-date');
    if (bookingDateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const minDate = `${year}-${month}-${day}`;
        bookingDateInput.setAttribute('min', minDate);
    }
});

// Performance variables
let animationFrameId = null;
let lastRenderTime = 0;
const renderInterval = 1000 / 30; // 30 FPS for optimized animations

// Function to create and manage the optimized night sky background
function createOptimizedNightSky() {
    const hero = document.querySelector('.hero');
    if (!hero) return; // Exit if hero section is not found

    const sky = document.createElement('div');
    sky.className = 'star-night-sky';
    hero.appendChild(sky);

    // Create optimized stars
    createOptimizedStars(sky, 80); // Reduced from 120 to 80

    // Create shooting stars
    createOptimizedShootingStars(sky);

    // Add simple background effect
    createSimpleBackground(sky);

    // Use requestAnimationFrame for smooth animations
    startAnimationLoop(sky);
}

// Create optimized stars
function createOptimizedStars(sky, count = 80) { // Reduced from 120 to 80
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random star size
        const sizeType = Math.random();
        if (sizeType < 0.7) {
            star.classList.add('small');
        } else if (sizeType < 0.9) {
            star.classList.add('medium');
        } else {
            star.classList.add('large');
        }

        // Random star color
        const colorType = Math.random();
        if (colorType < 0.7) {
            star.classList.add('color-1');
        } else if (colorType < 0.85) {
            star.classList.add('color-2');
        } else {
            star.classList.add('color-3');
        }

        // Random properties
        const duration = Math.random() * 4 + 2; // Reduced duration from 6+3 to 4+2
        const delay = Math.random() * 6; // Reduced delay from 8 to 6

        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.animationDelay = `${delay}s`;

        // Remove star after animation completes
        star.addEventListener('animationend', function () {
            if (sky.contains(star)) {
                sky.removeChild(star);
                // Add new star to maintain count
                setTimeout(() => addSingleStar(sky), 100);
            }
        });

        fragment.appendChild(star);
    }

    sky.appendChild(fragment);
}

// Adds a single star to the night sky, optimized for performance
function addSingleStar(sky) {
    const star = document.createElement('div');
    star.className = 'star';

    // Random star size
    const sizeType = Math.random();
    if (sizeType < 0.7) {
        star.classList.add('small');
    } else if (sizeType < 0.9) {
        star.classList.add('medium');
    } else {
        star.classList.add('large');
    }

    // Random star color
    const colorType = Math.random();
    if (colorType < 0.7) {
        star.classList.add('color-1');
    } else if (colorType < 0.85) {
        star.classList.add('color-2');
    } else {
        star.classList.add('color-3');
    }

    // Random properties
    const duration = Math.random() * 4 + 2; // Reduced duration
    const delay = Math.random() * 6; // Reduced delay

    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${duration}s`);
    star.style.animationDelay = `${delay}s`;

    // Remove star after animation completes
    star.addEventListener('animationend', function () {
        if (sky.contains(star)) {
            sky.removeChild(star);
            addSingleStar(sky);
        }
    });

    sky.appendChild(star);
}

// Manages the creation and periodic addition of shooting stars
function createOptimizedShootingStars(sky) {
    for (let i = 0; i < 1; i++) { // Create initial shooting star
        createOptimizedShootingStar(sky);
    }

    // Create new shooting stars periodically with longer interval
    let shootingStarInterval = setInterval(() => {
        createOptimizedShootingStar(sky);
    }, Math.random() * 6000 + 4000); // Increased interval from 5000+3000 to 6000+4000
}

function createOptimizedShootingStar(sky) {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';

    const startX = Math.random() * 100;
    const startY = Math.random() * 35;
    const length = Math.random() * 100 + 80; // Reduced length from 150+100 to 100+80
    const angle = Math.random() * 20 - 10; // Reduced angle from 30-15 to 20-10
    const duration = Math.random() * 1 + 0.8; // Reduced duration from 1.5+1 to 1+0.8
    const delay = Math.random() * 15;

    shootingStar.style.top = `${startY}%`;
    shootingStar.style.left = `${startX}%`;
    shootingStar.style.width = `${length}px`;
    shootingStar.style.setProperty('--shoot-duration', `${duration}s`);
    shootingStar.style.setProperty('--shoot-x', `${length * Math.cos(angle * Math.PI / 180)}px`);
    shootingStar.style.setProperty('--shoot-y', `${length * Math.sin(angle * Math.PI / 180)}px`);
    shootingStar.style.animationDelay = `${delay}s`;

    // Remove after animation
    shootingStar.addEventListener('animationend', function () {
        if (sky.contains(shootingStar)) {
            sky.removeChild(shootingStar);
        }
    });

    sky.appendChild(shootingStar);
}

// Creates simple background elements (nebula, milky way) for the night sky
function createSimpleBackground(sky) {
    // Add nebula effect
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    sky.appendChild(nebula);

    // Add milky way
    const milkyWay = document.createElement('div');
    milkyWay.className = 'milky-way';
    sky.appendChild(milkyWay);
}

// Starts the main animation loop using requestAnimationFrame for smooth animations
function startAnimationLoop(sky) {
    let lastTime = 0;

    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;

        if (deltaTime > renderInterval) {
            // Perform light animations here if needed
            lastTime = currentTime - (deltaTime % renderInterval);
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);
}

// Cleans up all night sky animations and elements to prevent memory leaks
function cleanupNightSky() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    // Clear shooting star interval
    if (shootingStarInterval) {
        clearInterval(shootingStarInterval);
        shootingStarInterval = null;
    }

    const sky = document.querySelector('.star-night-sky');
    if (sky && sky.parentNode) {
        sky.parentNode.removeChild(sky);
    }
}

// Initialize the optimized night sky
document.addEventListener('DOMContentLoaded', function () {
    // Wait for the hero section to be fully loaded
    const heroVideo = document.querySelector('.hero-video');
    const heroSpinner = document.querySelector('.hero-spinner');

    if (heroVideo && heroSpinner) {
        heroVideo.addEventListener('loadeddata', () => {
            heroSpinner.style.display = 'none'; // Hide spinner once video loads
            heroVideo.style.opacity = '1'; // Show video
        });
        // In case video is cached and loaded instantly
        if (heroVideo.readyState >= 3) { // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
            heroSpinner.style.display = 'none';
            heroVideo.style.opacity = '1';
        }
    } else {
        // Fallback if video or spinner not found, ensure animations still run
    if (document.querySelector('.hero')) {
        createOptimizedNightSky();
    } else {
        setTimeout(createOptimizedNightSky, 500);
        }
    }
});

// Handle resize events with debounce
let resizeTimeout;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        cleanupNightSky();
        createOptimizedNightSky();
    }, 250);
});

// Handle visibility change to pause animations when tab is not visible
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    } else {
        if (!animationFrameId) {
            const sky = document.querySelector('.star-night-sky');
            if (sky) {
                startAnimationLoop(sky);
            }
        }
    }
});