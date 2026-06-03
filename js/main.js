/* ==========================================================================
   GLOBAL INTERACTIVITY & COMPONENT CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes globais
    initMobileMenu();
    highlightActiveLink();
    initAnimalFilters();
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
 * --- Catálogo de Animais: busca textual + filtros combinados via DOM ---
 */
function initAnimalFilters() {
    const grid = document.getElementById('animals-grid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.animal-card');
    const searchInput = document.getElementById('animal-search');
    const searchClear = document.getElementById('search-clear');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');
    const resetBtn = document.getElementById('reset-filters');

    // Estado ativo de cada grupo de filtro
    const activeFilters = { species: 'todos', age: 'todos', status: 'todos' };

    function applyFilters() {
        const term = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let visible = 0;

        cards.forEach(card => {
            const matchSearch  = !term || card.dataset.name.includes(term);
            const matchSpecies = activeFilters.species === 'todos' || card.dataset.species === activeFilters.species;
            const matchAge     = activeFilters.age    === 'todos' || card.dataset.ageGroup === activeFilters.age;
            const matchStatus  = activeFilters.status === 'todos' || card.dataset.status   === activeFilters.status;

            const show = matchSearch && matchSpecies && matchAge && matchStatus;
            card.style.display = show ? '' : 'none';
            if (show) visible++;
        });

        if (resultsCount) resultsCount.textContent = visible;
        if (noResults) noResults.style.display = visible === 0 ? 'flex' : 'none';
    }

    // Busca em tempo real
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            if (searchClear) searchClear.style.display = searchInput.value ? '' : 'none';
            applyFilters();
        });
    }

    // Limpar campo de busca
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchClear.style.display = 'none';
            applyFilters();
        });
    }

    // Botões de filtro — cada clique atualiza o grupo correspondente
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.dataset.filterGroup;
            const value = btn.dataset.filterValue;

            document.querySelectorAll(`.filter-btn[data-filter-group="${group}"]`).forEach(b => {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            activeFilters[group] = value;
            applyFilters();
        });
    });

    // Botão "Limpar Filtros" no estado vazio
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (searchClear) searchClear.style.display = 'none';

            Object.keys(activeFilters).forEach(k => { activeFilters[k] = 'todos'; });

            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filterValue === 'todos');
            });

            applyFilters();
        });
    }
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
