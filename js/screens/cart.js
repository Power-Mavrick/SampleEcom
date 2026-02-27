/**
 * Shopping Cart Screen
 */

window.CartScreen = {
    render: () => {
        const cartItems = app.state.cart;
        const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
        const shipping = subtotal > 0 ? 25 : 0;
        const total = subtotal + shipping;

        const headerSection = `
            <div style="display: flex; align-items: center; padding: var(--space-lg); border-bottom: 1px solid var(--color-divider);">
                <button class="icon-btn" onclick="window.history.back()">
                    <i data-lucide="arrow-left"></i>
                </button>
                <h1 style="font-size: 18px; font-family: var(--font-body); margin-left: var(--space-md);">My Bag</h1>
            </div>
        `;

        let listSection;

        if (cartItems.length === 0) {
            listSection = `
                <div style="padding: var(--space-xxl) var(--space-lg); text-align: center; max-width: var(--content-max-width); margin: 0 auto; width: 100%;">
                    <i data-lucide="shopping-bag" style="width: 64px; height: 64px; color: var(--color-divider); margin: 0 auto 16px;"></i>
                    <h2 style="font-size: 18px; margin-bottom: 8px;">Your bag is empty</h2>
                    <p style="color: var(--color-text-muted); font-size: 14px; margin-bottom: var(--space-xl);">Looks like you haven't added anything to your cart yet.</p>
                    <button class="btn btn-primary" onclick="app.navigate('home')">CONTINUE SHOPPING</button>
                </div>
            `;
        } else {
            listSection = `
                <div style="padding: var(--space-lg); max-width: 800px; margin: 0 auto; width: 100%;">
                    ${cartItems.map((item, index) => `
                        <div style="display: flex; gap: var(--space-md); margin-bottom: var(--space-lg); border-bottom: 1px solid var(--color-divider); padding-bottom: var(--space-md);">
                            <div style="width: 80px; height: 80px; background: var(--color-surface); border-radius: var(--radius-sm); overflow: hidden; flex-shrink: 0;">
                                <img src="${item.image || 'https://images.unsplash.com/photo-1599643478514-4a11018599c1?auto=format&fit=crop&w=200&q=80'}" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                            <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                    <div>
                                        <h3 style="font-size: 14px; font-weight: 500; font-family: var(--font-body);">${item.name}</h3>
                                        <span style="font-size: 12px; color: var(--color-text-muted);">Qty: 1</span>
                                    </div>
                                    <button class="icon-btn" style="width: 24px; height: 24px; color: var(--color-text-muted);" onclick="window.CartScreen.removeItem(${index})">
                                        <i data-lucide="x" style="width: 16px; height: 16px;"></i>
                                    </button>
                                </div>
                                <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 600; color: var(--color-accent);">
                                    $${item.price.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        const summarySection = cartItems.length > 0 ? `
            <div style="padding: var(--space-lg); background: var(--color-surface); border-top-left-radius: 24px; border-top-right-radius: 24px; margin-top: auto; width: 100%; box-shadow: 0 -10px 30px rgba(0,0,0,0.05);">
                <div style="max-width: 800px; margin: 0 auto;">
                    <h3 style="font-family: var(--font-body); font-size: 16px; margin-bottom: var(--space-md);">Order Summary</h3>
                    
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; color: var(--color-text-muted);">
                        <span>Subtotal</span>
                        <span>$${subtotal.toLocaleString()}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 14px; color: var(--color-text-muted);">
                        <span>Shipping</span>
                        <span>$${shipping.toLocaleString()}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl); border-top: 1px solid var(--color-divider); padding-top: 16px;">
                        <span style="font-weight: 600;">Total</span>
                        <span style="font-family: var(--font-heading); font-size: 24px; font-weight: 600; color: var(--color-primary);">$${total.toLocaleString()}</span>
                    </div>
                    <button class="btn btn-primary btn-block" style="width: 100%; border-radius: 99px; padding: 14px; font-size: 15px;" onclick="app.navigate('checkout')">PROCEED TO CHECKOUT</button>
                </div>
            </div>
        ` : '';

        return `
            <div class="fade-in" style="display: flex; flex-direction: column; min-height: calc(100vh - var(--header-height));">
                ${headerSection}
                ${listSection}
                ${summarySection}
            </div>
        `;
    },

    removeItem: (index) => {
        app.state.cart.splice(index, 1);
        app.saveState();
        app.updateCartBadge();
        app.navigate('cart', false); // re-render cart without pushing state
    }
};
