/**
 * Checkout & Order Success Screens
 */

window.CheckoutScreen = {
    state: {
        step: 1 // 1: Shipping, 2: Payment, 3: Review
    },

    render: () => {
        const { step } = window.CheckoutScreen.state;
        const total = app.state.cart.reduce((sum, item) => sum + item.price, 0);

        const header = `
            <div style="padding: var(--space-xl) var(--space-lg) var(--space-md); border-bottom: 1px solid var(--color-divider); background: white; position: sticky; top: 0; z-index: 10;">
                <div style="display: flex; align-items: center; gap: var(--space-md);">
                    <button class="icon-btn" onclick="${step > 1 ? 'window.CheckoutScreen.setStep(' + (step - 1) + ')' : 'window.history.back()'}">
                        <i data-lucide="arrow-left"></i>
                    </button>
                    <h1 style="font-family: var(--font-heading); font-size: 20px; margin: 0;">Checkout</h1>
                </div>
                
                <!-- Progress Indicator -->
                <div style="display: flex; gap: var(--space-sm); margin-top: var(--space-lg);">
                    <div style="height: 4px; flex: 1; border-radius: 2px; background: ${step >= 1 ? 'var(--color-primary)' : 'var(--color-divider)'};"></div>
                    <div style="height: 4px; flex: 1; border-radius: 2px; background: ${step >= 2 ? 'var(--color-primary)' : 'var(--color-divider)'};"></div>
                    <div style="height: 4px; flex: 1; border-radius: 2px; background: ${step >= 3 ? 'var(--color-primary)' : 'var(--color-divider)'};"></div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 11px; color: var(--color-text-muted); text-transform: uppercase; font-weight: 500;">
                    <span style="${step >= 1 ? 'color: var(--color-text);' : ''}">Shipping</span>
                    <span style="${step >= 2 ? 'color: var(--color-text);' : ''}">Payment</span>
                    <span style="${step >= 3 ? 'color: var(--color-text);' : ''}">Review</span>
                </div>
            </div>
        `;

        let content = '';

        if (step === 1) {
            content = `
                <div class="fade-in" style="padding: var(--space-lg); max-width: 600px; margin: 0 auto;">
                    <h2 style="font-family: var(--font-heading); font-size: 24px; margin-bottom: var(--space-lg);">Shipping Details</h2>
                    
                    <div style="display: flex; flex-direction: column; gap: var(--space-md); margin-bottom: var(--space-xl);">
                        <div>
                            <label style="font-size: 12px; font-weight: 500; margin-bottom: 4px; display: block;">Full Name</label>
                            <input type="text" placeholder="Jane Doe" style="width: 100%; padding: 14px; border: 1px solid var(--color-divider); border-radius: var(--radius-sm); font-size: 15px; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--color-primary)'" onblur="this.style.borderColor='var(--color-divider)'">
                        </div>
                        <div>
                            <label style="font-size: 12px; font-weight: 500; margin-bottom: 4px; display: block;">Street Address</label>
                            <input type="text" placeholder="123 Luxury Lane" style="width: 100%; padding: 14px; border: 1px solid var(--color-divider); border-radius: var(--radius-sm); font-size: 15px; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--color-primary)'" onblur="this.style.borderColor='var(--color-divider)'">
                        </div>
                        <div style="display: flex; gap: var(--space-md);">
                            <div style="flex: 1;">
                                <label style="font-size: 12px; font-weight: 500; margin-bottom: 4px; display: block;">City</label>
                                <input type="text" placeholder="New York" style="width: 100%; padding: 14px; border: 1px solid var(--color-divider); border-radius: var(--radius-sm); font-size: 15px; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--color-primary)'" onblur="this.style.borderColor='var(--color-divider)'">
                            </div>
                            <div style="flex: 1;">
                                <label style="font-size: 12px; font-weight: 500; margin-bottom: 4px; display: block;">Zip Code</label>
                                <input type="text" placeholder="10001" style="width: 100%; padding: 14px; border: 1px solid var(--color-divider); border-radius: var(--radius-sm); font-size: 15px; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--color-primary)'" onblur="this.style.borderColor='var(--color-divider)'">
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-primary" style="width: 100%;" onclick="window.CheckoutScreen.setStep(2)">Continue to Payment</button>
                </div>
            `;
        } else if (step === 2) {
            content = `
                <div class="fade-in" style="padding: var(--space-lg); max-width: 600px; margin: 0 auto;">
                    <h2 style="font-family: var(--font-heading); font-size: 24px; margin-bottom: var(--space-lg);">Payment Method</h2>
                    
                    <div style="border: 1px solid var(--color-primary); border-radius: var(--radius-md); padding: var(--space-md); margin-bottom: var(--space-lg); background: rgba(247, 102, 49, 0.05); display: flex; align-items: center; gap: var(--space-sm);">
                        <i data-lucide="credit-card" style="color: var(--color-primary);"></i>
                        <span style="font-weight: 500;">Credit Card</span>
                        <div style="margin-left: auto; width: 18px; height: 18px; border-radius: 50%; border: 5px solid var(--color-primary);"></div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: var(--space-md); margin-bottom: var(--space-xl);">
                        <div>
                            <label style="font-size: 12px; font-weight: 500; margin-bottom: 4px; display: block;">Card Number</label>
                            <input type="text" placeholder="0000 0000 0000 0000" style="width: 100%; padding: 14px; border: 1px solid var(--color-divider); border-radius: var(--radius-sm); font-size: 15px; font-family: monospace; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--color-primary)'" onblur="this.style.borderColor='var(--color-divider)'">
                        </div>
                        <div style="display: flex; gap: var(--space-md);">
                            <div style="flex: 1;">
                                <label style="font-size: 12px; font-weight: 500; margin-bottom: 4px; display: block;">Expiry Date</label>
                                <input type="text" placeholder="MM/YY" style="width: 100%; padding: 14px; border: 1px solid var(--color-divider); border-radius: var(--radius-sm); font-size: 15px; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--color-primary)'" onblur="this.style.borderColor='var(--color-divider)'">
                            </div>
                            <div style="flex: 1;">
                                <label style="font-size: 12px; font-weight: 500; margin-bottom: 4px; display: block;">CVC</label>
                                <input type="text" placeholder="123" style="width: 100%; padding: 14px; border: 1px solid var(--color-divider); border-radius: var(--radius-sm); font-size: 15px; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--color-primary)'" onblur="this.style.borderColor='var(--color-divider)'">
                            </div>
                        </div>
                        <div>
                            <label style="font-size: 12px; font-weight: 500; margin-bottom: 4px; display: block;">Name on Card</label>
                            <input type="text" placeholder="JANE DOE" style="width: 100%; padding: 14px; border: 1px solid var(--color-divider); border-radius: var(--radius-sm); font-size: 15px; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--color-primary)'" onblur="this.style.borderColor='var(--color-divider)'">
                        </div>
                    </div>

                    <button class="btn btn-primary" style="width: 100%;" onclick="window.CheckoutScreen.setStep(3)">Review Order</button>
                </div>
            `;
        } else if (step === 3) {
            content = `
                <div class="fade-in" style="padding: var(--space-lg); max-width: 600px; margin: 0 auto; padding-bottom: 120px;">
                    <h2 style="font-family: var(--font-heading); font-size: 24px; margin-bottom: var(--space-lg);">Review Order</h2>
                    
                    <div style="background: var(--color-surface); border-radius: var(--radius-md); padding: var(--space-md); margin-bottom: var(--space-lg);">
                        <h3 style="font-size: 14px; font-family: var(--font-body); margin-bottom: var(--space-sm); color: var(--color-text-muted);">Items</h3>
                        ${app.state.cart.map(item => `
                            <div style="display: flex; gap: var(--space-md); padding: var(--space-sm) 0; border-bottom: 1px solid rgba(0,0,0,0.05);">
                                <img src="${item.image}" style="width: 48px; height: 48px; border-radius: var(--radius-sm); object-fit: cover;">
                                <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                                    <span style="font-weight: 500; font-size: 13px;">${item.name}</span>
                                    <span style="font-size: 12px; color: var(--color-text-muted);">Qty: 1</span>
                                </div>
                                <div style="font-weight: 600; font-size: 14px;">$${item.price.toLocaleString()}</div>
                            </div>
                        `).join('')}
                    </div>

                    <div style="background: var(--color-surface); border-radius: var(--radius-md); padding: var(--space-md); margin-bottom: var(--space-xl);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="color: var(--color-text-muted);">Subtotal</span>
                            <span>$${total.toLocaleString()}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="color: var(--color-text-muted);">Shipping</span>
                            <span>Free</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-top: var(--space-md); padding-top: var(--space-md); border-top: 1px solid rgba(0,0,0,0.05); font-weight: 600; font-size: 18px;">
                            <span>Total</span>
                            <span>$${total.toLocaleString()}</span>
                        </div>
                    </div>

                    <div style="position: fixed; bottom: 0; left: 0; right: 0; background: white; padding: var(--space-md) var(--space-lg); padding-bottom: calc(var(--space-md) + env(safe-area-inset-bottom)); border-top: 1px solid var(--color-divider); z-index: 100;">
                        <button class="btn btn-primary" style="width: 100%; max-width: 600px; margin: 0 auto; display: block;" onclick="window.CheckoutScreen.placeOrder()">
                            <i data-lucide="lock" style="width: 16px; margin-right: 8px;"></i> Place Order $${total.toLocaleString()}
                        </button>
                    </div>
                </div>
            `;
        }

        return `
            <div style="min-height: 100vh; background: white; position: absolute; inset: 0; z-index: 50;">
                ${header}
                ${content}
            </div>
        `;
    },

    setStep: (newStep) => {
        window.CheckoutScreen.state.step = newStep;
        app.render(); // Re-render app to show new checkout step
        window.scrollTo(0, 0);
    },

    placeOrder: () => {
        // Clear cart, save to history, and route to success
        const orderId = Math.floor(Math.random() * 9000000000) + 1000000000;

        app.state.pastOrders.unshift({
            id: orderId,
            date: new Date().toISOString(),
            items: [...app.state.cart],
            total: app.state.cart.reduce((sum, item) => sum + item.price, 0)
        });

        app.state.cart = [];
        app.saveState();
        app.updateCartBadge();

        window.CheckoutScreen.lastOrderId = orderId;
        app.navigate('order-success');
    }
};

window.OrderSuccessScreen = {
    render: () => {
        return `
            <div class="fade-in" style="min-height: 100vh; background: var(--color-bg); position: absolute; inset: 0; z-index: 50; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--space-xl); text-align: center;">
                <div style="width: 80px; height: 80px; border-radius: 50%; background: #E8F5E9; color: #4CAF50; display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-xl);">
                    <i data-lucide="check" style="width: 40px; height: 40px;"></i>
                </div>
                
                <h1 style="font-family: var(--font-heading); font-size: 32px; margin-bottom: var(--space-md);">Order Confirmed</h1>
                <p style="color: var(--color-text-muted); font-size: 15px; margin-bottom: var(--space-xl); line-height: 1.6; max-width: 400px;">
                    Thank you for shopping with Spirit. We have received your order and will begin processing it shortly.
                </p>
                
                <div style="background: white; border: 1px solid var(--color-divider); border-radius: var(--radius-md); padding: var(--space-lg); width: 100%; max-width: 400px; margin-bottom: var(--space-xxl);">
                    <span style="font-size: 12px; color: var(--color-text-muted); text-transform: uppercase; font-weight: 500;">Order Reference Number</span>
                    <h2 style="font-family: var(--font-heading); font-size: 20px; letter-spacing: 1px; margin-top: 8px;">#STR-${window.CheckoutScreen.lastOrderId}</h2>
                </div>
                
                <button class="btn btn-primary" style="width: 100%; max-width: 400px; padding: 16px;" onclick="window.CheckoutScreen.state.step = 1; app.navigate('home')">
                    Continue Shopping
                </button>
            </div>
        `;
    }
};
