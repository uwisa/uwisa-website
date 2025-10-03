"// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initFormHandling();
    initAnimations();
    initToastSystem();
});

// Navigation Functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Update active nav link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Call once to set initial state
}

// Update active navigation link based on current section
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^=\"#\"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const membershipForm = document.getElementById('membershipForm');
    const contactForm = document.getElementById('contactForm');

    if (membershipForm) {
        membershipForm.addEventListener('submit', handleMembershipForm);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

// Handle Membership Form Submission
function handleMembershipForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!validateMembershipForm(data)) {
        return;
    }
    
    // Simulate form submission
    showToast('Application submitted successfully! We will contact you within 2-3 business days.', 'success');
    
    // Reset form
    e.target.reset();
    
    // Optional: Scroll to top of form or show confirmation section
    e.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Handle Contact Form Submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!validateContactForm(data)) {
        return;
    }
    
    // Simulate form submission
    showToast('Message sent successfully! We will get back to you within 24-48 hours.', 'success');
    
    // Reset form
    e.target.reset();
    
    // Optional: Scroll to top of form
    e.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Validate Membership Form
function validateMembershipForm(data) {
    const requiredFields = ['fullName', 'email', 'phone', 'sector'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
    
    if (missingFields.length > 0) {
        showToast('Please fill in all required fields.', 'error');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        showToast('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!data.citizenship) {
        showToast('You must confirm South African citizenship to proceed.', 'error');
        return false;
    }
    
    if (!data.terms) {
        showToast('Please accept the terms and conditions to proceed.', 'error');
        return false;
    }
    
    return true;
}

// Validate Contact Form
function validateContactForm(data) {
    const requiredFields = ['contactName', 'contactEmail', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
    
    if (missingFields.length > 0) {
        showToast('Please fill in all required fields.', 'error');
        return false;
    }
    
    if (!validateEmail(data.contactEmail)) {
        showToast('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

// Email validation helper
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toast System
function initToastSystem() {
    // Create toast container if it doesn't exist
    if (!document.getElementById('toastContainer')) {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            z-index: 1001;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }
}

// Show Toast Message
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        background: ${type === 'error' ? '#dc2626' : '#059669'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        margin-bottom: 1rem;
        pointer-events: auto;
        cursor: pointer;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeToast(toast);
    }, 5000);
    
    // Remove on click
    toast.addEventListener('click', () => removeToast(toast));
}

// Remove Toast
function removeToast(toast) {
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Animation System
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.benefit-card, .requirement-card, .leader-card, .dept-card, .contact-card, .about-item, .stat-item');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 100}ms`;
        observer.observe(element);
    });
}

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Smooth scrolling polyfill for older browsers
function smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Handle window resize events
window.addEventListener('resize', throttle(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
}, 250));

// Handle scroll events for header transparency and nav updates
window.addEventListener('scroll', throttle(function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}, 10));

// Local Storage Helper Functions
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
}

// Form data persistence (optional feature)
function initFormPersistence() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const formId = form.id;
        if (!formId) return;
        
        // Load saved form data
        const savedData = loadFromLocalStorage(`form_${formId}`);
        if (savedData) {
            Object.keys(savedData).forEach(key => {
                const field = form.querySelector(`[name=\"${key}\"]`);
                if (field && field.type !== 'checkbox') {
                    field.value = savedData[key];
                }
            });
        }
        
        // Save form data on change
        form.addEventListener('input', debounce(function(e) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            saveToLocalStorage(`form_${formId}`, data);
        }, 500));
        
        // Clear saved data on successful submission
        form.addEventListener('submit', function() {
            localStorage.removeItem(`form_${formId}`);
        });
    });
}

// Initialize form persistence (uncomment if needed)
// initFormPersistence();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Print styles helper
function initPrintStyles() {
    const printStyles = `
        @media print {
            .header, .footer, .nav-toggle { display: none !important; }
            .hero-section { padding-top: 2rem !important; }
            .section { page-break-inside: avoid; }
            .leader-card, .dept-card { page-break-inside: avoid; }
            body { font-size: 12pt; line-height: 1.4; }
            .container { max-width: 100% !important; padding: 0 !important; }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = printStyles;
    document.head.appendChild(style);
}

// Initialize print styles
initPrintStyles();

// Analytics helper (placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, properties);
    
    // Example implementation:
    // if (window.gtag) {
    //     window.gtag('event', eventName, properties);
    // }
}

// Track form submissions
document.addEventListener('submit', function(e) {
    const formId = e.target.id;
    if (formId) {
        trackEvent('form_submission', { form_id: formId });
    }
});

// Track navigation clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link')) {
        const targetSection = e.target.getAttribute('href');
        trackEvent('navigation_click', { target_section: targetSection });
    }
});

// Performance monitoring
function initPerformanceMonitoring() {
    // Log page load time
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', Math.round(loadTime), 'ms');
            
            trackEvent('page_load_time', { 
                load_time: Math.round(loadTime),
                page: window.location.pathname
            });
        }, 0);
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();"

