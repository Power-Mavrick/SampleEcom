/**
 * Category / Product Listing Screen
 */

window.CategoryScreen = {
    render: (params) => {
        // params could be a specific category ID, e.g., 'rings'. If null, show 'All'.
        const currentCategory = params || 'All';

        const categories = ['All', 'Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Watches'];

        // Use dummy products from global scope (from home.js) or generate more for realistic testing.
        // In a real app, this would be fetched from an API.
        const allProducts = typeof DUMMY_PRODUCTS !== 'undefined' ? DUMMY_PRODUCTS : [];

        // Mock filtering (in reality, filter by category)
        const displayProducts = currentCategory === 'All'
            ? allProducts
            : allProducts; // Add logic if dummy products get categories mapped

        // 1. Header Area with dynamic Title & Sort/Filter Buttons
        const headerSection = `
            <div style="padding: var(--space-xl) var(--space-lg) var(--space-md); text-align: center;">
                <h1 style="font-family: var(--font-heading); font-size: 28px; margin-bottom: var(--space-sm);">${currentCategory}</h1>
                <p style="color: var(--color-text-muted); font-size: 14px;">${displayProducts.length} items</p>
                
                <div style="display: flex; justify-content: center; gap: var(--space-md); margin-top: var(--space-lg);">
                    <button class="btn btn-outline" style="border-radius: 99px; padding: 8px 16px; font-size: 13px;" onclick="window.CategoryScreen.toggleFilterModal()">
                        <i data-lucide="sliders-horizontal" style="width: 14px; height: 14px; margin-right: 6px;"></i> Filter
                    </button>
                    <button class="btn btn-outline" style="border-radius: 99px; padding: 8px 16px; font-size: 13px;" onclick="window.CategoryScreen.toggleSortModal()">
                        <i data-lucide="arrow-up-down" style="width: 14px; height: 14px; margin-right: 6px;"></i> Sort
                    </button>
                </div>
            </div>
        `;

        // 2. Category Scroller (reusable from home, but highlighted)
        const categoryScroller = `
            <div class="chip-scroller" style="margin-bottom: var(--space-xl);">
                ${categories.map(cat => `
                    <div class="chip ${cat.toLowerCase() === currentCategory.toLowerCase() ? 'active' : ''}" 
                         onclick="app.navigate('category/${cat.toLowerCase()}')">
                        ${cat}
                    </div>
                `).join('')}
            </div>
        `;

        // 3. Main Product Grid
        const productGrid = `
            <div class="product-grid fade-in" style="padding-bottom: calc(var(--nav-height) + var(--space-xl));">
                ${displayProducts.map(p => Components.ProductCard(p)).join('')}
            </div>
        `;

        // 4. Modals (Hidden by default, injected into DOM)
        // We'll append these to the body or manage them in app.js ideally, but for simplicity here's inline overlays
        const modals = `
            <!-- Filter Modal -->
            <div id="filter-modal" class="drawer-backdrop" onclick="window.CategoryScreen.toggleFilterModal()">
                <div class="drawer" style="width: 100%; top: auto; bottom: 0; transform: translateY(100%); border-radius: 24px 24px 0 0; height: 70vh;" onclick="event.stopPropagation()">
                    <div style="padding: var(--space-lg); border-bottom: 1px solid var(--color-divider); display: flex; justify-content: space-between; align-items: center;">
                        <h3 style="font-family: var(--font-heading); font-size: 18px;">Filters</h3>
                        <button class="icon-btn" onclick="window.CategoryScreen.toggleFilterModal()">
                            <i data-lucide="x"></i>
                        </button>
                    </div>
                    <div style="padding: var(--space-lg); overflow-y: auto; flex: 1;">
                        <div style="margin-bottom: var(--space-xl);">
                            <h4 style="font-size: 14px; margin-bottom: var(--space-md);">Material</h4>
                            <div style="display: flex; flex-wrap: wrap; gap: var(--space-sm);">
                                <div class="chip">Gold</div>
                                <div class="chip">Silver</div>
                                <div class="chip">Platinum</div>
                                <div class="chip">Rose Gold</div>
                            </div>
                        </div>
                        <div style="margin-bottom: var(--space-xl);">
                            <h4 style="font-size: 14px; margin-bottom: var(--space-md);">Gemstone</h4>
                            <div style="display: flex; flex-wrap: wrap; gap: var(--space-sm);">
                                <div class="chip">Diamond</div>
                                <div class="chip">Sapphire</div>
                                <div class="chip">Ruby</div>
                                <div class="chip">Emerald</div>
                                <div class="chip">Pearl</div>
                            </div>
                        </div>
                    </div>
                    <div style="padding: var(--space-lg); border-top: 1px solid var(--color-divider); background: var(--color-surface); z-index: 10;">
                        <div style="display: flex; gap: var(--space-md);">
                            <button class="btn btn-outline" style="flex: 1;" onclick="window.CategoryScreen.toggleFilterModal()">CLEAR ALL</button>
                            <button class="btn btn-primary" style="flex: 1;" onclick="window.CategoryScreen.toggleFilterModal()">APPLY</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sort Modal -->
            <div id="sort-modal" class="drawer-backdrop" onclick="window.CategoryScreen.toggleSortModal()">
                <div class="drawer" style="width: 100%; top: auto; bottom: 0; transform: translateY(100%); border-radius: 24px 24px 0 0; height: auto; max-height: 50vh;" onclick="event.stopPropagation()">
                    <div style="padding: var(--space-lg); border-bottom: 1px solid var(--color-divider); display: flex; justify-content: space-between; align-items: center;">
                        <h3 style="font-family: var(--font-heading); font-size: 18px;">Sort By</h3>
                        <button class="icon-btn" onclick="window.CategoryScreen.toggleSortModal()">
                            <i data-lucide="x"></i>
                        </button>
                    </div>
                    <div style="padding: var(--space-md) 0;">
                        <div class="sort-option" style="padding: var(--space-md) var(--space-lg); cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                            <span>Featured</span>
                            <i data-lucide="check" style="color: var(--color-primary); width: 18px;"></i>
                        </div>
                        <div class="sort-option" style="padding: var(--space-md) var(--space-lg); cursor: pointer;">Newest Arrivals</div>
                        <div class="sort-option" style="padding: var(--space-md) var(--space-lg); cursor: pointer;">Price: Low to High</div>
                        <div class="sort-option" style="padding: var(--space-md) var(--space-lg); cursor: pointer;">Price: High to Low</div>
                    </div>
                </div>
            </div>
        `;

        return `
            <div class="fade-in">
                ${headerSection}
                ${categoryScroller}
                ${productGrid}
                ${modals}
            </div>
        `;
    },

    toggleFilterModal: () => {
        const modal = document.getElementById('filter-modal');
        const drawer = modal.querySelector('.drawer');

        if (modal.classList.contains('active')) {
            drawer.style.transform = 'translateY(100%)';
            setTimeout(() => {
                modal.classList.remove('active');
            }, 300); // Wait for drawer slide out
            document.body.style.overflow = '';
        } else {
            modal.classList.add('active');
            // Slight delay to ensure display block is processed before transform
            requestAnimationFrame(() => {
                drawer.style.transform = 'translateY(0)';
            });
            document.body.style.overflow = 'hidden';
        }
    },

    toggleSortModal: () => {
        const modal = document.getElementById('sort-modal');
        const drawer = modal.querySelector('.drawer');

        if (modal.classList.contains('active')) {
            drawer.style.transform = 'translateY(100%)';
            setTimeout(() => {
                modal.classList.remove('active');
            }, 300);
            document.body.style.overflow = '';
        } else {
            modal.classList.add('active');
            requestAnimationFrame(() => {
                drawer.style.transform = 'translateY(0)';
            });
            document.body.style.overflow = 'hidden';
        }
    }
};
