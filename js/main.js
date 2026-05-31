/* ==========================================================================
   GLOBAL INTERACTIVITY & COMPONENT CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes globais
    initMobileMenu();
    highlightActiveLink();
});

/**
 * --- Controle do Menu Hambúrguer (Mobile Navigation) ---
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        
        // Bloquear scroll do body quando o menu estiver aberto
        if (navMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Fechar menu ao clicar em qualquer link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/**
 * --- Destacar o link correspondente à página atual ---
 */
function highlightActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        // Extrai o nome do arquivo da URL (ex: 'index.html')
        const linkHref = link.getAttribute('href');
        
        // Se a rota bater com a rota atual, marca como ativo
        if (currentPath.endsWith(linkHref) || (currentPath.endsWith('/') && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
