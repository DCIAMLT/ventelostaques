/**
 * Lógica de Interfaz de Usuario Corporativa - Vente Los Taques
 */
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initMobileMenu();
    highlightActiveLink();
    initAfiliacionForm();
});

/**
 * Control del Loader de Bienvenida (3.5 Segundos Estables)
 */
function initLoader() {
    const loader = document.getElementById('loader-bienvenida');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('ocultar');
        }, 3500);
    }
}

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

/**
 * Animación y Manejo Exclusivo de Inscripción
 */
function initAfiliacionForm() {
    const form = document.getElementById('form-afiliacion');
    const panelExito = document.getElementById('panel-exito');
    
    if (form && panelExito) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Detiene recarga para mostrar animación
            
            // Simulación estética de envío institucional exitoso
            panelExito.classList.add('activado');
            form.reset();
        });
    }
}
