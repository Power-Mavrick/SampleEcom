/**
 * Core Application Router and State Manager
 */

const App = {
    state: {
        cart: [],
        wishlist: [],
        user: null, // Mock auth state
        pastOrders: [],
        addresses: []
    },

    // Load state from browser local storage
    loadState() {
        try {
            const savedState = localStorage.getItem('spirit_app_state');
            if (savedState) {
                const parsed = JSON.parse(savedState);
                this.state.cart = parsed.cart || [];
                this.state.wishlist = parsed.wishlist || [];
                this.state.user = parsed.user || null;
                this.state.pastOrders = parsed.pastOrders || [];
                this.state.addresses = parsed.addresses || [];
            }
        } catch (e) {
            console.error('Failed to load local state', e);
        }
    },

    // Save state to browser local storage
    saveState() {
        try {
            localStorage.setItem('spirit_app_state', JSON.stringify(this.state));
            this.updateCartBadge();
        } catch (e) {
            console.error('Failed to save state', e);
        }
    },

    // Global Toast Notification
    showToast(message) {
        // Remove existing toast if any
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400); // Wait for transition
        }, 3000);
    },

    routes: {},

    init() {
        // Register screens (globally available from other scripts)
        this.routes = {
            'home': window.HomeScreen,
            'category': window.CategoryScreen,
            'blogs': () => `<div class="p-4 mt-20 text-center"><h2 class="font-heading">Blogs</h2><p class="text-muted">Coming Soon</p></div>`,
            'profile': window.ProfileScreen,
            'register': () => window.ProfileScreen.renderRegister(),
            'product': window.ProductScreen,
            'cart': window.CartScreen,
            'checkout': window.CheckoutScreen,
            'order-success': window.OrderSuccessScreen,
            'address': window.AddressScreen,
            'blogs': window.DiscoverScreen,
            'info': window.InfoScreen
        };

        // Initialize icons
        lucide.createIcons();

        // Handle browser back button
        window.addEventListener('popstate', (e) => {
            const path = window.location.hash.replace('#', '') || 'home';
            this.navigate(path, false);
        });

        // Load saved state
        this.loadState();

        // Load initial route
        const initialPath = window.location.hash.replace('#', '') || 'home';
        this.navigate(initialPath, false);
        this.updateCartBadge();

        // Handle Splash Screen dismissal
        setTimeout(() => {
            const splash = document.getElementById('splash-screen');
            if (splash) {
                splash.style.opacity = '0';
                splash.style.visibility = 'hidden';
                setTimeout(() => splash.remove(), 500);
            }
        }, 1500); // 1.5 seconds loading simulation
    },

    navigate(path, pushState = true) {
        let route = path;
        let params = null;

        // Handle parameterized routes (e.g. product/1)
        if (path.includes('/')) {
            const parts = path.split('/');
            route = parts[0];
            params = parts[1];
        }

        const screenFn = this.routes[route];
        const contentArea = document.getElementById('app-content');

        if (screenFn) {
            // Unmount current (simple cleanup)
            contentArea.innerHTML = '';

            // Render new screen
            contentArea.innerHTML = typeof screenFn === 'function' ? screenFn(params) : screenFn.render(params);

            // Re-initialize icons for new content
            lucide.createIcons();

            // Run mounted hook if it exists
            if (screenFn.afterRender) {
                setTimeout(() => screenFn.afterRender(params), 0);
            }

            // Update URL
            if (pushState) {
                window.history.pushState(null, '', `#${path}`);
            }

            // Scroll to top
            contentArea.scrollTo(0, 0);

            // Update Active Nav Item
            this.updateBottomNav(route);

            // Handle UI Visibility (hide bottom nav on product detail/cart)
            this.toggleUIElements(route);
        } else {
            console.error(`Route not found: ${route}`);
            this.navigate('home');
        }
    },

    updateBottomNav(route) {
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
            if (el.dataset.target === route) {
                el.classList.add('active');
            }
        });
    },

    toggleUIElements(route) {
        const bottomNav = document.getElementById('bottom-nav');
        const header = document.getElementById('main-header');

        // Hide bottom nav on inner pages
        if (['product', 'cart', 'checkout', 'register', 'address', 'info'].includes(route) || (route === 'profile' && !this.state.user)) {
            bottomNav.style.transform = 'translateY(100%)';
            bottomNav.style.transition = 'transform 0.3s ease';
        } else {
            bottomNav.style.transform = 'translateY(0)';
        }
    },

    updateCartBadge() {
        const badge = document.getElementById('cart-count');
        badge.textContent = this.state.cart.length;
        badge.style.display = this.state.cart.length > 0 ? 'flex' : 'none';
    },

    toggleDrawer() {
        const drawer = document.getElementById('left-drawer');
        const backdrop = document.getElementById('drawer-backdrop');

        drawer.classList.toggle('active');
        backdrop.classList.toggle('active');

        // Prevent body scroll when drawer is open
        if (drawer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
};

// Expose app to global scope
window.app = App;

// Start app when DOM lies
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
