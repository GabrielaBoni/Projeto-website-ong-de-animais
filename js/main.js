/* ==========================================================================
   GLOBAL INTERACTIVITY & COMPONENT CONTROLLER
   ========================================================================== */

/* --- Dados dos Pets (fonte única de verdade) --- */
const PETS_DATA = {
    julie: {
        nome: 'Julie',
        especie: 'cachorro',
        raca: 'Beagle',
        idadeTexto: '2 anos',
        idadeGrupo: 'jovem',
        porte: 'Médio',
        sexo: 'Fêmea',
        status: 'disponivel',
        vacinada: true,
        castrada: true,
        vermifugada: true,
        microchip: true,
        fotos: ['img/julie1.jfif', 'img/julie2.jfif', 'img/julie3.jfif'],
        fotosPosicao: ['top center', 'top center', 'top center'],
        tagEspecie: '🐕 Cachorro',
        tagEspecieClass: 'detail-tag-dog',
        intro: 'A Julie é pura alegria em formato Beagle! Curiosa por natureza, ela transforma qualquer caminhada em uma aventura olfativa. Com seus olhos expressivos e orelhas compridas, ela não precisa de palavras para comunicar o quanto ama companhia.',
        historico: 'Julie foi encontrada sozinha em uma praça do bairro, desorientada e com sinais de que havia passado dias sem comer. Uma moradora local a resgatou e nos contactou imediatamente. Desde os primeiros minutos no abrigo, ela deu sinais de que tinha sido amada antes — busca carinho, sabe sentar ao comando e adora dormir no colo. O abandono claramente não foi culpa dela.',
        personalidade: 'Julie é extrovertida e comunicativa; você saberá exatamente o que ela está sentindo. Adora crianças, se dá bem com outros cães após apresentação adequada, e tem energia para passeios longos. Mas ao final do dia, o lugar favorito dela é ao seu lado no sofá, com a cabeça apoiada no seu colo e os olhos semicerrados de felicidade.'
    },
    apollo: {
        nome: 'Apollo',
        especie: 'gato',
        raca: 'SRD',
        idadeTexto: '5 anos',
        idadeGrupo: 'adulto',
        porte: 'Médio',
        sexo: 'Macho',
        status: 'disponivel',
        vacinada: true,
        castrada: true,
        vermifugada: true,
        microchip: false,
        fotos: ['img/apollo1.jfif', 'img/apollo2.jfif', 'img/apollo3.jfif'],
        fotosPosicao: ['top center', 'center', 'top center'],
        tagEspecie: '🐈 Gato',
        tagEspecieClass: 'detail-tag-cat',
        intro: 'Apollo tem a elegância tranquila de quem já conhece o peso do mundo e decidiu ignorá-lo. Aos 5 anos, ele chegou ao ponto de equilíbrio perfeito: independente quando quer, amoroso quando decide. E quando ele decide, vale cada segundo de espera.',
        historico: 'Apollo foi entregue ao abrigo quando seu tutor precisou mudar para uma residência que não aceitava animais. Para um gato de 5 anos, mudar de casa é um trauma silencioso. Apollo levou algumas semanas para confiar novamente, mas hoje ele nos mostra que aprender a amar de novo é possível — e que vale cada momento da jornada.',
        personalidade: 'Observador e calculista no melhor sentido, Apollo escolhe seus humanos com cuidado. Uma vez que ganha sua confiança, torna-se um companheiro fiel: aparece para ronronar do seu lado quando você está triste, respeita seu espaço quando precisa trabalhar, e vigia a casa com olhar sereno. Perfeito para um lar tranquilo.'
    },
    orion: {
        nome: 'Orion',
        especie: 'gato',
        raca: 'SRD',
        idadeTexto: '5 anos',
        idadeGrupo: 'adulto',
        porte: 'Médio',
        sexo: 'Macho',
        status: 'disponivel',
        vacinada: true,
        castrada: true,
        vermifugada: true,
        microchip: false,
        fotos: ['img/orion1.jfif', 'img/orion2.jfif', 'img/orion3.jfif'],
        fotosPosicao: ['top center', 'top center', 'top center'],
        tagEspecie: '🐈 Gato',
        tagEspecieClass: 'detail-tag-cat',
        intro: 'Orion leva o nome de uma das constelações mais brilhantes do céu — e faz jus a ele. Com olhos que parecem guardar segredos do universo e uma presença calma que transforma o ambiente, ele é o tipo de gato que muda silenciosamente a energia do lugar onde vive.',
        historico: 'Orion foi resgatado de uma rua movimentada do centro da cidade com ferimentos leves, escondido sob um carro, assustado mas sem perder a dignidade. Após cuidados veterinários e semanas de reabilitação com nossa equipe de voluntários, a vida voltou aos seus olhos. Hoje, ele é prova de que resiliência e amor caminham juntos.',
        personalidade: 'Orion é brincalhão de forma refinada: prefere varinha de penas a bolas de plástico. Se dá muito bem com outros gatos e costuma adotar o papel de calmante do grupo. Com pessoas, é afetivo mas nunca invasivo — o equilíbrio ideal para quem quer companhia sem abrir mão de espaço.'
    },
    loki: {
        nome: 'Loki',
        especie: 'gato',
        raca: 'SRD',
        idadeTexto: '1 ano',
        idadeGrupo: 'jovem',
        porte: 'Pequeno',
        sexo: 'Macho',
        status: 'disponivel',
        vacinada: true,
        castrada: true,
        vermifugada: true,
        microchip: false,
        fotos: ['img/loki1.jfif', 'img/loki2.jfif', 'img/loki3.jfif'],
        fotosPosicao: ['top center', 'center', 'center'],
        tagEspecie: '🐈 Gato',
        tagEspecieClass: 'detail-tag-cat',
        intro: 'Alguém deu o nome certo para Loki: ele é travesso, imprevisível e completamente irresistível. Com apenas 1 ano de vida, ainda tem toda a energia e curiosidade de um filhote, mas já demonstra a profundidade afetiva de um gato que sabe exatamente o valor de um humano bom.',
        historico: 'Loki foi encontrado dentro de uma caixa de papelão em frente a uma padaria, com apenas algumas semanas de vida. Sozinho, sem a mãe ou irmãos. Foi criado no colo de uma de nossas voluntárias, que o alimentou de hora em hora durante as primeiras semanas. Por isso ele não tem medo de humanos — para ele, humanos são puro sinônimo de amor.',
        personalidade: 'Loki transforma qualquer apartamento em playground. Ele explora cada canto, testa cada limite e, no final, sempre volta para pedir colo com aquela expressão que diz: "eu sei que você não consegue ficar bravo comigo." Indicado para quem tem energia e quer um companheiro ativo, curioso e incrivelmente carinhoso.'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes globais
    initMobileMenu();
    highlightActiveLink();
    initAnimalFilters();
    initDetailPage();
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
 * --- Página de Detalhes: renderiza conteúdo dinâmico via URL param ?pet=slug ---
 */
function initDetailPage() {
    const fichaGrid = document.getElementById('ficha-grid');
    if (!fichaGrid) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('pet');

    if (!slug || !PETS_DATA[slug]) {
        window.location.href = 'animais.html';
        return;
    }

    const pet = PETS_DATA[slug];
    const contactUrl = 'adotar.html?pet=' + slug;

    // Título da aba e meta description
    document.title = pet.nome + ' | Patinhas Unidas';
    const metaDesc = document.getElementById('meta-desc');
    if (metaDesc) metaDesc.setAttribute('content', 'Conheça ' + pet.nome + ', disponível para adoção na Patinhas Unidas. ' + pet.intro.substring(0, 100) + '...');

    // Breadcrumb
    const breadcrumbName = document.getElementById('breadcrumb-name');
    if (breadcrumbName) breadcrumbName.textContent = pet.nome;

    // Nome e badge de status
    document.getElementById('detail-name').textContent = pet.nome;

    const statusBadge = document.getElementById('detail-status-badge');
    if (pet.status === 'disponivel') {
        statusBadge.textContent = 'Disponível';
        statusBadge.className = 'animal-status-badge status-disponivel';
    } else {
        statusBadge.textContent = 'Adotado';
        statusBadge.className = 'animal-status-badge status-adotado';
    }

    // Tags
    const tagsEl = document.getElementById('detail-tags');
    const tagsData = [
        { text: pet.tagEspecie, cls: pet.tagEspecieClass },
        { text: pet.raca },
        { text: pet.sexo },
        { text: pet.idadeTexto },
        { text: pet.porte }
    ];
    tagsEl.innerHTML = tagsData.map(function(t) {
        return '<span class="detail-tag ' + (t.cls || '') + '">' + t.text + '</span>';
    }).join('');

    // Introdução emocional
    document.getElementById('detail-intro').textContent = pet.intro;

    // Info rápida (4 items)
    const especieIcon = pet.especie === 'gato' ? '🐈' : '🐕';
    const sexoIcon = pet.sexo === 'Fêmea' ? '♀️' : '♂️';
    document.getElementById('detail-quick-info').innerHTML =
        buildQuickItem('📏', 'Porte', pet.porte) +
        buildQuickItem('🎂', 'Idade', pet.idadeTexto) +
        buildQuickItem(especieIcon, 'Espécie', pet.especie.charAt(0).toUpperCase() + pet.especie.slice(1)) +
        buildQuickItem(sexoIcon, 'Sexo', pet.sexo);

    // CTAs
    const ctaTop = document.getElementById('cta-top');
    const ctaBottom = document.getElementById('cta-bottom');

    if (pet.status === 'adotado') {
        [ctaTop, ctaBottom].forEach(function(el) {
            el.textContent = 'Já foi adotado(a) ❤️';
            el.className = el.className.replace('btn-primary', 'btn-outline');
            el.style.pointerEvents = 'none';
            el.removeAttribute('href');
        });
    } else {
        ctaTop.href = contactUrl;
        ctaBottom.href = contactUrl;
    }

    // Ficha técnica
    const fichaItems = [
        { icon: '💉', label: 'Vacinado(a)', value: pet.vacinada, ok: pet.vacinada },
        { icon: '✂️', label: 'Castrado(a)', value: pet.castrada, ok: pet.castrada },
        { icon: '🪱', label: 'Vermifugado(a)', value: pet.vermifugada, ok: pet.vermifugada },
        { icon: '📡', label: 'Microchip', value: pet.microchip, ok: pet.microchip },
        { icon: '🏥', label: 'Avaliação Vet.', value: true, ok: true },
        { icon: '🏠', label: 'Status de Adoção', value: pet.status === 'disponivel' ? 'Disponível' : 'Adotado', ok: pet.status === 'disponivel', isText: true }
    ];

    fichaGrid.innerHTML = fichaItems.map(function(item) {
        var iconClass = item.ok ? 'icon-ok' : 'icon-neutral';
        var valueClass = item.ok ? 'value-ok' : 'value-no';
        var displayValue = item.isText ? item.value : (item.value ? '✔ Sim' : '✖ Não');
        return '<div class="ficha-item">' +
            '<div class="ficha-item-icon ' + iconClass + '">' + item.icon + '</div>' +
            '<div class="ficha-item-text">' +
                '<span class="ficha-item-label">' + item.label + '</span>' +
                '<span class="ficha-item-value ' + valueClass + '">' + displayValue + '</span>' +
            '</div>' +
        '</div>';
    }).join('');

    // Seção de história
    document.getElementById('story-title').textContent = 'A história de ' + pet.nome;
    document.getElementById('story-grid').innerHTML =
        '<div class="story-card">' +
            '<div class="story-card-icon story-icon-rescue">🏥</div>' +
            '<h3>Como chegou até nós</h3>' +
            '<p>' + pet.historico + '</p>' +
        '</div>' +
        '<div class="story-card">' +
            '<div class="story-card-icon story-icon-personality">✨</div>' +
            '<h3>Personalidade</h3>' +
            '<p>' + pet.personalidade + '</p>' +
        '</div>';

    // CTA section
    document.getElementById('cta-pet-name').textContent = pet.nome;
    var pronto = pet.sexo === 'Fêmea' ? 'pronta' : 'pronto';
    document.getElementById('cta-desc').textContent =
        pet.nome + ' já está ' + pronto + ' para te encontrar. O processo de adoção é gratuito e ' +
        'inclui uma entrevista rápida para garantir que o lar seja o mais adequado possível para ambos.';

    // Iniciar carrossel
    initCarousel(pet.fotos, pet.fotosPosicao, pet.nome);
}

function buildQuickItem(icon, label, value) {
    return '<div class="quick-info-item">' +
        '<span class="quick-info-icon">' + icon + '</span>' +
        '<div class="quick-info-text">' +
            '<span class="quick-info-label">' + label + '</span>' +
            '<span class="quick-info-value">' + value + '</span>' +
        '</div>' +
    '</div>';
}

/**
 * --- Carrossel de Fotos (manual + auto-play + miniaturas + teclado) ---
 */
function initCarousel(photos, positions, petNome) {
    const mainImg      = document.getElementById('carousel-img');
    const counter      = document.getElementById('carousel-counter');
    const thumbsWrap   = document.getElementById('carousel-thumbs');
    const prevBtn      = document.getElementById('carousel-prev');
    const nextBtn      = document.getElementById('carousel-next');
    const carouselMain = document.getElementById('carousel-main');

    if (!mainImg || !photos || photos.length === 0) return;

    var current = 0;
    var total = photos.length;

    // Oculta botões se houver apenas uma foto
    if (total <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        if (counter) counter.style.display = 'none';
    }

    function goTo(index) {
        current = ((index % total) + total) % total;

        mainImg.classList.add('fade-out');
        setTimeout(function() {
            mainImg.src = photos[current];
            mainImg.alt = petNome + ' — foto ' + (current + 1);
            mainImg.style.objectPosition = positions[current] || 'top center';
            mainImg.classList.remove('fade-out');
        }, 160);

        if (counter) counter.textContent = (current + 1) + ' / ' + total;

        thumbsWrap.querySelectorAll('.carousel-thumb').forEach(function(t, i) {
            t.classList.toggle('active', i === current);
            t.setAttribute('aria-pressed', i === current ? 'true' : 'false');
        });
    }

    // Construir miniaturas
    photos.forEach(function(src, i) {
        var btn = document.createElement('button');
        btn.className = 'carousel-thumb' + (i === 0 ? ' active' : '');
        btn.setAttribute('role', 'listitem');
        btn.setAttribute('aria-label', 'Ver foto ' + (i + 1));
        btn.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');

        var img = document.createElement('img');
        img.src = src;
        img.alt = petNome + ' — miniatura ' + (i + 1);
        img.loading = 'lazy';

        btn.appendChild(img);
        btn.addEventListener('click', function() {
            goTo(i);
        });
        thumbsWrap.appendChild(btn);
    });

    // Estado inicial
    mainImg.src = photos[0];
    mainImg.alt = petNome + ' — foto 1';
    mainImg.style.objectPosition = positions[0] || 'top center';
    if (counter) counter.textContent = '1 / ' + total;

    // Navegação por setas
    if (prevBtn) {
        prevBtn.addEventListener('click', function() { goTo(current - 1); });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function() { goTo(current + 1); });
    }

    // Navegação por teclado (←  →)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft')  { goTo(current - 1); }
        if (e.key === 'ArrowRight') { goTo(current + 1); }
    });

    // Swipe básico para mobile
    var touchStartX = 0;
    if (carouselMain) {
        carouselMain.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });
        carouselMain.addEventListener('touchend', function(e) {
            var diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                goTo(diff > 0 ? current + 1 : current - 1);
            }
        }, { passive: true });
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
