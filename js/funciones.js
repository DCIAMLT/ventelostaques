/**
 * Lógica de Interfaz de Usuario Corporativa - Vente Venezuela
 */
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    highlightActiveLink();
});

/**
 * Control Dinámico del Menú de Hamburguesa
 */
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

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('remove');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/**
 * Resaltado automático de la sección activa según la estructura de carpetas
 */
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Manejo del home / raíz
        if (href === '/' && (currentPath === '/' || currentPath === '/index.html')) {
            link.classList.add('active');
        } 
        // Manejo de subcarpetas organizadas
        else if (href !== '/' && currentPath.includes(href)) {
            link.classList.add('active');
        }
    });
}
