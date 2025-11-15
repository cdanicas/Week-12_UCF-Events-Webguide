/**
 * Animation Controllers
 * Manages page animations and effects
 */

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }

        // Add button click animations
        this.initButtonAnimations();

        // Add scroll-based effects
        this.initScrollEffects();
    }

    initButtonAnimations() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn, .tab-button, button')) {
                e.target.classList.add('btn-click');
                setTimeout(() => {
                    e.target.classList.remove('btn-click');
                }, 300);
            }
        });
    }

    initScrollEffects() {
        // Add scroll indicator for sticky navigation
        let lastScroll = 0;
        const nav = document.querySelector('.tab-navigation');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                nav.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }

    // Utility method to animate element entrance
    static animateIn(element, animationClass = 'fade-in-up') {
        element.classList.add(animationClass);
    }

    // Utility method to animate element exit
    static animateOut(element, animationClass = 'fade-out') {
        return new Promise((resolve) => {
            element.classList.add(animationClass);
            setTimeout(() => {
                element.classList.remove(animationClass);
                resolve();
            }, 300);
        });
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});
