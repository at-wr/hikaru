export default function setupEmailProtection() {
    function setup() {
        const emailLink = document.getElementById('email-link');
        if (emailLink) {
            const user = 'hcaer';
            const domain = 'ved.eyrw';
            const actualEmail =
                user.split('').reverse().join('') +
                '@' +
                domain.split('').reverse().join('');
            emailLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'mailto:' + actualEmail;
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }

    document.addEventListener('astro:page-load', () => {
        setTimeout(setup, 100);
    });
}
