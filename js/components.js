/**
 * Reusable UI Components Generator
 */

const Components = {

    // Product Card Component
    ProductCard: (product) => {
        return `
            <div class="product-card" onclick="app.navigate('product/${product.id}')">
                <div class="product-image-wrap">
                    <button class="wishlist-btn" onclick="Components.toggleWishlist(event, this, ${product.id})">
                        <i data-lucide="heart" class="heart-icon"></i>
                    </button>
                    <!-- Using Picsum for demo placeholder images -->
                    <img src="${product.image || `https://picsum.photos/seed/${product.id}/300/400`}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <span class="product-brand">${product.brand || 'Spirit'}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">$${product.price.toLocaleString()}</p>
                </div>
            </div>
        `;
    },

    toggleWishlist(event, btn, id) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        const icon = btn.querySelector('.heart-icon');
        const isFilled = icon.getAttribute('fill') === 'currentColor';

        if (isFilled) {
            icon.setAttribute('fill', 'none');
            icon.classList.remove('active');
            app.state.wishlist = app.state.wishlist.filter(itemId => itemId !== id);
            if (typeof app !== 'undefined' && app.showToast) app.showToast("Removed from Wishlist");
        } else {
            icon.setAttribute('fill', 'currentColor');
            icon.classList.add('active');
            icon.style.color = 'var(--color-error)';
            if (!app.state.wishlist.includes(id)) {
                app.state.wishlist.push(id);
            }
            if (typeof app !== 'undefined' && app.showToast) app.showToast("Added to Wishlist");
        }

        if (typeof app !== 'undefined' && app.saveState) {
            app.saveState();
        }
    },

    SectionHeader: (title, actionText = 'View All', actionRoute = 'category') => {
        return `
            <div style="display: flex; justify-content: space-between; align-items: baseline; padding: var(--space-xl) var(--space-lg) var(--space-md);">
                <h2 style="font-size: 22px;">${title}</h2>
                <button onclick="app.navigate('${actionRoute}')" style="font-size: 13px; color: var(--color-text-muted); font-weight: 500;">
                    ${actionText}
                </button>
            </div>
        `;
    }
};

window.Components = Components;
