document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Theme Configuration (Dark/Light Mode)
    // ----------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check and set saved theme or default to system theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set theme class on <html> (documentElement) to ensure consistent background propagation
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
    }

    // Toggle theme on click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-theme');
            const currentTheme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });
    }

    // ----------------------------------------------------
    // 2. Fetch Interceptor to Resolve Relative Markdown Image Paths
    // ----------------------------------------------------
    let currentMarkdownBaseUrl = '';

    // Intercept window.fetch to capture raw markdown URL path
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
        const url = args[0];
        if (typeof url === 'string') {
            try {
                // Use window.location.href as the base URL to safely handle file:// and http:// protocols
                const urlObj = new URL(url, window.location.href);
                const pathname = urlObj.pathname;
                if (pathname.endsWith('.md')) {
                    // Extract directory base URL
                    const lastSlashIndex = urlObj.href.lastIndexOf('/');
                    if (lastSlashIndex !== -1) {
                        currentMarkdownBaseUrl = urlObj.href.substring(0, lastSlashIndex + 1);
                    }
                }
            } catch (e) {
                console.error("Failed to parse fetch URL:", e);
            }
        }
        return originalFetch.apply(this, args);
    };

    // ----------------------------------------------------
    // 3. Active Link State & Content Image URL Resolving
    // ----------------------------------------------------
    const tutorialList = document.getElementById('tutorial-list');
    const contentDisplay = document.getElementById('content-display');

    // MutationObserver to rewrite relative image paths when content is inserted
    const contentObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const imgs = contentDisplay.querySelectorAll('img');
                imgs.forEach(img => {
                    const src = img.getAttribute('src');
                    // Rewrite relative image paths using currentMarkdownBaseUrl
                    if (src && 
                        !src.startsWith('http://') && 
                        !src.startsWith('https://') && 
                        !src.startsWith('data:') && 
                        !src.startsWith('/') &&
                        currentMarkdownBaseUrl) {
                        img.src = currentMarkdownBaseUrl + src;
                    }
                });
            }
        }
    });

    if (contentDisplay) {
        contentObserver.observe(contentDisplay, { childList: true, subtree: true });
        
        // Add load class initially to show welcome content smoothly
        contentDisplay.classList.add('content-loaded-animation');
    }

    if (tutorialList) {
        // Event delegation to catch clicks on dynamically loaded list links
        tutorialList.addEventListener('click', (e) => {
            const targetLink = e.target.closest('a');
            if (!targetLink) return;

            // Remove active class from all sidebar links
            tutorialList.querySelectorAll('a').forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to clicked link
            targetLink.classList.add('active');

            // Trigger entry animation for content pane
            if (contentDisplay) {
                contentDisplay.classList.remove('content-loaded-animation');
                void contentDisplay.offsetWidth; // Force reflow
                contentDisplay.classList.add('content-loaded-animation');
            }

            // Close mobile sidebar if open
            document.body.classList.remove('sidebar-open');
        });
    }

    // ----------------------------------------------------
    // 4. Mobile Sidebar Drawer Toggle
    // ----------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const overlay = document.getElementById('sidebar-overlay');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-open');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            document.body.classList.remove('sidebar-open');
        });
    }
});
