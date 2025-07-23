document.addEventListener('DOMContentLoaded', function() {
            // Theme Toggle
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = themeToggle.querySelector('i');
            const body = document.body;
            let darkMode = localStorage.getItem('darkMode');
            
            // Check for saved user preference
            if (darkMode === 'enabled') {
                body.setAttribute('data-theme', 'dark');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
            
            // Toggle theme
            themeToggle.addEventListener('click', () => {
                if (body.getAttribute('data-theme') === 'dark') {
                    body.removeAttribute('data-theme');
                    localStorage.setItem('darkMode', 'disabled');
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                } else {
                    body.setAttribute('data-theme', 'dark');
                    localStorage.setItem('darkMode', 'enabled');
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                }
            });
            
            // Mobile Menu
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mobileMenuClose = document.getElementById('mobileMenuClose');
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuLinks = mobileMenu.querySelectorAll('.nav-links a');
            
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            mobileMenuClose.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Smooth scroll for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Header scroll effect
            const header = document.querySelector('header');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('header-scroll');
                } else {
                    header.classList.remove('header-scroll');
                }
                
                // Back to top button
                const backToTop = document.getElementById('backToTop');
                if (window.scrollY > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            });
            
            // Projects carousel
            const carousel = document.getElementById('projectsCarousel');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            let isDragging = false;
            let startPos = 0;
            let currentTranslate = 0;
            let prevTranslate = 0;
            
            // Enable horizontal scrolling with mouse drag
            carousel.addEventListener('mousedown', (e) => {
                isDragging = true;
                startPos = e.clientX;
                prevTranslate = currentTranslate;
                carousel.style.cursor = 'grabbing';
                e.preventDefault();
            });
            
            carousel.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                const currentPosition = e.clientX;
                currentTranslate = prevTranslate + currentPosition - startPos;
                carousel.style.transform = `translateX(${currentTranslate}px)`;
                updateCarouselButtons();
            });
            
            carousel.addEventListener('mouseup', () => {
                isDragging = false;
                carousel.style.cursor = 'grab';
                checkBounds();
            });
            
            carousel.addEventListener('mouseleave', () => {
                isDragging = false;
                carousel.style.cursor = 'grab';
                checkBounds();
            });
            
            // Touch events for mobile
            carousel.addEventListener('touchstart', (e) => {
                isDragging = true;
                startPos = e.touches[0].clientX;
                prevTranslate = currentTranslate;
                carousel.style.cursor = 'grabbing';
            });
            
            carousel.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                const currentPosition = e.touches[0].clientX;
                currentTranslate = prevTranslate + currentPosition - startPos;
                carousel.style.transform = `translateX(${currentTranslate}px)`;
                updateCarouselButtons();
            });
            
            carousel.addEventListener('touchend', () => {
                isDragging = false;
                carousel.style.cursor = 'grab';
                checkBounds();
            });
            
            // Carousel buttons
            prevBtn.addEventListener('click', () => {
                currentTranslate += 370;
                animateCarousel();
                updateCarouselButtons();
            });
            
            nextBtn.addEventListener('click', () => {
                currentTranslate -= 370;
                animateCarousel();
                updateCarouselButtons();
            });
            
            function animateCarousel() {
                carousel.style.transition = 'transform 0.5s ease';
                carousel.style.transform = `translateX(${currentTranslate}px)`;
                
                carousel.addEventListener('transitionend', () => {
                    carousel.style.transition = 'none';
                }, { once: true });
            }
            
            function checkBounds() {
                const carouselRect = carousel.getBoundingClientRect();
                const containerRect = carousel.parentElement.getBoundingClientRect();
                
                // Snap to nearest position
                const cardWidth = 370; // width + gap
                const snapPosition = Math.round(currentTranslate / cardWidth) * cardWidth;
                currentTranslate = snapPosition;
                animateCarousel();
                
                updateCarouselButtons();
            }
            
            function updateCarouselButtons() {
                const carouselRect = carousel.getBoundingClientRect();
                const containerRect = carousel.parentElement.getBoundingClientRect();
                
                prevBtn.disabled = currentTranslate >= 0;
                nextBtn.disabled = currentTranslate <= -(carouselRect.width - containerRect.width);
            }
            
            // Form validation
            const contactForm = document.getElementById('contactForm');
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let isValid = true;
                
                // Validate name
                if (nameInput.value.trim() === '') {
                    document.getElementById('nameError').style.display = 'block';
                    isValid = false;
                } else {
                    document.getElementById('nameError').style.display = 'none';
                }
                
                // Validate email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    document.getElementById('emailError').style.display = 'block';
                    isValid = false;
                } else {
                    document.getElementById('emailError').style.display = 'none';
                }
                
                // Validate subject
                if (subjectInput.value.trim() === '') {
                    document.getElementById('subjectError').style.display = 'block';
                    isValid = false;
                } else {
                    document.getElementById('subjectError').style.display = 'none';
                }
                
                // Validate message
                if (messageInput.value.trim() === '') {
                    document.getElementById('messageError').style.display = 'block';
                    isValid = false;
                } else {
                    document.getElementById('messageError').style.display = 'none';
                }
                
                if (isValid) {
                    const submitBtn = contactForm.querySelector('button[type="submit"]');
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                    submitBtn.disabled = true;
                    
                    // Simulate form submission (replace with actual fetch/axios call)
                    setTimeout(() => {
                        submitBtn.innerHTML = 'Mensaje enviado <i class="fas fa-check"></i>';
                        setTimeout(() => {
                            submitBtn.innerHTML = 'Enviar mensaje <i class="fas fa-paper-plane"></i>';
                            submitBtn.disabled = false;
                            contactForm.reset();
                        }, 2000);
                    }, 1500);
                }
            });
            
            // Intersection Observer for animations
            const animateOnScroll = () => {
                const elements = document.querySelectorAll('.skill-card, .project-card, .contact-form, .about-image, .about-text');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                });
                
                elements.forEach(element => {
                    observer.observe(element);
                });
            };
            
            // Initialize animations
            animateOnScroll();
        });