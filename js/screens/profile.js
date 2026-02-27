/**
 * Profile & Authentication Screens
 */

window.ProfileScreen = {
    render: () => {
        const user = app.state.user;

        if (user) {
            return window.ProfileScreen.renderDashboard(user);
        } else {
            return window.ProfileScreen.renderLogin();
        }
    },

    renderLogin: () => {
        return `
            <div class="fade-in" style="display: flex; flex-direction: column; min-height: calc(100vh - var(--header-height)); padding: var(--space-xl) var(--space-lg); max-width: 480px; margin: 0 auto; width: 100%;">
                
                <div style="text-align: center; margin-bottom: var(--space-xxl);">
                    <h1 style="font-family: var(--font-heading); font-size: 28px; margin-bottom: var(--space-md);">Welcome Back</h1>
                    <p style="color: var(--color-text-muted); font-size: 14px;">Sign in to access your wishlist, saved addresses, and track your orders.</p>
                </div>

                <form onsubmit="event.preventDefault(); window.ProfileScreen.handleLogin(this)" style="display: flex; flex-direction: column; gap: var(--space-xl);">
                    
                    <div class="form-group">
                        <label style="display: block; font-size: 13px; font-weight: 500; margin-bottom: 8px; color: var(--color-text-muted);">Email Address</label>
                        <input type="email" name="email" required placeholder="name@example.com" style="width: 100%; padding: 14px 16px; border: 1px solid var(--color-divider); border-radius: var(--radius-sm); font-size: 15px; font-family: var(--font-body); transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--color-primary)'" onblur="this.style.borderColor='var(--color-divider)'">
                    </div>

                    <div class="form-group">
                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
                            <label style="font-size: 13px; font-weight: 500; color: var(--color-text-muted);">Password</label>
                            <a href="#" style="font-size: 12px; color: var(--color-text-muted); text-decoration: underline;">Forgot?</a>
                        </div>
                        <input type="password" name="password" required placeholder="••••••••" style="width: 100%; padding: 14px 16px; border: 1px solid var(--color-divider); border-radius: var(--radius-sm); font-size: 15px; font-family: var(--font-body); transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--color-primary)'" onblur="this.style.borderColor='var(--color-divider)'">
                    </div>

                    <button type="submit" class="btn btn-primary btn-block" style="margin-top: var(--space-sm);">SIGN IN</button>
                    
                </form>

                <div style="margin-top: var(--space-xl); text-align: center; font-size: 14px; color: var(--color-text-muted);">
                    Don't have an account? 
                    <button onclick="app.navigate('register')" style="color: var(--color-primary); font-weight: 600; text-decoration: underline; margin-left: 4px;">Register</button>
                </div>

            </div>
        `;
    },

    renderRegister: () => {
        return `
            <div class="fade-in" style="display: flex; flex-direction: column; min-height: calc(100vh - var(--header-height)); padding: var(--space-xl) var(--space-lg); max-width: 480px; margin: 0 auto; width: 100%;">
                
                <button class="icon-btn" style="margin-bottom: var(--space-lg); margin-left: -12px;" onclick="window.history.back()">
                    <i data-lucide="arrow-left"></i>
                </button>

                <div style="margin-bottom: var(--space-xl);">
                    <h1 style="font-family: var(--font-heading); font-size: 28px; margin-bottom: 8px;">Create Account</h1>
                    <p style="color: var(--color-text-muted); font-size: 14px;">Join Spirit to unlock exclusive benefits.</p>
                </div>

                <form onsubmit="event.preventDefault(); window.ProfileScreen.handleRegister(this)" style="display: flex; flex-direction: column; gap: var(--space-lg);">
                    
                    <div class="form-group">
                        <label style="display: block; font-size: 13px; font-weight: 500; margin-bottom: 8px; color: var(--color-text-muted);">Full Name</label>
                        <input type="text" name="name" required placeholder="Jane Doe" style="width: 100%; padding: 14px 16px; border: 1px solid var(--color-divider); border-radius: var(--radius-sm); font-size: 15px; font-family: var(--font-body);">
                    </div>

                    <div class="form-group">
                        <label style="display: block; font-size: 13px; font-weight: 500; margin-bottom: 8px; color: var(--color-text-muted);">Email Address</label>
                        <input type="email" name="email" required placeholder="name@example.com" style="width: 100%; padding: 14px 16px; border: 1px solid var(--color-divider); border-radius: var(--radius-sm); font-size: 15px; font-family: var(--font-body);">
                    </div>

                    <div class="form-group">
                        <label style="display: block; font-size: 13px; font-weight: 500; margin-bottom: 8px; color: var(--color-text-muted);">Password</label>
                        <input type="password" name="password" required placeholder="Min. 8 characters" style="width: 100%; padding: 14px 16px; border: 1px solid var(--color-divider); border-radius: var(--radius-sm); font-size: 15px; font-family: var(--font-body);">
                    </div>

                    <button type="submit" class="btn btn-primary btn-block" style="margin-top: var(--space-md);">CREATE ACCOUNT</button>
                    
                </form>
            </div>
        `;
    },

    renderDashboard: (user) => {
        let wishlistItems = [];
        if (app.state.wishlist && app.state.wishlist.length > 0) {
            wishlistItems = app.state.wishlist.map(id => {
                if (typeof DUMMY_PRODUCTS !== 'undefined') {
                    return DUMMY_PRODUCTS.find(p => p.id === id);
                }
                return null;
            }).filter(Boolean);
        }

        // Mock wishlist items for display if real wishlist is empty or resolving failed
        if (wishlistItems.length === 0) {
            wishlistItems = [
                { id: 103, name: "Sapphire Drop Earrings", price: 3200, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600" }
            ];
        }

        return `
            <div class="fade-in" style="padding-bottom: calc(var(--nav-height) + var(--space-xl)); max-width: 800px; margin: 0 auto; width: 100%;">
                
                <!-- Profile Header -->
                <div style="padding: var(--space-xl) var(--space-lg); background: var(--color-surface); display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: var(--space-md);">
                        <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 600; font-family: var(--font-heading);">
                            ${user.name.charAt(0)}
                        </div>
                        <div>
                            <h2 style="font-size: 18px; font-family: var(--font-heading);">${user.name}</h2>
                            <p style="font-size: 13px; color: var(--color-text-muted);">${user.email}</p>
                        </div>
                    </div>
                    <button class="icon-btn" onclick="window.ProfileScreen.handleLogout()" style="background: white;" aria-label="Sign Out">
                        <i data-lucide="log-out" style="width: 18px; height: 18px;"></i>
                    </button>
                </div>

                <!-- Dashboard Menu -->
                <div style="padding: var(--space-lg);">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-bottom: var(--space-xl);">
                        
                        <div style="background: white; border: 1px solid var(--color-divider); padding: var(--space-md); border-radius: var(--radius-md); display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-surface); display: flex; align-items: center; justify-content: center;">
                                <i data-lucide="package" style="color: var(--color-primary); width: 20px; height: 20px;"></i>
                            </div>
                            <span style="font-size: 13px; font-weight: 500;">Orders</span>
                        </div>

                        <div onclick="app.navigate('address')" style="background: white; border: 1px solid var(--color-divider); padding: var(--space-md); border-radius: var(--radius-md); display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-surface); display: flex; align-items: center; justify-content: center;">
                                <i data-lucide="map-pin" style="color: var(--color-primary); width: 20px; height: 20px;"></i>
                            </div>
                            <span style="font-size: 13px; font-weight: 500;">Addresses</span>
                        </div>

                    </div>
                    <!-- Recent Orders -->
                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-md);">
                        <h3 style="font-family: var(--font-heading); font-size: 20px;">Recent Orders</h3>
                        <span style="font-size: 13px; color: var(--color-text-muted);">${app.state.pastOrders.length} orders</span>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: var(--space-md); margin-bottom: var(--space-xxl);">
                        ${app.state.pastOrders.length === 0 ? `
                            <div style="text-align: center; padding: var(--space-lg); border: 1px dashed var(--color-divider); border-radius: var(--radius-md); color: var(--color-text-muted); font-size: 14px;">
                                You haven't placed any orders yet.
                            </div>
                        ` : app.state.pastOrders.slice(0, 3).map(order => `
                            <div style="border: 1px solid var(--color-divider); border-radius: var(--radius-md); padding: var(--space-md); background: white;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="font-weight: 500; font-size: 14px;">Order #STR-${order.id}</span>
                                    <span style="color: var(--color-primary); font-size: 12px; font-weight: 600; background: rgba(247, 102, 49, 0.1); padding: 4px 8px; border-radius: 99px;">Processing</span>
                                </div>
                                <div style="font-size: 12px; color: var(--color-text-muted); margin-bottom: var(--space-sm);">
                                    ${new Date(order.date).toLocaleDateString()} • ${order.items.length} items
                                </div>
                                <div style="font-family: var(--font-heading); font-weight: 600;">$${order.total.toLocaleString()}</div>
                            </div>
                        `).join('')}
                    </div>
                    <!-- My Wishlist -->
                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-md);">
                        <h3 style="font-family: var(--font-heading); font-size: 20px;">My Wishlist</h3>
                        <span style="font-size: 13px; color: var(--color-text-muted);">${wishlistItems.length} items</span>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: var(--space-md);">
                        ${wishlistItems.map(item => `
                            <div style="display: flex; gap: var(--space-md); padding: var(--space-md); border: 1px solid var(--color-divider); border-radius: var(--radius-md); background: white;">
                                <div style="width: 80px; height: 80px; border-radius: var(--radius-sm); overflow: hidden; background: var(--color-surface);">
                                    <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                                <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                                    <div>
                                        <h4 style="font-size: 14px; font-weight: 500; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${item.name}</h4>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-family: var(--font-heading); font-weight: 600; color: var(--color-accent);">$${item.price.toLocaleString()}</span>
                                        <button class="btn btn-primary" style="padding: 6px 16px; font-size: 11px; border-radius: var(--radius-sm);" onclick="window.ProductScreen.addToCart(${item.id}, '${item.name}', ${item.price}, '${item.image}')">ADD</button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                </div>

            </div>
        `;
    },

    handleLogin: (form) => {
        const formData = new FormData(form);
        const email = formData.get('email');

        // Mock authentication
        app.state.user = {
            name: email.split('@')[0],
            email: email
        };
        app.saveState();

        // Update Drawer UI
        window.ProfileScreen.updateDrawerUser();

        // Navigate
        app.navigate('profile', false);
    },

    handleRegister: (form) => {
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');

        // Mock authentication
        app.state.user = {
            name: name,
            email: email
        };
        app.saveState();

        // Update Drawer UI
        window.ProfileScreen.updateDrawerUser();

        // Navigate
        app.navigate('profile', false);
    },

    handleLogout: () => {
        app.state.user = null;
        app.saveState();
        window.ProfileScreen.updateDrawerUser();
        app.navigate('profile', false);
    },

    updateDrawerUser: () => {
        const drawerInfo = document.querySelector('.drawer-header .user-info');
        const avatar = document.querySelector('.drawer-header .avatar');

        if (app.state.user) {
            drawerInfo.innerHTML = `
                <span class="greeting">Hello, ${app.state.user.name}</span>
                <span class="auth-link" onclick="app.navigate('profile'); app.toggleDrawer()">View Profile</span>
            `;
            avatar.innerHTML = `<span style="font-family: var(--font-heading); font-weight:600; font-size: 20px; color: var(--color-primary);">${app.state.user.name.charAt(0)}</span>`;
            avatar.style.backgroundColor = 'white';
            avatar.style.border = '1px solid var(--color-divider)';
        } else {
            drawerInfo.innerHTML = `
                <span class="greeting">Hello, Guest</span>
                <span class="auth-link" onclick="app.navigate('profile'); app.toggleDrawer()">Sign In / Register</span>
            `;
            avatar.innerHTML = `<i data-lucide="user"></i>`;
            avatar.style.backgroundColor = 'var(--color-divider)';
            avatar.style.border = 'none';
            // Re-initialize lucide icons for the newly injected icon
            if (window.lucide) window.lucide.createIcons();
        }
    }
};

window.AddressScreen = {
    render: () => {
        const addresses = app.state.addresses || [];

        return `
            <div class="fade-in" style="min-height: 100vh; background: var(--color-bg); padding-bottom: 100px;">
                <div style="padding: var(--space-xl) var(--space-lg) var(--space-md); border-bottom: 1px solid var(--color-divider); background: white; position: sticky; top: 0; z-index: 10;">
                    <div style="display: flex; align-items: center; gap: var(--space-md);">
                        <button class="icon-btn" onclick="window.history.back()">
                            <i data-lucide="arrow-left"></i>
                        </button>
                        <h1 style="font-family: var(--font-heading); font-size: 20px; margin: 0;">My Addresses</h1>
                    </div>
                </div>

                <div style="padding: var(--space-lg); max-width: 600px; margin: 0 auto;">
                    ${addresses.length === 0 ? `
                        <div style="text-align: center; padding: var(--space-xxl) var(--space-lg);">
                            <i data-lucide="map" style="width: 48px; height: 48px; color: var(--color-divider); margin: 0 auto var(--space-md);"></i>
                            <h3 style="font-size: 16px; margin-bottom: 8px;">No Addresses Saved</h3>
                            <p style="color: var(--color-text-muted); font-size: 14px; margin-bottom: var(--space-lg);">Add a shipping address to speed up your checkout.</p>
                        </div>
                    ` : `
                        <div style="display: flex; flex-direction: column; gap: var(--space-md); margin-bottom: var(--space-xl);">
                            ${addresses.map((addr, index) => `
                                <div style="border: 1px solid var(--color-divider); background: white; border-radius: var(--radius-md); padding: var(--space-md);">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                        <span style="font-weight: 600; font-size: 14px;">${addr.name}</span>
                                        <button class="icon-btn" style="width: 24px; height: 24px; color: var(--color-error);" onclick="window.AddressScreen.remove(${index})">
                                            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                                        </button>
                                    </div>
                                    <p style="font-size: 13px; color: var(--color-text-muted); line-height: 1.5; margin: 0;">
                                        ${addr.street}<br>${addr.city}, ${addr.zip}
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    `}

                    <button class="btn btn-outline" style="width: 100%; border-style: dashed;" onclick="window.AddressScreen.addMock()">
                        <i data-lucide="plus" style="width: 16px; margin-right: 8px;"></i> ADD NEW ADDRESS
                    </button>
                </div>
            </div>
        `;
    },

    addMock: () => {
        if (!app.state.addresses) app.state.addresses = [];
        app.state.addresses.push({
            name: "Home",
            street: "123 Luxury Lane, Apt 4B",
            city: "New York",
            zip: "10001"
        });
        if (typeof app !== 'undefined' && app.saveState) {
            app.saveState();
        }
        app.navigate('address', false);
    },

    remove: (index) => {
        if (app.state.addresses) {
            app.state.addresses.splice(index, 1);
            if (typeof app !== 'undefined' && app.saveState) {
                app.saveState();
            }
            app.navigate('address', false);
        }
    }
};
