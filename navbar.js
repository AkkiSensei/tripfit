(function () {
    const NAV_STYLES = `
.hk-nav-host {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 60;
    padding: 12px 16px 0;
    color: #ffffff;
    font-family: Inter, system-ui, -apple-system, Segoe UI, sans-serif;
}
.hk-nav-shell {
    max-width: 1120px;
    margin: 0 auto;
    border-radius: 18px;
    background: rgba(8, 45, 48, 0.78);
    border: 1px solid rgba(125, 242, 228, 0.28);
    backdrop-filter: blur(14px) saturate(145%);
    -webkit-backdrop-filter: blur(14px) saturate(145%);
    box-shadow: 0 14px 35px rgba(0, 0, 0, 0.24);
}
.hk-nav-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 14px;
    position: relative;
}
.hk-brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #ffffff;
    text-decoration: none;
    min-width: 0;
}
.hk-brand img {
    height: 36px;
    width: auto;
    object-fit: contain;
}
.hk-brand span {
    font-size: clamp(1.45rem, 1.25rem + 0.65vw, 1.75rem);
    font-weight: 800;
    line-height: 1;
}
.hk-main-links {
    display: none;
    align-items: center;
    gap: 26px;
}
.hk-link {
    position: relative;
    color: #f3fffd;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.35);
    transition: color 220ms ease;
}
.hk-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 100%;
    height: 2px;
    transform: scaleX(0);
    transform-origin: left;
    background: linear-gradient(90deg, #2dd4bf, #7df2e4);
    transition: transform 220ms ease;
}
.hk-link:hover,
.hk-link.hk-active {
    color: #ffffff;
}
.hk-link:hover::after,
.hk-link.hk-active::after {
    transform: scaleX(1);
}
.hk-right {
    display: none;
    align-items: center;
    gap: 8px;
}
.hk-icon-btn {
    width: 42px;
    height: 42px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    color: #eafffb;
    background: transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    transition: all 220ms ease;
}
.hk-icon-btn:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
    transform: translateY(-1px);
}
.hk-cta {
    padding: 10px 16px;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: transform 220ms ease, background-color 220ms ease;
}
.hk-cta:hover {
    transform: translateY(-1px);
}
.hk-cta-book {
    background: #f8f9fa;
    color: #0f373b;
}
.hk-cta-book:hover {
    background: #e8ecee;
}
.hk-mobile-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}
.hk-menu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 260ms ease;
}
.hk-menu.hk-open {
    max-height: 520px;
}
.hk-menu-inner {
    margin: 0 0 12px;
    padding: 0 14px 14px;
}
.hk-menu-card {
    border-radius: 16px;
    border: 1px solid rgba(125, 242, 228, 0.28);
    background: rgba(4, 33, 36, 0.9);
    padding: 14px;
}
.hk-menu-links {
    display: grid;
    gap: 10px;
}
.hk-menu-links a {
    color: #f3fffd;
    text-decoration: none;
    font-weight: 600;
}
.hk-menu-links a.hk-active {
    color: #7df2e4;
}
.hk-menu-grid {
    margin-top: 12px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
}
.hk-menu-grid a {
    text-align: center;
}
.hk-mobile-auth {
    margin-top: 10px;
}
.hk-mobile-auth a {
    width: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 999px;
    padding: 10px 16px;
    text-decoration: none;
    font-weight: 700;
}
.hk-auth-login {
    border: 1px solid rgba(45, 212, 191, 0.8);
    color: #2dd4bf;
}
.hk-auth-profile {
    background: #2dd4bf;
    color: #0f373b;
}
@media (min-width: 768px) {
    .hk-mobile-actions {
        display: none;
    }
    .hk-right {
        display: inline-flex;
    }
}
@media (min-width: 1024px) {
    .hk-main-links {
        display: inline-flex;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
}

html.dark body.hk-theme-fallback {
    background: #0f172a;
    color: #e5e7eb;
}

html.dark body.hk-theme-fallback [class*="bg-white"] {
    background-color: #1f2937;
}

html.dark body.hk-theme-fallback [class*="bg-gray-100"] {
    background-color: #111827;
}

html.dark body.hk-theme-fallback [class*="text-gray-400"],
html.dark body.hk-theme-fallback [class*="text-gray-500"],
html.dark body.hk-theme-fallback [class*="text-gray-600"] {
    color: #9ca3af;
}

html.dark body.hk-theme-fallback [class*="text-juniper"] {
    color: #f3f4f6;
}

html.dark body.hk-theme-fallback input,
html.dark body.hk-theme-fallback select,
html.dark body.hk-theme-fallback textarea {
    background-color: #111827;
    color: #e5e7eb;
    border-color: #374151;
}

html.dark body.hk-theme-fallback [class*="border"] {
    border-color: #374151;
}
`;

    const ICONS = {
        history: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3a9 9 0 1 0 8.94 10H20a7 7 0 1 1-2.05-4.95L15 11h7V4l-2.65 2.65A8.96 8.96 0 0 0 13 3zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>',
        heart: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 7.5 3C9.24 3 10.91 3.81 12 5.09 13.09 3.81 14.76 3 16.5 3A5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
        reviews: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2 9.53 7.06 4 7.88l4 3.9-.94 5.52L12 14.77l4.94 2.53-.94-5.52 4-3.9-5.53-.82z"/></svg>',
        user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.41 0-8 2.24-8 5v1h16v-1c0-2.76-3.59-5-8-5z"/></svg>',
        moon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 0 1 11.21 3a7 7 0 1 0 9.79 9.79z"/></svg>',
        sun: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.76 4.84 5.34 3.42 3.92 4.84l1.42 1.42zM1 13h3v-2H1zm10-8h2V2h-2zm7.24-.16-1.42 1.42 1.42 1.42 1.42-1.42zM17 13h3v-2h-3zM4.84 19.16l1.42 1.42 1.42-1.42-1.42-1.42zM11 22h2v-3h-2zm7.24-2.84 1.42 1.42 1.42-1.42-1.42-1.42zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>',
        menu: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
        close: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6l-12 12"/></svg>',
        book: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V10h14zm0-11H5V5h14z"/></svg>'
    };

    function ensureStyles() {
        if (document.getElementById('hk-navbar-style')) return;
        const style = document.createElement('style');
        style.id = 'hk-navbar-style';
        style.textContent = NAV_STYLES;
        document.head.appendChild(style);
    }

    function pageName() {
        const file = window.location.pathname.split('/').pop();
        return file || 'home.html';
    }

    function activeAlias(file) {
        const aliases = {
            'destination.html': 'all-destinations.html',
            'recommendation.html': 'quiz.html'
        };
        return aliases[file] || file;
    }

    function navTemplate() {
        return `
<header class="hk-nav-host" data-hk-navbar>
    <div class="hk-nav-shell">
        <div class="hk-nav-row">
            <a href="home.html" class="hk-brand">
                <img src="logo/TripFit_logo2-removebg-preview.png" alt="TripFit logo">
                <span>TripFit</span>
            </a>

            <nav class="hk-main-links" aria-label="Main navigation">
                <a href="home.html" data-hk-link="home.html" class="hk-link">Home</a>
                <a href="all-destinations.html" data-hk-link="all-destinations.html" class="hk-link">Destinations</a>
            </nav>

            <div class="hk-right">
                <a href="history.html" data-hk-link="history.html" class="hk-icon-btn" aria-label="History" title="History">${ICONS.history}</a>
                <a href="favorites.html" data-hk-link="favorites.html" class="hk-icon-btn" aria-label="Favorites" title="Favorites">${ICONS.heart}</a>
                <a href="reviews.html" data-hk-link="reviews.html" class="hk-icon-btn" aria-label="Reviews" title="Reviews">${ICONS.reviews}</a>
                <a href="book.html" data-hk-link="book.html" class="hk-cta hk-cta-book">${ICONS.book} Book now</a>
                <span id="hk-auth-desktop">
                    <a href="index.html" class="hk-icon-btn" aria-label="Login" title="Login">${ICONS.user}</a>
                </span>
                <button type="button" id="hk-theme-toggle" class="hk-icon-btn" aria-label="Toggle theme" title="Toggle theme">${ICONS.moon}</button>
            </div>

            <div class="hk-mobile-actions">
                <button type="button" id="hk-theme-toggle-mobile" class="hk-icon-btn" aria-label="Toggle theme">${ICONS.moon}</button>
                <button type="button" id="hk-menu-toggle" class="hk-icon-btn" aria-label="Open menu" aria-expanded="false">${ICONS.menu}</button>
            </div>
        </div>

        <div id="hk-mobile-menu" class="hk-menu">
            <div class="hk-menu-inner">
                <div class="hk-menu-card">
                    <nav class="hk-menu-links" aria-label="Mobile navigation">
                        <a href="home.html" data-hk-link="home.html">Home</a>
                        <a href="all-destinations.html" data-hk-link="all-destinations.html">Destinations</a>
                        <a href="history.html" data-hk-link="history.html">History</a>
                        <a href="favorites.html" data-hk-link="favorites.html">Favorites</a>
                        <a href="reviews.html" data-hk-link="reviews.html">Reviews</a>
                    </nav>

                    <div class="hk-menu-grid">
                        <a href="book.html" data-hk-link="book.html" class="hk-cta hk-cta-book">Book now</a>
                        <a href="quiz.html" data-hk-link="quiz.html" class="hk-cta hk-auth-profile">Quiz</a>
                    </div>

                    <div id="hk-auth-mobile" class="hk-mobile-auth">
                        <a href="index.html" class="hk-auth-login">Login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
`;
    }

    function setThemeIcons(isDark) {
        const desktop = document.getElementById('hk-theme-toggle');
        const mobile = document.getElementById('hk-theme-toggle-mobile');
        const icon = isDark ? ICONS.sun : ICONS.moon;
        if (desktop) desktop.innerHTML = icon;
        if (mobile) mobile.innerHTML = icon;
    }

    function safeParseJSON(value, fallback) {
        try {
            return value ? JSON.parse(value) : fallback;
        } catch {
            return fallback;
        }
    }

    function applyThemeState() {
        const stored = localStorage.getItem('tripfit-theme') || localStorage.getItem('hikster-theme');
        const dark = stored === 'dark';
        document.documentElement.classList.toggle('dark', dark);
        setThemeIcons(dark);
    }

    function toggleTheme() {
        const dark = !document.documentElement.classList.contains('dark');
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('tripfit-theme', dark ? 'dark' : 'light');
        localStorage.setItem('hikster-theme', dark ? 'dark' : 'light');
        setThemeIcons(dark);
    }

    function applyAuthState() {
        const desktop = document.getElementById('hk-auth-desktop');
        const mobile = document.getElementById('hk-auth-mobile');
        const user = safeParseJSON(localStorage.getItem('tripfitUser'), null)
            || safeParseJSON(localStorage.getItem('hiksterUser'), null);

        if (!desktop || !mobile) return;

        if (user) {
            desktop.innerHTML = `<a href="profile.html" class="hk-icon-btn" aria-label="Profile" title="Profile">${ICONS.user}</a>`;
            mobile.innerHTML = '<a href="profile.html" class="hk-auth-profile">Profile</a>';
            return;
        }

        desktop.innerHTML = `<a href="index.html" class="hk-icon-btn" aria-label="Login" title="Login">${ICONS.user}</a>`;
        mobile.innerHTML = '<a href="index.html" class="hk-auth-login">Login</a>';
    }

    function applyActiveLinks() {
        const current = activeAlias(pageName());
        document.querySelectorAll('[data-hk-link]').forEach((link) => {
            if (link.getAttribute('data-hk-link') === current) {
                link.classList.add('hk-active');
            }
        });
    }

    function setupMenu() {
        const toggle = document.getElementById('hk-menu-toggle');
        const menu = document.getElementById('hk-mobile-menu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', function () {
            const open = menu.classList.toggle('hk-open');
            toggle.setAttribute('aria-expanded', String(open));
            toggle.innerHTML = open ? ICONS.close : ICONS.menu;
        });
    }

    function applyBodyOffset() {
        if (document.body.getAttribute('data-nav-overlay') === 'true') return;
        const nav = document.querySelector('[data-hk-navbar]');
        if (!nav) return;
        const height = nav.offsetHeight + 10;
        document.body.style.paddingTop = height + 'px';
    }

    function applyThemeFallbackClass() {
        const hasDarkUtilities = document.querySelector('[class*="dark:"]') !== null;
        document.body.classList.toggle('hk-theme-fallback', !hasDarkUtilities);
    }

    function mountNavbar() {
        ensureStyles();

        const mountPoint = document.getElementById('tripfit-navbar');
        if (mountPoint) {
            mountPoint.outerHTML = navTemplate();
        } else {
            document.body.insertAdjacentHTML('afterbegin', navTemplate());
        }

        applyActiveLinks();
        applyThemeState();
        applyAuthState();

        const desktopTheme = document.getElementById('hk-theme-toggle');
        const mobileTheme = document.getElementById('hk-theme-toggle-mobile');
        if (desktopTheme) desktopTheme.addEventListener('click', toggleTheme);
        if (mobileTheme) mobileTheme.addEventListener('click', toggleTheme);

        setupMenu();
        applyThemeFallbackClass();
        applyBodyOffset();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountNavbar);
    } else {
        mountNavbar();
    }
})();

