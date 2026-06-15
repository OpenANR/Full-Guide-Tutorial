document.addEventListener('DOMContentLoaded', () => {
    // Theme Selectors
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check and set saved theme or default to system theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }

    // Toggle theme on click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });
    }

    // Active Navigation Highlight & Content Loading Animation
    const tutorialList = document.getElementById('tutorial-list');
    const contentDisplay = document.getElementById('content-display');

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

    // Mobile Sidebar Drawer Toggle
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
    
    // Add load class initially to show welcome content smoothly
    if (contentDisplay) {
        contentDisplay.classList.add('content-loaded-animation');
    }
});
