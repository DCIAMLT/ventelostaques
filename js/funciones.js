/**
 * Lógica de Interfaz de Usuario Corporativa - Vente Venezuela (Optimizado)
 */
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    highlightActiveLink();
});

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').replace('../', '');
        
        if (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html'))) {
            link.classList.add('active');
        } else if (href !== 'index.html' && currentPath.includes(href)) {
            link.classList.add('active');
        }
    });
}
