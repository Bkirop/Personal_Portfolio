// Enhanced JavaScript for interactions
        document.addEventListener('DOMContentLoaded', function() {
            // Navigation functionality
            const navbar = document.getElementById('navbar');
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('section');
            const progressBar = document.querySelector('.progress-bar');
            const scrollTopBtn = document.getElementById('scrollTop');

            // Smooth scrolling for navigation links
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 100;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Update active navigation link and progress bar
            function updateNavigation() {
                const scrolled = window.pageYOffset;
                const windowHeight = window.innerHeight;
                const docHeight = document.documentElement.scrollHeight;
                
                // Update progress bar
                const progress = (scrolled / (docHeight - windowHeight)) * 100;
                progressBar.style.width = progress + '%';

                // Update navbar appearance
                if (scrolled > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Update active section
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 150;
                    const sectionHeight = section.clientHeight;
                    if (scrolled >= sectionTop && scrolled < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });

                // Update active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });

                // Show/hide scroll to top button
                if (scrolled > 500) {
                    scrollTopBtn.classList.add('show');
                } else {
                    scrollTopBtn.classList.remove('show');
                }
            }

            // Scroll event listener with throttling
            let ticking = false;
            function onScroll() {
                if (!ticking) {
                    requestAnimationFrame(function() {
                        updateNavigation();
                        animateOnScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            }

            window.addEventListener('scroll', onScroll);

            // Scroll to top functionality
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Animate elements on scroll
            function animateOnScroll() {
                const animateElements = document.querySelectorAll('.animate-on-scroll');
                
                animateElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.classList.add('animated');
                    }
                });
            }

            // Contact form handling
            const contactForm = document.getElementById('contactForm');
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Form validation and submission logic would go here
                const formData = new FormData(contactForm);
                const formObject = Object.fromEntries(formData);
                
                // Show success message (replace with actual form submission)
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
            });

            // Add loading animation for project cards
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            });

            // Enhanced hover effects for skill cards
            const skillCards = document.querySelectorAll('.skill-card');
            skillCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-15px) rotateY(5deg)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) rotateY(0)';
                });
            });

            // Typewriter effect for hero title
            const heroTitle = document.querySelector('.hero h1');
            const titleText = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let i = 0;
            function typeWriter() {
                if (i < titleText.length) {
                    heroTitle.textContent += titleText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            setTimeout(typeWriter, 1000);

            // Initialize animations
            updateNavigation();
            animateOnScroll();
        });

        // Performance optimization: Intersection Observer for better scroll animations
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, observerOptions);

            // Observe all animate-on-scroll elements
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        }