/**
 * Search Overlay Logic
 */

window.SearchOverlay = {
    render: () => {
        return `
            <div id="search-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: var(--color-bg); z-index: 300; transform: translateY(-100%); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column;">
                
                <!-- Header / Input Area -->
                <div style="padding: var(--space-xl) var(--space-lg) var(--space-md); border-bottom: 1px solid var(--color-divider); display: flex; align-items: center; gap: var(--space-sm); background: white;">
                    <button class="icon-btn" onclick="window.SearchOverlay.close()" style="flex-shrink: 0;">
                        <i data-lucide="arrow-left"></i>
                    </button>
                    
                    <div style="flex: 1; position: relative;">
                        <i data-lucide="search" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); width: 16px; color: var(--color-text-muted);"></i>
                        <input type="text" id="search-input" placeholder="Search for rings, necklaces..." oninput="window.SearchOverlay.handleSearch(event)" style="width: 100%; padding: 14px 16px 14px 44px; border: 1px solid var(--color-divider); border-radius: 99px; font-size: 15px; font-family: var(--font-body); background: var(--color-surface); outline: none;">
                    </div>
                </div>

                <!-- Results Area -->
                <div id="search-results" style="flex: 1; overflow-y: auto; padding: var(--space-lg);">
                    <!-- Default State: Popular Searches -->
                    <div id="search-default-state">
                        <h4 style="font-family: var(--font-heading); font-size: 14px; margin-bottom: var(--space-md); color: var(--color-text-muted);">Popular Searches</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: var(--space-sm);">
                            <button class="chip" onclick="document.getElementById('search-input').value = 'Diamond Ring'; window.SearchOverlay.handleSearch({target: document.getElementById('search-input')})">Diamond Ring</button>
                            <button class="chip" onclick="document.getElementById('search-input').value = 'Gold Necklace'; window.SearchOverlay.handleSearch({target: document.getElementById('search-input')})">Gold Necklace</button>
                            <button class="chip" onclick="document.getElementById('search-input').value = 'Studs'; window.SearchOverlay.handleSearch({target: document.getElementById('search-input')})">Studs</button>
                            <button class="chip" onclick="document.getElementById('search-input').value = 'Bridal'; window.SearchOverlay.handleSearch({target: document.getElementById('search-input')})">Bridal</button>
                        </div>
                    </div>

                    <!-- Active Results List -->
                    <div id="search-active-results" style="display: none; flex-direction: column; gap: var(--space-md);">
                        <!-- Results injected here -->
                    </div>
                </div>
            </div>
        `;
    },

    open: () => {
        let overlay = document.getElementById('search-overlay');
        if (!overlay) {
            document.body.insertAdjacentHTML('beforeend', window.SearchOverlay.render());
            lucide.createIcons();
            overlay = document.getElementById('search-overlay');
        }

        // Slight delay to ensure DOM parsed before transform
        requestAnimationFrame(() => {
            overlay.style.transform = 'translateY(0)';
            document.getElementById('search-input').focus();
            document.body.style.overflow = 'hidden';
        });
    },

    close: () => {
        const overlay = document.getElementById('search-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(-100%)';
            document.body.style.overflow = '';
            // Optional: remove from DOM after close
            // setTimeout(() => overlay.remove(), 400); 
        }
    },

    handleSearch: (e) => {
        const query = e.target.value.toLowerCase();
        const defaultState = document.getElementById('search-default-state');
        const activeResults = document.getElementById('search-active-results');

        if (query.length < 2) {
            defaultState.style.display = 'block';
            activeResults.style.display = 'none';
            return;
        }

        defaultState.style.display = 'none';
        activeResults.style.display = 'flex';

        // Mock search against dummy products
        const products = typeof DUMMY_PRODUCTS !== 'undefined' ? DUMMY_PRODUCTS : [];
        const results = products.filter(p => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query));

        if (results.length === 0) {
            activeResults.innerHTML = `
                <div style="text-align: center; padding: var(--space-xxl) 0;">
                    <i data-lucide="search-x" style="width: 48px; height: 48px; color: var(--color-divider); margin: 0 auto 16px;"></i>
                    <p style="color: var(--color-text-muted);">No results found for "${query}"</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        activeResults.innerHTML = results.map(item => `
            <div style="display: flex; gap: var(--space-md); padding: var(--space-md); border-bottom: 1px solid var(--color-divider); cursor: pointer;" onclick="window.SearchOverlay.close(); app.navigate('product/${item.id}')">
                <img src="${item.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-sm); background: var(--color-surface);" alt="${item.name}">
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                    <span style="font-size: 10px; color: var(--color-text-muted); text-transform: uppercase;">${item.brand}</span>
                    <h5 style="font-size: 14px; font-weight: 500; margin: 2px 0;">${item.name}</h5>
                    <span style="font-family: var(--font-heading); color: var(--color-accent); font-weight: 600;">$${item.price.toLocaleString()}</span>
                </div>
                <i data-lucide="chevron-right" style="align-self: center; color: var(--color-text-muted); width: 16px;"></i>
            </div>
        `).join('');

        lucide.createIcons();
    }
};
