/* ============================================
   Main Script — Interactive Functionality
   Preloader, cursor, theme, counters, form, etc.
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================
       TOAST NOTIFICATION SYSTEM
       Reusable toast for form feedback, etc.
    ========================================== */

    /**
     * Shows a toast notification that slides in from the right.
     * @param {string} message - The notification message.
     * @param {'success'|'error'|'info'} type - Toast type for styling.
     */
    function showToast(message, type) {
        type = type || 'info';

        // Create toast container if not present
        var container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText =
                'position:fixed;top:24px;right:24px;z-index:99999;display:flex;flex-direction:column;gap:12px;pointer-events:none;';
            document.body.appendChild(container);
        }

        // Icon map
        var iconMap = {
            success: 'fa-circle-check',
            error: 'fa-circle-xmark',
            info: 'fa-circle-info'
        };

        // Color map
        var colorMap = {
            success: 'rgba(16, 185, 129, 0.9)',
            error: 'rgba(239, 68, 68, 0.9)',
            info: 'rgba(108, 99, 255, 0.9)'
        };

        var toast = document.createElement('div');
        toast.style.cssText =
            'pointer-events:auto;display:flex;align-items:center;gap:12px;padding:16px 24px;' +
            'border-radius:12px;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);' +
            'background:rgba(30,30,50,0.85);border:1px solid rgba(255,255,255,0.1);' +
            'color:#fff;font-size:0.95rem;font-family:inherit;min-width:280px;max-width:420px;' +
            'box-shadow:0 8px 32px rgba(0,0,0,0.3);transform:translateX(120%);' +
            'transition:transform 0.4s cubic-bezier(0.22,1,0.36,1),opacity 0.4s ease;opacity:0;';

        toast.innerHTML =
            '<i class="fas ' + (iconMap[type] || iconMap.info) +
            '" style="font-size:1.25rem;color:' + (colorMap[type] || colorMap.info) +
            ';flex-shrink:0;"></i>' +
            '<span>' + message + '</span>';

        container.appendChild(toast);

        // Trigger slide-in
        requestAnimationFrame(function () {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        });

        // Auto-dismiss after 3 seconds
        setTimeout(function () {
            toast.style.transform = 'translateX(120%)';
            toast.style.opacity = '0';
            setTimeout(function () {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 400);
        }, 3000);
    }

    /* ==========================================
       PRELOADER
    ========================================== */
    window.addEventListener('load', function () {
        var preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(function () {
                preloader.style.opacity = '0';
                preloader.style.transition = 'opacity 0.5s ease';
                setTimeout(function () {
                    preloader.style.display = 'none';
                    // Dispatch custom event to sync GSAP animations
                    document.dispatchEvent(new CustomEvent('preloaderFinished'));
                }, 500);
            }, 1500);
        } else {
            document.dispatchEvent(new CustomEvent('preloaderFinished'));
        }
        document.body.classList.add('loaded');
    });



    /* ==========================================
       MOUSE GLOW EFFECT
       Ambient glow that follows the cursor
    ========================================== */
    var isHoverDevice = window.matchMedia('(hover: hover)').matches;
    if (isHoverDevice) {
        var mouseGlow = document.createElement('div');
        mouseGlow.classList.add('mouse-glow');
        mouseGlow.style.cssText =
            'position:fixed;width:350px;height:350px;border-radius:50%;' +
            'background:radial-gradient(circle,rgba(108,99,255,0.08) 0%,transparent 70%);' +
            'pointer-events:none;z-index:0;top:0;left:0;' +
            'transition:transform 0.3s ease-out;will-change:transform;';
        document.body.appendChild(mouseGlow);

        document.addEventListener('mousemove', function (e) {
            mouseGlow.style.transform =
                'translate(' + (e.clientX - 175) + 'px, ' + (e.clientY - 175) + 'px)';
        });
    }

    /* ==========================================
       SCROLL PROGRESS BAR
    ========================================== */
    var scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', function () {
            var scrollTop = window.scrollY || document.documentElement.scrollTop;
            var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
            scrollProgress.style.transform = 'scaleX(' + scrollPercent + ')';
        }, { passive: true });
    }

    /* ==========================================
       NAVBAR SCROLL EFFECT
    ========================================== */
    var navbar = document.querySelector('.navbar');

    // Add / remove .scrolled class
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Active nav link highlighting via IntersectionObserver
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (sections.length > 0 && navLinks.length > 0) {
        var navObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        });

        sections.forEach(function (section) {
            navObserver.observe(section);
        });
    }

    /* ==========================================
       SMOOTH SCROLL FOR NAV LINKS
    ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });

                // Close mobile navbar if open
                var navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    } else {
                        new bootstrap.Collapse(navbarCollapse, { toggle: true });
                    }
                }
            }
        });
    });

    /* ==========================================
       THEME TOGGLE (Dark / Light Mode)
    ========================================== */
    var themeToggle = document.querySelector('.theme-toggle');
    var savedTheme = localStorage.getItem('theme');

    // Apply saved theme on load
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon(true);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            // Add transition class for smooth theme switch
            document.body.classList.add('theme-transition');

            var isLight = document.body.classList.toggle('light-mode');

            // Save preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');

            // Update icon
            updateThemeIcon(isLight);

            // Remove transition class after animation completes
            setTimeout(function () {
                document.body.classList.remove('theme-transition');
            }, 500);
        });
    }

    /**
     * Update theme toggle icon between moon and sun.
     * @param {boolean} isLight - Whether light mode is active.
     */
    function updateThemeIcon(isLight) {
        if (!themeToggle) return;
        var icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    /* ==========================================
       ANIMATED COUNTERS
       Count up numbers when they enter viewport
    ========================================== */
    var statNumbers = document.querySelectorAll('.stat-number[data-count]');

    if (statNumbers.length > 0) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        statNumbers.forEach(function (el) {
            counterObserver.observe(el);
        });
    }

    /**
     * Animate a counter element from 0 to its data-count value.
     * @param {HTMLElement} el - The element with a data-count attribute.
     */
    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;

        var hasSuffix = el.textContent.indexOf('+') !== -1 || el.getAttribute('data-suffix') === '+';
        var suffix = hasSuffix ? '+' : '';
        var duration = 2000; // 2 seconds
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic for smooth deceleration
            var easedProgress = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(easedProgress * target);

            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + suffix;
            }
        }

        requestAnimationFrame(step);
    }

    /* ==========================================
       CONTACT FORM HANDLING
    ========================================== */
    var contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation — check required fields
            var isValid = true;
            var requiredFields = contactForm.querySelectorAll('[required]');
            requiredFields.forEach(function (field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            if (!isValid) {
                showToast('Please fill in all required fields.', 'error');
                return;
            }

            // Email format check
            var emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    emailField.classList.add('is-invalid');
                    showToast('Please enter a valid email address.', 'error');
                    return;
                }
            }

            // Show loading state on submit button
            var submitBtn = contactForm.querySelector('button[type="submit"], input[type="submit"]');
            var originalBtnHTML = '';
            if (submitBtn) {
                originalBtnHTML = submitBtn.innerHTML;
                submitBtn.innerHTML =
                    '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                submitBtn.disabled = true;
            }

            // Simulate form submission (replace with real endpoint as needed)
            setTimeout(function () {
                showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();

                // Remove all floating-label active states
                contactForm.querySelectorAll('.form-control').forEach(function (input) {
                    input.classList.remove('is-invalid');
                    var label = input.parentElement.querySelector('label');
                    if (label) label.classList.remove('active');
                });

                // Restore button
                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnHTML;
                    submitBtn.disabled = false;
                }
            }, 1500);
        });

        // Remove invalid state on input
        contactForm.querySelectorAll('.form-control').forEach(function (field) {
            field.addEventListener('input', function () {
                this.classList.remove('is-invalid');
            });
        });
    }

    /* ==========================================
       BACK TO TOP BUTTON
    ========================================== */
    var backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==========================================
       NAVBAR MOBILE TOGGLE
       Close navbar collapse on link click
    ========================================== */
    var navbarToggler = document.querySelector('.navbar-toggler');
    var navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    /* ==========================================
       VANILLA TILT INIT (Fallback)
       In case animations.js hasn't initialized it
    ========================================== */
    if (typeof VanillaTilt !== 'undefined') {
        var tiltEls = document.querySelectorAll('[data-tilt]');
        if (tiltEls.length > 0) {
            VanillaTilt.init(tiltEls, {
                max: 5,
                speed: 400,
                glare: true,
                'max-glare': 0.2,
                scale: 1.02
            });
        }
    }

    /* ==========================================
       GITHUB CONTRIBUTIONS / STATS FETCH
    ========================================== */
    var githubContribEl = document.getElementById('github-contributions');

    if (githubContribEl) {
        fetch('https://api.github.com/users/thisissohel07')
            .then(function (response) {
                if (!response.ok) throw new Error('GitHub API error');
                return response.json();
            })
            .then(function (data) {
                var repoCount = data.public_repos || 0;
                githubContribEl.textContent = repoCount;
                // If the element also has data-count for animation, update it
                githubContribEl.setAttribute('data-count', repoCount);
            })
            .catch(function (error) {
                console.warn('GitHub API fetch failed:', error);
                // Fallback number
                githubContribEl.textContent = githubContribEl.getAttribute('data-count') || '10';
            });
    }

    /* ==========================================
       FORM FLOATING LABELS
       Focus/blur handlers for custom labels
    ========================================== */
    document.querySelectorAll('.form-control').forEach(function (input) {
        // Check initial state (e.g., autofilled values)
        if (input.value.trim() !== '') {
            var label = input.parentElement.querySelector('label');
            if (label) label.classList.add('active');
        }

        input.addEventListener('focus', function () {
            var label = this.parentElement.querySelector('label');
            if (label) label.classList.add('active');
        });

        input.addEventListener('blur', function () {
            var label = this.parentElement.querySelector('label');
            if (label && this.value.trim() === '') {
                label.classList.remove('active');
            }
        });
    });

    /* ==========================================
       IMAGE LAZY LOADING
       IntersectionObserver for data-src images
    ========================================== */
    var lazyImages = document.querySelectorAll('img[data-src]');

    if (lazyImages.length > 0) {
        var imageObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.getAttribute('data-src');

                    // Also handle data-srcset if present
                    if (img.getAttribute('data-srcset')) {
                        img.srcset = img.getAttribute('data-srcset');
                    }

                    img.removeAttribute('data-src');
                    img.removeAttribute('data-srcset');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(function (img) {
            imageObserver.observe(img);
        });
    }

}); // end DOMContentLoaded
