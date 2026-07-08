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

// Busca el formulario en la página
const formularioInscripcion = document.querySelector('.formulario-inscripcion');
const panelExito = document.getElementById('panel-exito');

if (formularioInscripcion) {
    formularioInscripcion.addEventListener('submit', function(event) {
        event.preventDefault();

        const datosFormulario = new FormData(formularioInscripcion);

        fetch(formularioInscripcion.action, {
            method: formularioInscripcion.method,
            body: datosFormulario,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
    // Oculta el formulario para que no estorbe
    formularioInscripcion.style.display = 'none';
    
    // Muestra el panel centrado
    if (panelExito) {
        panelExito.style.display = 'flex';
    }
    formularioInscripcion.reset();
} else {
                alert('Hubo un inconveniente al enviar tus datos. Por favor, inténtalo de nuevo.');
            }
        })
        .catch(error => {
            alert('Error de conexión. Inténtalo de nuevo más tarde.');
        });
    });
}
/**
 * Automatización de Botones para Compartir en Redes Sociales
 */
function configurarBotonesCompartir() {
    // 1. Capturamos la URL y el Título real de la página actual
    const urlNoticia = encodeURIComponent(window.location.href);
    const tituloNoticia = encodeURIComponent(document.title.split('|')[0].trim());

    // 2. Buscamos los botones en el HTML
    const btnWs = document.getElementById('share-ws');
    const btnFb = document.getElementById('share-fb');
    const btnTw = document.getElementById('share-tw');

    // 3. Si los botones existen en la página, les inyectamos los enlaces automáticos
    if (btnWs) {
        btnWs.href = `https://api.whatsapp.com/send?text=${tituloNoticia}%20-%20${urlNoticia}`;
    }
    if (btnFb) {
        btnFb.href = `https://www.facebook.com/sharer/sharer.php?u=${urlNoticia}`;
    }
    if (btnTw) {
        btnTw.href = `https://twitter.com/intent/tweet?text=${tituloNoticia}&url=${urlNoticia}`;
    }
}

// Nos aseguramos de que la función se ejecute apenas cargue la página
document.addEventListener('DOMContentLoaded', configurarBotonesCompartir);

// ==========================================================================
// CONTROLADOR DEL FORMULARIO DE CONTACTO
// ==========================================================================
const formularioContacto = document.querySelector('.formulario-contacto');
const panelExitoContacto = document.getElementById('panel-exito-contacto');

if (formularioContacto) {
    formularioContacto.addEventListener('submit', function(event) {
        // 1. Frenamos la redirección a la página de Formspree
        event.preventDefault();

        // 2. Capturamos los datos escritos
        const datosContacto = new FormData(formularioContacto);

        // 3. Enviamos los datos por detrás de forma invisible
        fetch(formularioContacto.action, {
            method: formularioContacto.method,
            body: datosContacto,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // 4. Si todo sale bien, ocultamos los campos y activamos el mensaje de éxito
                formularioContacto.style.display = 'none';
                if (panelExitoContacto) {
                    panelExitoContacto.style.display = 'flex';
                }
                formularioContacto.reset(); // Limpiamos el formulario
            } else {
                alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
            }
        })
        .catch(error => {
            alert('Error de conexión. Revisa tu internet e inténtalo más tarde.');
        });
    });
}
