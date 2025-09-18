/*--------------------------------------------------------------
# CHW Website - Professional JavaScript Implementation
--------------------------------------------------------------*/

class CHWWebsite {
    constructor() {
        this.init();
        this.notifications = [];
        this.isLoading = true;
        this.scrollPosition = 0;
        this.ticking = false;
    }

    init() {
        this.setupLoadingState();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupScrollAnimations();
        this.setupFormHandling();
        this.setupSmoothScrolling();

        this.setupAccessibility();
        this.addLoadingComplete();
    }

    // Loading State Management
    setupLoadingState() {
        document.body.classList.add('loading');
        
        // Remove loading class when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.removeLoadingState();
            });
        } else {
            this.removeLoadingState();
        }
    }

    removeLoadingState() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            this.isLoading = false;
        }, 300);
    }

    // Enhanced Navigation with Performance Optimization
    setupNavigation() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll direction (only on mobile)
            if (window.innerWidth <= 768) {
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });

        // Set active nav link
        this.setActiveNavLink();
    }

    setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    // Enhanced Mobile Menu with Animation - FIXED
    setupMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        
        if (!toggle || !menu) return;

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMobileMenu();
        });

        // Close menu when clicking nav links
        const navLinks = menu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menu.classList.contains('active') && 
                !toggle.contains(e.target) && 
                !menu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && menu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    // FIXED - Using correct class names
    toggleMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        
        const isActive = toggle.classList.contains('active');
        
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
        
        // Update ARIA attributes
        toggle.setAttribute('aria-expanded', !isActive);
    }

    // FIXED - Using correct class names
    closeMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        
        if (toggle && menu) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    }

    // Enhanced Scroll Animations with Intersection Observer
    setupScrollAnimations() {
        const observerOptions = {
            threshold: [0.1, 0.3, 0.7],
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add staggered animation delay for child elements
                    if (entry.target.parentElement?.classList.contains('stagger-children')) {
                        const siblings = Array.from(entry.target.parentElement.children);
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.15}s`;
                    }
                    
                    entry.target.classList.add('animate-in');
                    
                    // Add different animation intensities based on intersection ratio
                    if (entry.intersectionRatio > 0.7) {
                        entry.target.classList.add('fully-visible');
                    }
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        const animatedElements = document.querySelectorAll(
            '.animate-on-scroll, .stagger-children > *, .fade-in, .slide-up, .scale-in'
        );
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

   

    // Enhanced Accessibility Features
    setupAccessibility() {
        // Keyboard navigation for custom elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu
                this.closeMobileMenu();
                
                // Close modal if exists
                const modal = document.querySelector('.modal-overlay.active');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.classList.remove('modal-open');
                }
            }
        });

        // Focus management for forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const firstError = form.querySelector('.field-error');
                if (firstError) {
                    const errorField = firstError.closest('.form-group').querySelector('input, textarea');
                    if (errorField) {
                        errorField.focus();
                    }
                }
            });
        });

        // Add skip link functionality
        this.setupSkipLinks();
    }

    setupSkipLinks() {
        // Create skip link if it doesn't exist
        if (!document.querySelector('.skip-link')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.className = 'skip-link';
            skipLink.textContent = 'Skip to main content';
            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector('#main-content') || document.querySelector('main');
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Enhanced Form Handling with Better Validation
    setupFormHandling() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
            
            // Real-time validation with debouncing
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                let timeout;
                
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                    
                    // Debounced validation for better UX
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        if (input.value.length > 0) {
                            this.validateField(input);
                        }
                    }, 500);
                });

                // Add floating label effect
                this.setupFloatingLabels(input);
            });
        });

        // Setup modal functionality if modal exists
        this.setupModalFunctionality();
    }

    // NEW - Modal functionality
    setupModalFunctionality() {
        const scheduleBtn = document.getElementById('scheduleCallBtn');
        const modal = document.getElementById('contactModal');
        const closeBtn = document.getElementById('closeModal');
        const modalOverlay = document.querySelector('.modal-overlay');
        const discoveryForm = document.getElementById('discoveryForm');
        
        if (!scheduleBtn || !modal) return;
        
        // Open modal
        scheduleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.classList.add('modal-open');
            
            // Re-initialize Lucide icons for the modal
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
        
        // Close modal
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        };
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        // Close modal when clicking outside
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });
        }
        
        // Form submission for modal
        if (discoveryForm) {
            discoveryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Validate form first
                const inputs = discoveryForm.querySelectorAll('input, textarea, select');
                let isFormValid = true;
                
                inputs.forEach(input => {
                    if (!this.validateField(input)) {
                        isFormValid = false;
                    }
                });
                
                if (isFormValid) {
                    this.showNotification('Thank you! We\'ll be in touch within 24 hours to schedule your discovery call.', 'success');
                    closeModal();
                    discoveryForm.reset();
                } else {
                    this.showNotification('Please correct the errors and try again', 'error');
                }
            });
        }
    }

    setupFloatingLabels(input) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;

        const label = formGroup.querySelector('label');
        if (!label) return;

        const handleFocus = () => {
            formGroup.classList.add('focused');
        };

        const handleBlur = () => {
            if (!input.value) {
                formGroup.classList.remove('focused');
            }
        };

        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);

        // Check initial state
        if (input.value) {
            formGroup.classList.add('focused');
        }
    }

    validateField(field) {
        const value = field.value.trim();
        
        // Clear previous errors
        this.clearFieldError(field);
        
        // Required field check
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{7,15}$/;
            if (!phoneRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }

        // Name validation (no numbers or special characters)
        if (field.name === 'name' && value) {
            if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                this.showFieldError(field, 'Name should only contain letters, spaces, hyphens, and apostrophes');
                return false;
            }
        }

        // Message minimum length
        if (field.name === 'message' && value && value.length < 10) {
            this.showFieldError(field, 'Message must be at least 10 characters');
            return false;
        }
        
        return true;
    }

    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        // Remove existing error
        this.clearFieldError(field);

        // Add error class and message
        formGroup.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        
        formGroup.appendChild(errorElement);
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        formGroup.classList.remove('error');
        field.removeAttribute('aria-invalid');
        
        const errorElement = formGroup.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('[type="submit"]');
        
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showNotification('Please correct the errors and try again', 'error');
            // Focus on first error field
            const firstError = form.querySelector('.field-error');
            if (firstError) {
                const errorField = firstError.closest('.form-group').querySelector('input, textarea');
                if (errorField) {
                    errorField.focus();
                }
            }
            return;
        }
        
        // Show loading state
        const originalText = submitButton.textContent;
        submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        try {
            // For demo purposes - in real implementation, send to backend
            const formObject = Object.fromEntries(formData);
            console.log('Form submission:', formObject);
            
            // Simulate API call with realistic delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success state
            this.showNotification(
                'Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 
                'success'
            );
            form.reset();
            
            // Clear floating labels
            const formGroups = form.querySelectorAll('.form-group.focused');
            formGroups.forEach(group => group.classList.remove('focused'));
            
            // Scroll to top of form for better UX
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification(
                'Sorry, there was an error sending your message. Please try again or contact us directly.', 
                'error'
            );
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    }

    // Enhanced Smooth Scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update focus for accessibility
                    targetElement.focus();
                }
            });
        });
    }

    // Enhanced Notification System
    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <div class="notification__icon">
                    ${this.getNotificationIcon(type)}
                </div>
                <div class="notification__message">${message}</div>
                <button class="notification__close" aria-label="Close notification">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;

        // Add close functionality
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.addEventListener('click', () => this.closeNotification(notification));

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto-close
        if (duration > 0) {
            setTimeout(() => this.closeNotification(notification), duration);
        }

        return notification;
    }

    getNotificationIcon(type) {
        const icons = {
            success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"></polyline></svg>',
            error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
            warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
            info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
        };
        return icons[type] || icons.info;
    }

    closeNotification(notification) {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    addLoadingComplete() {
        // Initialize Lucide icons if available
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Add smooth reveal animation to page
        setTimeout(() => {
            document.body.classList.add('content-loaded');
        }, 100);

        // Preload images for better performance
        this.preloadImages();

        console.log('CHW Website initialized successfully!');
    }

    // Preload critical images
    preloadImages() {
        const images = document.querySelectorAll('[data-src], img[src*="unsplash"]');
        
        images.forEach(img => {
            if (img.dataset.src) {
                const imageLoader = new Image();
                imageLoader.onload = () => {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                };
                imageLoader.onerror = () => {
                    img.classList.add('error');
                };
                imageLoader.src = img.dataset.src;
            }
        });
    }
}

// Initialize the website when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CHWWebsite();
    });
} else {
    new CHWWebsite();
}

// Add CSS for notifications and loading states if not already present
if (!document.querySelector('#chw-dynamic-styles')) {
    const dynamicStyles = document.createElement('style');
    dynamicStyles.id = 'chw-dynamic-styles';
    dynamicStyles.textContent = `
        /* Loading States */
        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Skip Link */
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: #556B56;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 9999;
            transition: top 0.3s;
        }

        .skip-link:focus {
            top: 6px;
        }

        /* Form States */
        .form-group {
            position: relative;
            margin-bottom: 1.5rem;
        }

        .form-group.error input,
        .form-group.error textarea,
        .form-group.error select {
            border-color: #dc2626;
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }

        .field-error {
            color: #dc2626;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }

        /* Modal States */
        .modal-open {
            overflow: hidden;
        }

        /* Navigation States */
        .nav-open {
            overflow: hidden;
            position: fixed;
            width: 100%;
        }

        /* Notification System */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            min-width: 300px;
            max-width: 500px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            border-left: 4px solid #556B56;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification.hide {
            transform: translateX(100%);
        }

        .notification--success {
            border-left-color: #10b981;
        }

        .notification--error {
            border-left-color: #dc2626;
        }

        .notification--warning {
            border-left-color: #f59e0b;
        }

        .notification__content {
            display: flex;
            align-items: flex-start;
            padding: 16px;
        }

        .notification__icon {
            margin-right: 12px;
            margin-top: 2px;
        }

        .notification__message {
            flex: 1;
            font-size: 14px;
            line-height: 1.5;
        }

        .notification__close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
            margin-left: 8px;
            opacity: 0.7;
            transition: opacity 0.2s;
        }

        .notification__close:hover {
            opacity: 1;
        }

        /* Animation Classes */
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .fade-in {
            opacity: 0;
            transition: opacity 0.6s ease-in-out;
        }

        .fade-in.animate-in {
            opacity: 1;
        }

        .slide-up {
            transform: translateY(50px);
            opacity: 0;
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .slide-up.animate-in {
            transform: translateY(0);
            opacity: 1;
        }

        .scale-in {
            transform: scale(0.8);
            opacity: 0;
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .scale-in.animate-in {
            transform: scale(1);
            opacity: 1;
        }

        /* Mobile Navigation Responsive */
        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                min-width: auto;
            }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            .animate-on-scroll,
            .fade-in,
            .slide-up,
            .scale-in {
                transition: none;
                transform: none;
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(dynamicStyles);
}
