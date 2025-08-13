export default function initSectionHeadings() {
    let ticking = false;
    let cachedElements: {
        element: HTMLElement;
        offsetTop: number;
        height: number;
    }[] = [];
    let windowHeight = window.innerHeight;
    let lastScrollY = 0;

    function cacheElements() {
        const sectionHeadings = document.querySelectorAll('.section-heading');
        cachedElements = Array.from(sectionHeadings).map((heading) => {
            const rect = heading.getBoundingClientRect();
            const offsetTop = rect.top + window.scrollY;
            return {
                element: heading as HTMLElement,
                offsetTop,
                height: rect.height,
            };
        });
        windowHeight = window.innerHeight;
    }

    function updateSectionHeadings() {
        const scrollY = window.scrollY;
        const scrollDelta = Math.abs(scrollY - lastScrollY);
        const viewportCenter = scrollY + windowHeight / 2;
        const maxDistance = windowHeight / 2;
        const isScrollingFast = scrollDelta > 20;

        cachedElements.forEach((item) => {
            const elementCenter = item.offsetTop + item.height / 2;
            const distanceFromCenter = Math.abs(elementCenter - viewportCenter);

            if (isScrollingFast && distanceFromCenter > windowHeight) {
                return;
            }

            const proximityFactor = Math.max(0, 1 - distanceFromCenter / maxDistance);
            const minWeight = 300;
            const maxWeight = 600;
            const fontWeight = Math.round(
                minWeight + proximityFactor * (maxWeight - minWeight),
            );
            const minWidth = 100;
            const maxWidth = 115;
            const fontWidth = Math.round(
                minWidth + proximityFactor * (maxWidth - minWidth),
            );

            const currentWeight = item.element.dataset.currentWeight || '300';
            const currentWidth = item.element.dataset.currentWidth || '100';
            if (
                Math.abs(parseInt(currentWeight) - fontWeight) > 2 ||
                Math.abs(parseInt(currentWidth) - fontWidth) > 1
            ) {
                item.element.style.fontVariationSettings = `'wght' ${fontWeight}, 'wdth' ${fontWidth}, 'slnt' 0`;
                item.element.dataset.currentWeight = fontWeight.toString();
                item.element.dataset.currentWidth = fontWidth.toString();
            }
        });

        lastScrollY = scrollY;
        ticking = false;
    }

    function handleSectionScroll() {
        if (!ticking) {
            const scrollDelta = Math.abs(window.scrollY - lastScrollY);
            if (scrollDelta > 30) {
                updateSectionHeadings();
            } else {
                requestAnimationFrame(updateSectionHeadings);
                ticking = true;
            }
        }
    }

    let resizeTimeout: ReturnType<typeof setTimeout>;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            cacheElements();
            updateSectionHeadings();
        }, 150);
    }

    function initialize() {
        cacheElements();
        updateSectionHeadings();
        window.addEventListener('scroll', handleSectionScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    document.addEventListener('astro:page-load', () => {
        setTimeout(initialize, 100);
    });
}
