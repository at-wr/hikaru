export default function initHeader() {
    let lastScrollY = 0;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;
        const scrollProgress = document.getElementById('scroll-progress');
        const doc = document.documentElement;
        const maxScroll = 300;
        const minScale = 0.7;
        const maxScale = 1.0;
        const progress = Math.min(scrollY / maxScroll, 1);
        const scale = maxScale - progress * (maxScale - minScale);
        doc.style.setProperty('--logo-scale', scale.toString());
        const fontWeight = 300 + progress * 200;
        doc.style.setProperty('--logo-weight', fontWeight.toString());
        const mobileOpacity = Math.max(1 - progress * 1.2, 0);
        doc.style.setProperty('--mobile-logo-opacity', mobileOpacity.toString());
        const headerBgOpacity = scrollY > 50 ? 0.95 : 0;
        doc.style.setProperty('--header-bg-opacity', headerBgOpacity.toString());
        if (scrollProgress) {
            const documentHeight = doc.scrollHeight - window.innerHeight;
            const scrollPercentage = Math.min((scrollY / documentHeight) * 100, 100);
            scrollProgress.style.height = `${scrollPercentage}%`;
            if (scrollPercentage > 5) {
                scrollProgress.style.boxShadow = '0 0 8px rgba(51, 65, 85, 0.3)';
            } else {
                scrollProgress.style.boxShadow = 'none';
            }
        }
        lastScrollY = scrollY;
        ticking = false;
    }

    function handleScroll() {
        const scrollY = window.scrollY;
        const scrollDelta = Math.abs(scrollY - lastScrollY);
        if (scrollDelta > 10 || !ticking) {
            if (scrollDelta > 10) {
                updateHeader();
            } else {
                if (!ticking) {
                    requestAnimationFrame(updateHeader);
                    ticking = true;
                }
            }
        }
    }

    function initializeHeader() {
        window.addEventListener('scroll', handleScroll, { passive: true });
        updateHeader();
        const logoDesktop = document.getElementById('site-logo-desktop');
        const logoMobile = document.getElementById('site-logo-mobile');
        [logoDesktop, logoMobile].forEach((logo) => {
            if (logo) {
                logo.addEventListener('mouseenter', () => {
                    const currentScale = parseFloat(
                        getComputedStyle(document.documentElement).getPropertyValue('--logo-scale') || '1'
                    );
                    const hoverScale = currentScale * 1.05;
                    document.documentElement.style.setProperty('--logo-scale', hoverScale.toString());
                    document.documentElement.style.setProperty('--logo-width', '110');
                });
                logo.addEventListener('mouseleave', () => {
                    updateHeader();
                    document.documentElement.style.setProperty('--logo-width', '100');
                });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeHeader);
    } else {
        initializeHeader();
    }

    document.addEventListener('astro:page-load', () => {
        setTimeout(() => {
            initializeHeader();
            updateHeader();
        }, 100);
    });
}
