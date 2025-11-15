/**
 * Main Application Entry Point
 * Initializes the UCF Event Planning Guide
 */

class App {
    constructor() {
        this.init();
    }

    init() {
        console.log('UCF Event Planning Guide - Initializing...');

        // Check for required dependencies
        this.checkDependencies();

        // Set up global error handler
        this.setupErrorHandling();

        // Initialize service worker for offline support (future enhancement)
        // this.initServiceWorker();

        console.log('UCF Event Planning Guide - Ready!');
    }

    checkDependencies() {
        const required = ['AOS', 'Chart', 'XLSX'];
        const missing = [];

        required.forEach(dep => {
            if (typeof window[dep] === 'undefined') {
                missing.push(dep);
            }
        });

        if (missing.length > 0) {
            console.warn('Missing dependencies:', missing.join(', '));
        }
    }

    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Application error:', event.error);
            // Could send to analytics or error tracking service
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }

    async initServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered');
            } catch (error) {
                console.log('Service Worker registration failed:', error);
            }
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
