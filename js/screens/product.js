/**
 * Product Detail Screen
 */

window.ProductScreen = {
    render: (id) => {
        // In a real app, fetch based on id. We use mock data for now.
        const product = {
            id: id || 101,
            name: "Emerald Cut Diamond Ring with Platinum Band",
            brand: "Tiffany & Co.",
            price: 2500,
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
            description: "A stunning piece from our latest collection, featuring an ethically sourced center diamond surrounded by a brilliant halo of smaller stones.",
            rating: 4.8,
            reviews: 124
        };

        const topBar = `
            <div style="position: absolute; top: var(--space-lg); left: 0; right: 0; display: flex; justify-content: space-between; z-index: 10; padding: 0 var(--space-lg); max-width: var(--max-width); margin: 0 auto; width: 100%;">
                <button class="icon-btn" style="background: rgba(255,255,255,0.8); backdrop-filter: blur(4px);" onclick="window.history.back()">
                    <i data-lucide="arrow-left"></i>
                </button>
                <button class="icon-btn" style="background: rgba(255,255,255,0.8); backdrop-filter: blur(4px);" onclick="Components.toggleWishlist(event, this, ${product.id})">
                    <i data-lucide="heart" class="heart-icon"></i>
                </button>
            </div>
        `;

        const imageHero = `
            <div style="height: 60vh; max-height: 600px; position: relative; max-width: 800px; margin: 0 auto; border-radius: 0 0 24px 24px; overflow: hidden;">
                ${topBar}
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
                <div style="position: absolute; bottom: var(--space-md); right: var(--space-md); background: rgba(0,0,0,0.4); color: white; padding: 4px 12px; border-radius: 99px; font-size: 11px; backdrop-filter: blur(4px);">1/4</div>
            </div>
        `;

        const infoSection = `
            <div style="padding: var(--space-xl) var(--space-lg); background: white; margin-top: -24px; border-radius: 24px 24px 0 0; position: relative; z-index: 5; max-width: 800px; margin-left: auto; margin-right: auto; box-shadow: 0 -10px 30px rgba(0,0,0,0.05);">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-sm);">
                    <div>
                        <span style="font-size: 11px; color: var(--color-text-muted); text-transform: uppercase;">${product.brand}</span>
                        <h1 style="font-size: 22px; margin-top: 4px; line-height: 1.3;">${product.name}</h1>
                    </div>
                </div>

                <div style="display: flex; gap: var(--space-sm); align-items: center; margin-bottom: var(--space-lg);">
                    <div style="display: flex; gap: 2px; color: #FFB800;">
                        <i data-lucide="star" fill="currentColor" style="width: 14px; height: 14px;"></i>
                        <i data-lucide="star" fill="currentColor" style="width: 14px; height: 14px;"></i>
                        <i data-lucide="star" fill="currentColor" style="width: 14px; height: 14px;"></i>
                        <i data-lucide="star" fill="currentColor" style="width: 14px; height: 14px;"></i>
                        <i data-lucide="star-half" fill="currentColor" style="width: 14px; height: 14px;"></i>
                    </div>
                    <span style="font-size: 12px; color: var(--color-text-muted);">(${product.reviews} reviews)</span>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl); padding-bottom: var(--space-md); border-bottom: 1px solid var(--color-divider);">
                    <div style="font-family: var(--font-heading); font-size: 28px; font-weight: 600; color: var(--color-accent);">
                        $${product.price.toLocaleString()}
                    </div>
                    
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <button class="icon-btn" style="border: 1px solid var(--color-divider); width: 32px; height: 32px;"><i data-lucide="minus" style="width:14px;height:14px;"></i></button>
                        <span style="font-weight: 600;">1</span>
                        <button class="icon-btn" style="border: 1px solid var(--color-divider); width: 32px; height: 32px;"><i data-lucide="plus" style="width:14px;height:14px;"></i></button>
                    </div>
                </div>

                <div style="margin-bottom: var(--space-xl);">
                    <h3 style="font-size: 14px; font-family: var(--font-body); margin-bottom: var(--space-md);">Select Material</h3>
                    <div style="display: flex; gap: var(--space-md);">
                        <button style="width: 40px; height: 40px; border-radius: 50%; background: #E6C280; border: 2px solid var(--color-primary);"></button>
                        <button style="width: 40px; height: 40px; border-radius: 50%; background: #E0E0E0; border: 1px solid transparent;"></button>
                        <button style="width: 40px; height: 40px; border-radius: 50%; background: #B76E79; border: 1px solid transparent;"></button>
                    </div>
                </div>

                <div style="margin-bottom: var(--space-xxl);">
                    <h3 style="font-size: 14px; font-family: var(--font-body); margin-bottom: 8px;">Description</h3>
                    <p style="font-size: 14px; color: var(--color-text-muted); line-height: 1.6;">${product.description}</p>
                </div>

            </div>
        `;

        const bottomBar = `
            <div style="position: fixed; bottom: 0; left: 0; right: 0; background: white; padding: var(--space-md) var(--space-lg); padding-bottom: calc(var(--space-md) + env(safe-area-inset-bottom)); border-top: 1px solid var(--color-divider); z-index: 100;">
                <div style="display: flex; gap: var(--space-md); max-width: 800px; margin: 0 auto;">
                    <button class="btn btn-outline" style="flex: 1;" onclick="app.navigate('cart')">
                        <i data-lucide="shopping-bag" style="margin-right: 8px;"></i> View Cart
                    </button>
                    <button class="btn btn-primary" style="flex: 2;" onclick="window.ProductScreen.addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')">
                        ADD TO BAG
                    </button>
                </div>
            </div>
        `;

        return `
            <div class="fade-in" style="padding-bottom: 100px;">
                ${imageHero}
                ${infoSection}
                ${bottomBar}
            </div>
        `;
    },

    addToCart: (id, name, price, image) => {
        app.state.cart.push({ id, name, price, image });
        app.saveState();
        app.updateCartBadge();

        if (app.showToast) {
            app.showToast("Added to Bag");
        }
    }
};
