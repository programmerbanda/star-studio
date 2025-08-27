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

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your booking request! We will contact you shortly.');
    bookingForm.reset();
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

// Initialize with header class and animations
window.dispatchEvent(new Event('scroll'));

// Enhanced version with progress animation
function initEnhancedCounter() {
    const statsContainer = document.querySelector('.stats-container');
    if (!statsContainer) return;

    // Create progress bars
    const statItems = statsContainer.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        const progressBar = document.createElement('div');
        progressBar.className = 'stat-progress';
        progressBar.innerHTML = '<div class="stat-progress-bar"></div>';
        item.appendChild(progressBar);
    });

    let animationStarted = false;

    function animateCounter() {
        if (animationStarted) return;
        animationStarted = true;

        const counters = document.querySelectorAll('.stat-number');
        const progressBars = document.querySelectorAll('.stat-progress-bar');

        counters.forEach((counter, index) => {
            const target = +counter.getAttribute('data-count');
            const duration = 3000;
            const startTime = performance.now();
            const startValue = 0;

            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                if (elapsedTime < duration) {
                    const progress = elapsedTime / duration;
                    const currentValue = Math.floor(progress * target);

                    // Update counter
                    counter.textContent = currentValue.toLocaleString();

                    // Update progress bar
                    if (progressBars[index]) {
                        progressBars[index].style.width = `${progress * 100}%`;
                    }

                    requestAnimationFrame(updateCounter);
                } else {
                    // Final values
                    counter.textContent = target.toLocaleString();
                    if (progressBars[index]) {
                        progressBars[index].style.width = '100%';
                    }

                    // Celebration effect
                    counter.classList.add('celebrate');
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // Use Intersection Observer
    const section = document.querySelector('.why-choose');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);
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
    initEnhancedCounter();
});

// Performance variables
let animationFrameId = null;
let lastRenderTime = 0;
const renderInterval = 1000 / 30; // 30 FPS

// Create optimized night sky
function createOptimizedNightSky() {
    const hero = document.querySelector('.hero');
    const sky = document.createElement('div');
    sky.className = 'star-night-sky';
    hero.appendChild(sky);

    // Create optimized stars
    createOptimizedStars(sky, 120); // Reduced from 250 to 120

    // Create shooting stars
    createOptimizedShootingStars(sky);

    // Add simple background effect
    createSimpleBackground(sky);

    // Use requestAnimationFrame for smooth animations
    startAnimationLoop(sky);
}

// Create optimized stars
function createOptimizedStars(sky, count = 120) {
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
        const duration = Math.random() * 6 + 3; // Reduced duration
        const delay = Math.random() * 8;

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

// Add single star (better performance than adding multiple)
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
    const duration = Math.random() * 6 + 3;
    const delay = Math.random() * 8;

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

// Create optimized shooting stars
function createOptimizedShootingStars(sky) {
    for (let i = 0; i < 2; i++) { // Reduced from 4 to 2
        createOptimizedShootingStar(sky);
    }

    // Create new shooting stars periodically with longer interval
    setInterval(() => {
        createOptimizedShootingStar(sky);
    }, Math.random() * 5000 + 3000); // Increased interval
}

function createOptimizedShootingStar(sky) {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';

    const startX = Math.random() * 100;
    const startY = Math.random() * 35;
    const length = Math.random() * 150 + 100; // Reduced length
    const angle = Math.random() * 30 - 15;
    const duration = Math.random() * 1.5 + 1;
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

// Create simple background (reduced complexity)
function createSimpleBackground(sky) {
    // Add nebula
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    sky.appendChild(nebula);

    // Add milky way
    const milkyWay = document.createElement('div');
    milkyWay.className = 'milky-way';
    sky.appendChild(milkyWay);
}

// Optimized animation loop
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

// Clean up function
function cleanupNightSky() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    const sky = document.querySelector('.star-night-sky');
    if (sky && sky.parentNode) {
        sky.parentNode.removeChild(sky);
    }
}

// Initialize the optimized night sky
document.addEventListener('DOMContentLoaded', function () {
    // Wait for the hero section to be fully loaded
    if (document.querySelector('.hero')) {
        createOptimizedNightSky();
    } else {
        setTimeout(createOptimizedNightSky, 500);
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