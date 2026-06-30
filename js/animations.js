/* ============================================
   Animations — GSAP, ScrollTrigger, AOS, Tilt
   Scroll-triggered & entrance animations
   ============================================ */

function initAnimations() {

    /* ------------------------------------------
       AOS (Animate On Scroll) Initialization
    ------------------------------------------ */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out-quad',
            once: true,
            offset: 100,
            disable: function () {
                return window.innerWidth < 768;
            }
        });
    } else {
        console.warn('AOS not loaded — skipping AOS initialization.');
    }

    /* ------------------------------------------
       GSAP + ScrollTrigger Setup
    ------------------------------------------ */
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded — skipping GSAP animations.');
        return;
    }

    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        console.warn('ScrollTrigger not loaded — scroll-based animations will be skipped.');
    }

    // Set default GSAP easing
    gsap.defaults({ ease: 'power3.out' });

    /* ------------------------------------------
       Hero Animations (on page load)
    ------------------------------------------ */
    const heroTl = gsap.timeline({ paused: true });

    heroTl
        .from('.profile-img-wrapper', {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)'
        })
        .from('.hero-tagline', {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, '-=0.3')
        .from('.typed-wrapper', {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, '-=0.3')
        .from('.hero-description', {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, '-=0.2')
        .from('.hero-buttons', {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, '-=0.2')
        .from('.social-links .social-icon', {
            y: 20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1
        }, '-=0.2');

    // Play when preloader finished
    document.addEventListener('preloaderFinished', function () {
        setTimeout(function() {
            heroTl.play();
        }, 200); // 200ms delay for visual smoothness
    });

    /* ------------------------------------------
       Section Title Animations
    ------------------------------------------ */
    if (typeof ScrollTrigger !== 'undefined') {

        gsap.utils.toArray('.section-title').forEach(function (title) {
            gsap.from(title, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        gsap.utils.toArray('.section-subtitle').forEach(function (subtitle) {
            gsap.from(subtitle, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: subtitle,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        gsap.utils.toArray('.section-divider').forEach(function (divider) {
            gsap.from(divider, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: divider,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        /* ------------------------------------------
           Skill Cards Animation
        ------------------------------------------ */
        gsap.utils.toArray('.skill-card').forEach(function (card, index) {
            gsap.from(card, {
                y: 40,
                opacity: 0,
                scale: 0.8,
                duration: 0.6,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        /* ------------------------------------------
           Timeline Items Animation
        ------------------------------------------ */
        gsap.utils.toArray('.timeline-item').forEach(function (item) {
            gsap.from(item, {
                x: -50,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        /* ------------------------------------------
           Project Cards Animation
        ------------------------------------------ */
        gsap.utils.toArray('.project-card').forEach(function (card, index) {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.7,
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        /* ------------------------------------------
           Service Cards Animation
        ------------------------------------------ */
        gsap.utils.toArray('.service-card').forEach(function (card, index) {
            gsap.from(card, {
                y: 40,
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                delay: index * 0.12,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        /* ------------------------------------------
           Stat Boxes Animation
        ------------------------------------------ */
        gsap.utils.toArray('.stat-box').forEach(function (box, index) {
            gsap.from(box, {
                y: 30,
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: box,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        /* ------------------------------------------
           Contact Section Animation
        ------------------------------------------ */
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            gsap.from(contactForm, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: contactForm,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }

        gsap.utils.toArray('.contact-info-card').forEach(function (card, index) {
            gsap.from(card, {
                x: -30,
                opacity: 0,
                duration: 0.6,
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        /* ------------------------------------------
           Parallax Effects for Blobs
        ------------------------------------------ */
        gsap.utils.toArray('.blob').forEach(function (blob, index) {
            var direction = index % 2 === 0 ? -80 : 80;
            gsap.to(blob, {
                y: direction,
                ease: 'none',
                scrollTrigger: {
                    trigger: blob.closest('section') || blob.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });

    } // end ScrollTrigger check

    /* ------------------------------------------
       Vanilla Tilt Initialization
    ------------------------------------------ */
    if (typeof VanillaTilt !== 'undefined') {
        var tiltElements = document.querySelectorAll('[data-tilt]');
        if (tiltElements.length > 0) {
            VanillaTilt.init(tiltElements, {
                max: 5,
                speed: 400,
                glare: true,
                'max-glare': 0.2,
                scale: 1.02
            });
        }
    } else {
        console.warn('VanillaTilt not loaded — skipping tilt effects.');
    }
}

// Initialize all animations on DOM ready
document.addEventListener('DOMContentLoaded', initAnimations);
