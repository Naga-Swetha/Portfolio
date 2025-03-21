// Mobile menu functionality
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Enhanced bubble animation
function createBubble() {
    const bubbleAnimation = document.querySelector('.bubble-animation');
    const bubble = document.createElement('div');
    
    const size = Math.random() * 60 + 20; // Even smaller bubbles
    const startPosition = Math.random() * 100;
    const duration = Math.random() * 25 + 25; // Slower movement
    const delay = Math.random() * 4;
    
    bubble.className = 'bubble';
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${startPosition}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `-${delay}s`;
    bubble.style.opacity = Math.random() * 0.08 + 0.02; // More transparent bubbles
    
    bubbleAnimation.appendChild(bubble);
    
    setTimeout(() => {
        bubble.remove();
    }, duration * 1000);
}

// Create fewer bubbles with longer intervals
function startBubbles() {
    // Initial bubbles
    for(let i = 0; i < 5; i++) {
        setTimeout(() => {
            createBubble();
        }, i * 500);
    }
    
    // Continuous bubble creation with longer intervals
    setInterval(createBubble, 4000); // One bubble every 4 seconds
}

startBubbles();

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('opacity-0');
        scrollToTopBtn.classList.add('opacity-100');
    } else {
        scrollToTopBtn.classList.remove('opacity-100');
        scrollToTopBtn.classList.add('opacity-0');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80; // Height of fixed navbar
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Add active section highlighting in navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-indigo-400');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-indigo-400');
        }
    });
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', () => {
    const cube = document.querySelector('.cube');
    let startX, startY, isMouseDown = false;
    let currentRotation = { x: 0, y: 0 };

    cube.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX - currentRotation.y;
        startY = e.pageY - currentRotation.x;
        cube.style.animationPlayState = 'paused';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;

        currentRotation.y = e.pageX - startX;
        currentRotation.x = e.pageY - startY;

        cube.style.transform = `rotateX(${-currentRotation.x}deg) rotateY(${currentRotation.y}deg)`;
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
        cube.style.animationPlayState = 'running';
    });
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', () => {
    const skillParticles = document.querySelectorAll('.skill-particle');
    
    // Create canvas for particle connections
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    document.querySelector('.skills-container').prepend(canvas);

    function updateCanvas() {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
        ctx.lineWidth = 1;

        skillParticles.forEach((particle, i) => {
            const rect1 = particle.getBoundingClientRect();
            const x1 = rect1.left + rect1.width / 2 - canvas.offsetLeft;
            const y1 = rect1.top + rect1.height / 2 - canvas.offsetTop;

            skillParticles.forEach((particle2, j) => {
                if (i !== j) {
                    const rect2 = particle2.getBoundingClientRect();
                    const x2 = rect2.left + rect2.width / 2 - canvas.offsetLeft;
                    const y2 = rect2.top + rect2.height / 2 - canvas.offsetTop;

                    const distance = Math.hypot(x2 - x1, y2 - y1);
                    if (distance < 200) {
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                    }
                }
            });
        });
    }

    // Update connections on animation frame
    function animate() {
        updateCanvas();
        requestAnimationFrame(animate);
    }

    animate();
}); 