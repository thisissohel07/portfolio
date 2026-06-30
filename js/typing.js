/* ============================================
   Typed.js Configuration
   Animated typing effect for hero section roles
   ============================================ */

function initTyping() {
    if (typeof Typed === 'undefined') {
        console.warn('Typed.js not loaded — skipping typing initialization.');
        return;
    }

    const typedElement = document.getElementById('typed-output');
    if (!typedElement) {
        console.warn('#typed-output element not found — skipping typing initialization.');
        return;
    }

    new Typed('#typed-output', {
        strings: [
            'Python Developer',
            'AI Engineer',
            'Machine Learning Student',
            'Web Developer',
            'Software Developer',
            'Open Source Learner'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initTyping);
