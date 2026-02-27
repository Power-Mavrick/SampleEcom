/**
 * Customer Service / Info Screens
 */

window.InfoScreen = {
    render: (pageId = 'about') => {
        // Tab definition
        const tabs = [
            { id: 'about', label: 'About Us' },
            { id: 'shipping', label: 'Shipping' },
            { id: 'returns', label: 'Returns' },
            { id: 'contact', label: 'Contact Us' }
        ];

        // Content lookup
        const content = {
            'about': `
                <h2 style="font-family: var(--font-heading); font-size: 24px; margin-bottom: var(--space-md);">Our Heritage</h2>
                <p style="font-size: 15px; color: var(--color-text-muted); line-height: 1.6; margin-bottom: var(--space-lg);">Founded in 1995, Spirit has been at the forefront of combining traditional craftsmanship with modern design aesthetics. Our master jewellers source the finest materials globally to create timeless pieces that celebrate life's most precious moments.</p>
                <img src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=800" loading="lazy" style="width: 100%; border-radius: var(--radius-md); margin-bottom: var(--space-lg);">
                <h3 style="font-family: var(--font-heading); font-size: 18px; margin-bottom: var(--space-sm);">Ethical Sourcing</h3>
                <p style="font-size: 15px; color: var(--color-text-muted); line-height: 1.6;">We are committed to conflict-free diamonds and sustainable gold mining practices. Every gemstone in our collection is strictly vetted to adhere to the Kimberley Process.</p>
            `,
            'shipping': `
                <h2 style="font-family: var(--font-heading); font-size: 24px; margin-bottom: var(--space-md);">Shipping Information</h2>
                <div style="border: 1px solid var(--color-divider); border-radius: var(--radius-md); padding: var(--space-md); margin-bottom: var(--space-lg);">
                    <h4 style="font-weight: 600; margin-bottom: 4px;">Standard Delivery</h4>
                    <p style="font-size: 14px; color: var(--color-text-muted); margin-bottom: 8px;">3-5 business days.</p>
                    <span style="font-weight: 500; color: var(--color-primary);">Free on all orders.</span>
                </div>
                <div style="border: 1px solid var(--color-divider); border-radius: var(--radius-md); padding: var(--space-md);">
                    <h4 style="font-weight: 600; margin-bottom: 4px;">Express Delivery</h4>
                    <p style="font-size: 14px; color: var(--color-text-muted); margin-bottom: 8px;">Order before 2 PM for next day delivery.</p>
                    <span style="font-weight: 500;">$25.00</span>
                </div>
                <p style="font-size: 14px; color: var(--color-text-muted); line-height: 1.6; margin-top: var(--space-lg);">All our parcels are fully insured during transit and require a signature upon delivery for your security.</p>
            `,
            'returns': `
                <h2 style="font-family: var(--font-heading); font-size: 24px; margin-bottom: var(--space-md);">Return Policy</h2>
                <p style="font-size: 15px; color: var(--color-text-muted); line-height: 1.6; margin-bottom: var(--space-lg);">We offer a complimentary 30-day return policy for all unworn jewellery in its original packaging. Personalized or engraved items are excluded from returns.</p>
                <ol style="padding-left: 20px; font-size: 15px; color: var(--color-text-muted); line-height: 1.8;">
                    <li>Initiate a return utilizing your order number.</li>
                    <li>We will email a pre-paid secure shipping label.</li>
                    <li>Package the item securely with all original certificates.</li>
                    <li>Drop the package at the designated courier facility.</li>
                </ol>
            `,
            'contact': `
                <h2 style="font-family: var(--font-heading); font-size: 24px; margin-bottom: var(--space-md);">Get in Touch</h2>
                <p style="font-size: 15px; color: var(--color-text-muted); line-height: 1.6; margin-bottom: var(--space-lg);">Our concierges are available to assist you with any inquiries, from custom sizing to diamond advice.</p>
                
                <div style="display: flex; flex-direction: column; gap: var(--space-md);">
                    <div style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-md); background: var(--color-surface); border-radius: var(--radius-md);">
                        <i data-lucide="phone" style="color: var(--color-primary);"></i>
                        <div>
                            <div style="font-weight: 500; font-size: 14px;">Call Us</div>
                            <div style="font-size: 13px; color: var(--color-text-muted);">+1 (800) 123-4567</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-md); background: var(--color-surface); border-radius: var(--radius-md);">
                        <i data-lucide="mail" style="color: var(--color-primary);"></i>
                        <div>
                            <div style="font-weight: 500; font-size: 14px;">Email Support</div>
                            <div style="font-size: 13px; color: var(--color-text-muted);">concierge@spiritjewellery.com</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-md); background: var(--color-surface); border-radius: var(--radius-md);">
                        <i data-lucide="map-pin" style="color: var(--color-primary);"></i>
                        <div>
                            <div style="font-weight: 500; font-size: 14px;">Flagship Boutique</div>
                            <div style="font-size: 13px; color: var(--color-text-muted);">5th Ave, New York, NY 10022</div>
                        </div>
                    </div>
                </div>
            `
        };

        const currentContent = content[pageId] || content['about'];

        return `
            <div class="fade-in" style="min-height: 100vh; background: var(--color-bg); padding-bottom: 100px;">
                <div style="padding: var(--space-xl) var(--space-lg) var(--space-md); border-bottom: 1px solid var(--color-divider); background: white; position: sticky; top: 0; z-index: 10;">
                    <div style="display: flex; align-items: center; gap: var(--space-md);">
                        <button class="icon-btn" onclick="window.history.back()">
                            <i data-lucide="arrow-left"></i>
                        </button>
                        <h1 style="font-family: var(--font-heading); font-size: 20px; margin: 0;">Customer Care</h1>
                    </div>
                    
                    <!-- Scrollable Tabs -->
                    <div style="display: flex; gap: var(--space-lg); overflow-x: auto; margin-top: var(--space-lg); scrollbar-width: none;">
                        ${tabs.map(t => `
                            <button onclick="app.navigate('info/${t.id}', false)" style="background: none; border: none; padding-bottom: 8px; font-size: 14px; font-weight: 500; color: ${pageId === t.id ? 'var(--color-text)' : 'var(--color-text-muted)'}; border-bottom: 2px solid ${pageId === t.id ? 'var(--color-primary)' : 'transparent'}; white-space: nowrap;">
                                ${t.label}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div style="padding: var(--space-xl) var(--space-lg); max-width: 600px; margin: 0 auto;">
                    ${currentContent}
                </div>
            </div>
        `;
    }
};
