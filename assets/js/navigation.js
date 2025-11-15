/**
 * Tab Navigation System
 * Handles switching between the 9 module tabs
 */

class TabNavigation {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabContent = document.getElementById('tab-content');
        this.currentTab = 'conflict-management';
        this.init();
    }

    init() {
        // Add click event listeners to all tab buttons
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabName = button.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Load initial tab
        this.loadTab(this.currentTab);
    }

    switchTab(tabName) {
        if (tabName === this.currentTab) return;

        // Update active state
        this.tabButtons.forEach(button => {
            const isActive = button.dataset.tab === tabName;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive);
        });

        // Load new tab content with animation
        this.tabContent.classList.add('fade-out');

        setTimeout(() => {
            this.loadTab(tabName);
            this.currentTab = tabName;
            this.tabContent.classList.remove('fade-out');
            this.tabContent.classList.add('fade-in-up');

            // Scroll to top of content
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    }

    async loadTab(tabName) {
        try {
            const response = await fetch(`modules/${tabName}.html`);

            if (!response.ok) {
                throw new Error(`Failed to load ${tabName}`);
            }

            const html = await response.text();
            this.tabContent.innerHTML = html;

            // Re-initialize any module-specific JavaScript
            this.initModuleScripts(tabName);

            // Trigger AOS animations
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        } catch (error) {
            console.error('Error loading tab:', error);
            this.tabContent.innerHTML = `
                <div class="alert alert-error">
                    <h3>Error Loading Content</h3>
                    <p>Unable to load the ${tabName} module. Please try again.</p>
                </div>
            `;
        }
    }

    initModuleScripts(tabName) {
        // Initialize specific functionality based on the loaded module
        switch (tabName) {
            case 'budgeting':
                if (typeof BudgetCalculator !== 'undefined') {
                    new BudgetCalculator();
                }
                break;
            case 'catering':
                if (typeof CateringBuilder !== 'undefined') {
                    new CateringBuilder();
                }
                break;
            // Add more module initializations as needed
        }
    }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.tabNavigation = new TabNavigation();
});
