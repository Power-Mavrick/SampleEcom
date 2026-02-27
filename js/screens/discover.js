/**
 * Discover & Editorial Screen
 */

window.DiscoverScreen = {
    render: () => {
        const articles = [
            { id: 1, title: "The Art of Layering Necklaces", category: "Style Guide", image: "https://images.unsplash.com/photo-1599643478524-fb66f81e3a96?auto=format&fit=crop&q=80&w=800", date: "Oct 12, 2023" },
            { id: 2, title: "Our Commitment to Ethical Diamonds", category: "Sustainability", image: "https://images.unsplash.com/photo-1573408355474-6bd5c5bcbe06?auto=format&fit=crop&q=80&w=800", date: "Sep 28, 2023" },
            { id: 3, title: "Bridal Trends for the Modern Bride", category: "Bridal", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800", date: "Aug 15, 2023" }
        ];

        return `
            <div class="fade-in" style="padding-bottom: calc(var(--nav-height) + var(--space-xl)); background: var(--color-bg); min-height: 100vh;">
                
                <div style="padding: var(--space-xl) var(--space-lg) var(--space-md); text-align: center; border-bottom: 1px solid var(--color-divider); background: white;">
                    <span style="font-size: 11px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 1px;">Editorial</span>
                    <h1 style="font-family: var(--font-heading); font-size: 32px; margin-top: 8px;">Discover Spirit</h1>
                </div>

                <!-- Featured Article -->
                <div style="padding: var(--space-lg);">
                    <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; height: 350px; margin-bottom: var(--space-xl);">
                        <img src="https://images.unsplash.com/photo-1620656798579-1984d9e97e1d?auto=format&fit=crop&q=80&w=800" style="width: 100%; height: 100%; object-fit: cover;">
                        <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); display: flex; flex-direction: column; justify-content: flex-end; padding: var(--space-lg); color: white;">
                            <span style="font-size: 11px; text-transform: uppercase; font-weight: 500; letter-spacing: 1px; margin-bottom: 8px;">New Collection</span>
                            <h2 style="font-family: var(--font-heading); font-size: 28px; line-height: 1.2; margin-bottom: var(--space-sm);">The Zenith Collection: Reimagining Elegance</h2>
                            <button class="btn" style="background: white; color: black; border: none; padding: 10px 24px; font-size: 13px; font-weight: 600; width: max-content; margin-top: var(--space-md);">READ MORE</button>
                        </div>
                    </div>

                    <!-- Category Pills -->
                    <div style="display: flex; gap: var(--space-sm); overflow-x: auto; padding-bottom: var(--space-md); margin-bottom: var(--space-md); scrollbar-width: none;">
                        <button class="chip active">All Stories</button>
                        <button class="chip">Style Guides</button>
                        <button class="chip">Behind the Craft</button>
                        <button class="chip">Sustainability</button>
                    </div>

                    <!-- Article Grid -->
                    <div style="display: flex; flex-direction: column; gap: var(--space-xl);">
                        ${articles.map(article => `
                            <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
                                <div style="border-radius: var(--radius-sm); overflow: hidden; height: 220px;">
                                    <img src="${article.image}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 8px;">
                                    <span style="font-size: 11px; color: var(--color-primary); font-weight: 600; text-transform: uppercase;">${article.category}</span>
                                    <span style="font-size: 11px; color: var(--color-text-muted);">${article.date}</span>
                                </div>
                                <h3 style="font-family: var(--font-heading); font-size: 20px; line-height: 1.3;">${article.title}</h3>
                                <a href="#" style="font-size: 13px; font-weight: 500; text-decoration: underline; margin-top: 4px; display: inline-block;">Read Article</a>
                            </div>
                        `).join('')}
                    </div>

                    <div style="text-align: center; margin-top: var(--space-xxl);">
                        <button class="btn btn-outline" style="width: 100%; max-width: 300px;">LOAD MORE</button>
                    </div>
                </div>
            </div>
        `;
    }
};
