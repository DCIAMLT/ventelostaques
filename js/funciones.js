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
 * Control del Loader de Bienvenida e Interno Dinámico
 */
function initLoader() {
    const loader = document.getElementById('loader-bienvenida');
    const loaderTexto = document.getElementById('loader-texto');
    
    if (loader) {
        // Detectamos si estamos en la página de inicio (index.html o raíz)
        const esInicio = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
        
        if (!esInicio && loaderTexto) {
            // Obtenemos el título de la pestaña actual (ej: "Propuestas | Vente Los Taques")
            // Y extraemos solo la primera parte limpia
            const tituloLimpio = document.title.split('|')[0].trim();
            loaderTexto.textContent = `Cargando ${tituloLimpio}...`;
        }
        
        // Tiempo de espera adaptado: 3.5s para inicio (impacto), 1.5s para internas (rapidez)
        const tiempoEspera = esInicio ? 3500 : 1500;
        
        setTimeout(() => {
            loader.classList.add('ocultar');
        }, tiempoEspera);
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
