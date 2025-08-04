// Page transition state management
class PageTransitionManager {
    constructor() {
        this.initialized = false;
        this.stateKey = 'pageTransitionState';
        this.init();
    }

    init() {
        if (this.initialized) return;
        
        // Listen for navigation events
        document.addEventListener('astro:before-preparation', this.saveState.bind(this));
        document.addEventListener('astro:after-preparation', this.restoreState.bind(this));
        document.addEventListener('astro:page-load', this.handlePageLoad.bind(this));
        
        // Also handle initial page load
        if (document.readyState === 'complete') {
            this.restoreState();
        } else {
            window.addEventListener('load', this.restoreState.bind(this));
        }
        
        this.initialized = true;
    }

    saveState() {
        try {
            const state = {
                scrollY: window.scrollY,
                timestamp: Date.now(),
                // Store all CSS custom properties related to header animation
                cssProperties: {
                    logoScale: getComputedStyle(document.documentElement).getPropertyValue('--logo-scale') || '1',
                    logoWeight: getComputedStyle(document.documentElement).getPropertyValue('--logo-weight') || '300',
                    logoWidth: getComputedStyle(document.documentElement).getPropertyValue('--logo-width') || '100',
                    mobileLogoOpacity: getComputedStyle(document.documentElement).getPropertyValue('--mobile-logo-opacity') || '1',
                    headerBgOpacity: getComputedStyle(document.documentElement).getPropertyValue('--header-bg-opacity') || '0'
                },
                url: window.location.href,
                pathname: window.location.pathname
            };
            
            sessionStorage.setItem(this.stateKey, JSON.stringify(state));
        } catch (error) {
            console.warn('Failed to save page transition state:', error);
        }
    }

    restoreState() {
        try {
            const stored = sessionStorage.getItem(this.stateKey);
            if (!stored) return;

            const state = JSON.parse(stored);
            
            // Check if the state is recent (within 5 seconds) to avoid stale state
            if (Date.now() - state.timestamp > 5000) {
                sessionStorage.removeItem(this.stateKey);
                return;
            }

            const currentPathname = window.location.pathname;
            const storedPathname = state.pathname;
            
            // Determine if we should preserve scroll position
            const shouldPreserveScroll = this.shouldPreserveScrollPosition(storedPathname, currentPathname);

            const documentElement = document.documentElement;
            
            // Always restore CSS custom properties for header state
            if (state.cssProperties) {
                Object.entries(state.cssProperties).forEach(([key, value]) => {
                    const cssVar = this.camelToCssVar(key);
                    documentElement.style.setProperty(cssVar, value);
                });
            }

            // Only restore scroll position if appropriate
            if (shouldPreserveScroll && state.scrollY > 0) {
                // Use multiple attempts to ensure scroll restoration works
                const restoreScroll = () => {
                    window.scrollTo(0, state.scrollY);
                };

                // Immediate attempt
                restoreScroll();
                
                // Delayed attempts to handle cases where content isn't ready
                setTimeout(restoreScroll, 50);
                setTimeout(restoreScroll, 100);
                
                // Final attempt after transition
                requestAnimationFrame(() => {
                    setTimeout(restoreScroll, 200);
                });
            } else {
                // Scroll to top for different page types
                window.scrollTo(0, 0);
            }

        } catch (error) {
            console.warn('Failed to restore page transition state:', error);
            sessionStorage.removeItem(this.stateKey);
        }
    }

    shouldPreserveScrollPosition(fromPath, toPath) {
        // Don't preserve scroll when navigating between different page types
        
        // Archive pages (list views)
        const isFromArchive = fromPath.startsWith('/archive') && !fromPath.match(/\/archive\/[^\/]+$/);
        const isToArchive = toPath.startsWith('/archive') && !toPath.match(/\/archive\/[^\/]+$/);
        
        // Blog post pages
        const isFromPost = fromPath.match(/\/archive\/[^\/]+$/) || fromPath.startsWith('/posts/');
        const isToPost = toPath.match(/\/archive\/[^\/]+$/) || toPath.startsWith('/posts/');
        
        // Main page
        const isFromMain = fromPath === '/' || fromPath === '/index';
        const isToMain = toPath === '/' || toPath === '/index';
        
        // Preserve scroll only when staying within the same page type
        if (isFromArchive && isToArchive) return true;  // Archive to archive
        if (isFromMain && isToMain) return true;        // Main to main (shouldn't happen)
        
        // Don't preserve scroll when:
        // - Going from archive to post
        // - Going from post to archive  
        // - Going from/to main page
        // - Any other cross-page-type navigation
        return false;
    }

    handlePageLoad() {
        // Re-initialize header scripts after page load
        this.restoreState();
        
        // Clean up old state after successful restore
        setTimeout(() => {
            sessionStorage.removeItem(this.stateKey);
        }, 1000);
    }

    camelToCssVar(camelCase) {
        return '--' + camelCase.replace(/([A-Z])/g, '-$1').toLowerCase();
    }
}

// Initialize the page transition manager
if (typeof window !== 'undefined') {
    window.pageTransitionManager = new PageTransitionManager();
}

export default PageTransitionManager;
