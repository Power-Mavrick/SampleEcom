/**
 * Home Screen
 */

const DUMMY_PRODUCTS = [
    { id: 101, name: "Emerald Cut Diamond Ring", brand: "Tiffany & Co.", price: 2500, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600" },
    { id: 102, name: "Gold Vintage Necklace", brand: "Bvlgari", price: 1850, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600" },
    { id: 103, name: "Sapphire Drop Earrings", brand: "Cartier", price: 3200, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600" },
    { id: 104, name: "Rose Gold Bracelet", brand: "Van Cleef", price: 1100, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600" }
];

const CATEGORIES = ["All", "Necklace", "Rings", "Earrings", "Bracelets", "Watches"];

window.HomeScreen = {
    render: () => {
        const heroSection = `
            <div style="position: relative; width: 100%; height: 65vh; min-height: 400px; max-height: 600px; display: flex; align-items: flex-end; padding: var(--space-xl); background-image: url('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1600'); background-size: cover; background-position: center; justify-content: center;">
                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%);"></div>
                
                <div style="position: relative; z-index: 10; color: white; width: 100%; max-width: var(--content-max-width);">
                    <span style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; display: block;">New Collection</span>
                    <h1 style="color: white; font-size: clamp(32px, 5vw, 56px); margin-bottom: 16px;">October<br>Favorites</h1>
                    <button class="btn" style="background: white; color: black; border-radius: 0; padding: 12px 32px;" onclick="app.navigate('category')">SHOP NOW</button>
                </div>
            </div>
        `;

        const categoryRow = `
            <div style="margin-top: var(--space-lg);">
                <div class="chip-scroller fade-in">
                    ${CATEGORIES.map((cat, i) => `
                        <button class="chip ${i === 0 ? 'active' : ''}">${cat}</button>
                    `).join('')}
                </div>
            </div>
        `;

        const trendingHeader = Components.SectionHeader("Trending Now", "View All");

        const trendingGrid = `
            <div class="product-grid fade-in" style="animation-delay: 0.1s; padding-bottom: var(--space-xxl);">
                ${DUMMY_PRODUCTS.map(p => Components.ProductCard(p)).join('')}
            </div>
        `;

        return `
            <div class="fade-in">
                ${heroSection}
                ${categoryRow}
                ${trendingHeader}
                ${trendingGrid}
            </div>
        `;
    },

    afterRender: () => {
        // Any DOM event listeners specifically for Home Screen
        document.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }
};
