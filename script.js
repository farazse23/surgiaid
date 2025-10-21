// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initHeroSlider();
    initTestimonialSlider();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScrolling();
    initHeaderScroll();
    initProductFilter();
    initProductModal();
    initFAQ();
    initCounters();
    initFormValidation();
    initLazyLoading();
    initPreloader();
});

// Hero Slider Functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Exit if hero elements don't exist on this page
    if (slides.length === 0 || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // 5 seconds for better viewing
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopSlideShow();
            startSlideShow();
        });
    });

    // Start slideshow
    startSlideShow();

    // Pause on hover
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', stopSlideShow);
    heroSection.addEventListener('mouseleave', startSlideShow);
}

// Testimonial Slider Functionality
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    // Exit if testimonial elements don't exist on this page
    if (testimonials.length === 0 || !prevBtn || !nextBtn) return;
    
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        currentTestimonial = index;
    }

    function nextTestimonial() {
        const nextIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }

    function prevTestimonial() {
        const prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prevIndex);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);

    // Auto-advance testimonials
    setInterval(nextTestimonial, 5000);
}

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .feature-card, .about-text, .about-image');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }

        lastScrollTop = scrollTop;
    });
}

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters when they come into view
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '#d1d5db';
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('Message sent successfully!', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Preloader
function initPreloader() {
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
}

// Product Filter Functionality
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    if (filterButtons.length === 0 || productItems.length === 0) {
        return; // Exit if elements don't exist
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            productItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    // Add animation delay based on index
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        item.classList.add('animate__animated', 'animate__fadeInUp');
                    }, index * 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('animate__animated', 'animate__fadeInUp');
                }
            });
        });
    });
}

// Product Modal Functionality
function initProductModal() {
    const modal = document.getElementById('productModal');
    const viewButtons = document.querySelectorAll('.view-details-btn');
    const closeButton = document.querySelector('.modal-close');

    // Exit if modal elements don't exist on this page
    if (!modal || !closeButton || viewButtons.length === 0) return;

    // Product data
    const productData = {
        'scissors-1': {
            title: 'Mayo Scissors',
            description: 'Heavy-duty scissors designed for cutting tough tissue and sutures. Features sharp, durable blades and ergonomic handles. Perfect for general surgery procedures.',
            image: 'images/products.jpg',
            features: [
                'Stainless steel construction',
                'Sharp, durable blades',
                'Ergonomic handles',
                'Autoclavable',
                'Precision cutting',
                'ISO certified',
                'Sterilizable'
            ],
            specifications: {
                'Material': 'Stainless Steel 316L',
                'Length': '6 inches',
                'Weight': '45g',
                'Finish': 'Mirror Polish',
                'Certification': 'ISO 13485:2016'
            }
        },
        'scissors-2': {
            title: 'Metzenbaum Scissors',
            description: 'Fine-tipped scissors perfect for delicate tissue dissection. Ideal for precise surgical procedures.',
            image: 'images/products.jpg',
            features: [
                'Fine-tipped design',
                'Precision cutting',
                'Delicate tissue handling',
                'Stainless steel',
                'Autoclavable'
            ]
        },
        'forceps-1': {
            title: 'Tissue Forceps',
            description: 'Non-toothed forceps for gentle tissue handling. Perfect for delicate surgical procedures.',
            image: 'images/forceps.jpg',
            features: [
                'Non-toothed design',
                'Smooth tips',
                'Gentle tissue handling',
                'Ergonomic grip',
                'Stainless steel'
            ]
        },
        'forceps-2': {
            title: 'Hemostatic Forceps',
            description: 'Clamping forceps designed for controlling bleeding during surgical procedures.',
            image: 'images/foceps2.jpg',
            features: [
                'Locking mechanism',
                'Secure clamping',
                'Bleeding control',
                'Stainless steel',
                'Autoclavable'
            ]
        },
        'blades-1': {
            title: 'Surgical Blades #10',
            description: 'Curved blade designed for general surgical incisions. Ultra-sharp and sterile.',
            image: 'images/blades.jpg',
            features: [
                'Ultra-sharp blade',
                'Sterile packaging',
                'General purpose',
                'Curved design',
                'Single-use'
            ]
        },
        'blades-2': {
            title: 'Surgical Blades #15',
            description: 'Small curved blade for precise incisions. Perfect for detailed surgical work.',
            image: 'images/blades2.jpg',
            features: [
                'Small curved blade',
                'Precision cutting',
                'Detailed work',
                'Sterile',
                'Single-use'
            ]
        },
        'clamps-1': {
            title: 'Kelly Clamps',
            description: 'Straight hemostatic clamps for vessel occlusion. Reliable and secure.',
            image: 'images/clamps.jpg',
            features: [
                'Straight design',
                'Secure grip',
                'Vessel occlusion',
                'Stainless steel',
                'Autoclavable'
            ]
        },
        'clamps-2': {
            title: 'Mosquito Clamps',
            description: 'Small curved clamps for delicate procedures. Perfect for fine surgical work.',
            image: 'images/claps.jpg',
            features: [
                'Small curved design',
                'Fine tips',
                'Delicate procedures',
                'Stainless steel',
                'Autoclavable'
            ]
        },
        'retractors-1': {
            title: 'Army-Navy Retractor',
            description: 'Hand-held retractor for tissue exposure. Ergonomic design for comfortable use.',
            image: 'images/productss.jpg',
            features: [
                'Hand-held design',
                'Ergonomic handle',
                'Tissue exposure',
                'Stainless steel',
                'Autoclavable'
            ]
        },
        'retractors-2': {
            title: 'Senn Retractor',
            description: 'Double-ended retractor with sharp and blunt ends. Versatile tool for various procedures.',
            image: 'images/gloves.jpg',
            features: [
                'Double-ended design',
                'Sharp and blunt ends',
                'Versatile use',
                'Stainless steel',
                'Autoclavable'
            ]
        },
        'needles-1': {
            title: 'Cutting Needles',
            description: 'Triangular point needles for tough tissue. Sharp and reliable for suturing.',
            image: 'images/closeup-syringe.jpg',
            features: [
                'Triangular point',
                'Sharp design',
                'Tough tissue',
                'Stainless steel',
                'Sterile'
            ]
        },
        'needles-2': {
            title: 'Tapered Needles',
            description: 'Round-bodied needles for delicate tissue. Smooth passage through tissue.',
            image: 'images/gloves2.jpg',
            features: [
                'Round-bodied design',
                'Smooth passage',
                'Delicate tissue',
                'Stainless steel',
                'Sterile'
            ]
        }
    };

    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-product');
            const product = productData[productId];

            if (product) {
                document.getElementById('modalImage').src = product.image;
                document.getElementById('modalTitle').textContent = product.title;
                document.getElementById('modalDescription').textContent = product.description;
                
                // Update features
                const featuresList = document.getElementById('modalFeatures');
                featuresList.innerHTML = '';
                product.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });



                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Order button functionality
    const orderBtn = document.getElementById('orderBtn');
    if (orderBtn) {
        orderBtn.addEventListener('click', () => {
            const productTitle = document.getElementById('modalTitle').textContent;
            const message = `Hi! I'm interested in ordering: ${productTitle}. Please provide more details about pricing and availability.`;
            const whatsappUrl = `https://wa.me/923266472126?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Contact button functionality
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            const productTitle = document.getElementById('modalTitle').textContent;
            const message = `Hi! I need more information about: ${productTitle}. Please contact me for details.`;
            const whatsappUrl = `https://wa.me/923266472126?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Close modal
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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
    };
}

// Performance optimization
const debouncedScroll = debounce(() => {
    // Handle scroll events
}, 16);

window.addEventListener('scroll', debouncedScroll);
