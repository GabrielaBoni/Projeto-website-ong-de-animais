/* ==========================================================================
   FORMULÁRIO DE ADOÇÃO — Validações, Campos Condicionais e Multi-etapas
   ========================================================================== */

(function () {
    'use strict';

    /* --- Aguarda o DOM estar pronto --- */
    document.addEventListener('DOMContentLoaded', initAdoptionForm);

    function initAdoptionForm() {
        var form = document.getElementById('adoption-form');
        if (!form) return;

        /* --- Referências do DOM --- */
        var btnPrev         = document.getElementById('form-btn-prev');
        var btnNext         = document.getElementById('form-btn-next');
        var btnSubmit       = document.getElementById('form-btn-submit');
        var progressFill    = document.getElementById('form-progress-fill');
        var progressBar     = progressFill ? progressFill.closest('[role="progressbar"]') : null;
        var currentStepEl   = document.getElementById('current-step-num');
        var successModal    = document.getElementById('success-modal');

        var felineFields    = document.getElementById('feline-fields');
        var petSelect       = document.getElementById('pet-interesse');
        var campoOutros     = document.getElementById('campo-outros-animais');
        var motivoTextarea  = document.getElementById('motivo-adocao');
        var motivoCount     = document.getElementById('motivo-count');
        var motivoCounter   = document.getElementById('motivo-counter');
        var telefoneInput   = document.getElementById('telefone-adotante');

        var TOTAL_STEPS = 4;
        var currentStep = 1;

        /* Pets que são gatos — campos felinos disparam se um destes for selecionado */
        var CAT_PETS = { apollo: true, orion: true, loki: true };

        /* --- Campos obrigatórios por etapa --- */
        var stepFields = {
            1: ['nome-adotante', 'email-adotante', 'telefone-adotante', 'idade-adotante', 'cidade-adotante'],
            2: ['tipo-moradia', 'moradia-propria', 'outros-animais'],
            3: ['pet-interesse'],
            4: ['horas-sozinho', 'motivo-adocao', 'termo-responsabilidade', 'termo-leitura']
        };

        /* --- Regras de validação --- */
        var rules = {
            'nome-adotante':        { required: true, minLength: 3, pattern: /^[A-Za-zÀ-ÿ\s]+$/ },
            'email-adotante':       { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            'telefone-adotante':    { required: true, pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/ },
            'idade-adotante':       { required: true, custom: function(v) { return +v >= 18 && +v <= 99; } },
            'cidade-adotante':      { required: true, minLength: 2 },
            'tipo-moradia':         { required: true },
            'moradia-propria':      { required: true, isRadio: true },
            'outros-animais':       { required: true, isRadio: true },
            'desc-outros-animais':  { required: false, minLength: 5 },
            'pet-interesse':        { required: true },
            'janelas-teladas':      { required: false, isRadio: true },
            'rotas-fuga':           { required: false, minLength: 20 },
            'horas-sozinho':        { required: true },
            'motivo-adocao':        { required: true, minLength: 30 },
            'termo-responsabilidade': { required: true, isCheckbox: true },
            'termo-leitura':          { required: true, isCheckbox: true }
        };

        /* --- Mensagens de erro amigáveis --- */
        var messages = {
            'nome-adotante': {
                required:  'Por favor, informe seu nome completo.',
                minLength: 'O nome deve ter pelo menos 3 caracteres.',
                pattern:   'O nome deve conter apenas letras e espaços.'
            },
            'email-adotante': {
                required: 'Por favor, informe seu e-mail.',
                pattern:  'Informe um e-mail válido (ex: nome@email.com).'
            },
            'telefone-adotante': {
                required: 'Por favor, informe seu telefone ou WhatsApp.',
                pattern:  'Formato inválido. Use: (11) 98888-7777.'
            },
            'idade-adotante': {
                required: 'Por favor, informe sua idade.',
                custom:   'É necessário ter entre 18 e 99 anos para adotar.'
            },
            'cidade-adotante': {
                required:  'Por favor, informe sua cidade.',
                minLength: 'Informe uma cidade válida.'
            },
            'tipo-moradia':    { required: 'Por favor, selecione seu tipo de moradia.' },
            'moradia-propria': { required: 'Por favor, informe se a moradia é própria ou alugada.' },
            'outros-animais':  { required: 'Por favor, informe se já possui outros animais.' },
            'desc-outros-animais': { minLength: 'Descreva brevemente quais animais você já possui.' },
            'pet-interesse':   { required: 'Por favor, selecione o animal de interesse.' },
            'janelas-teladas': { required: 'Por favor, responda sobre as telas de proteção nas janelas.' },
            'rotas-fuga': {
                required:  'Por favor, descreva como irá prevenir rotas de fuga.',
                minLength: 'Forneça mais detalhes (mínimo 20 caracteres).'
            },
            'horas-sozinho': { required: 'Por favor, informe quantas horas o animal ficará sozinho.' },
            'motivo-adocao': {
                required:  'Por favor, conte-nos sua motivação para adotar.',
                minLength: 'Desenvolva mais sua resposta (mínimo 30 caracteres).'
            },
            'termo-responsabilidade': { required: 'Você deve aceitar os Termos de Adoção Responsável.' },
            'termo-leitura':          { required: 'Você deve confirmar a leitura das responsabilidades.' }
        };

        /* ============================================================
           MÁSCARA DE TELEFONE
           ============================================================ */
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function () {
                var digits = this.value.replace(/\D/g, '').slice(0, 11);
                var masked = '';
                if (digits.length > 0)  masked = '(' + digits.slice(0, 2);
                if (digits.length > 2)  masked += ') ' + digits.slice(2, 7);
                if (digits.length > 7)  masked += '-' + digits.slice(7, 11);
                this.value = masked;
            });
        }

        /* ============================================================
           CONTADOR DE CARACTERES DO TEXTAREA "MOTIVO"
           ============================================================ */
        if (motivoTextarea && motivoCount) {
            motivoTextarea.addEventListener('input', function () {
                var len = this.value.trim().length;
                motivoCount.textContent = len;
                if (motivoCounter) {
                    motivoCounter.style.color = len >= 30 ? 'var(--success)' : '';
                }
                if (this.classList.contains('is-error')) {
                    validateField('motivo-adocao');
                }
            });
        }

        /* ============================================================
           CAMPOS CONDICIONAIS: OUTROS ANIMAIS
           ============================================================ */
        document.querySelectorAll('input[name="outros-animais"]').forEach(function (radio) {
            radio.addEventListener('change', handleOutrosAnimais);
        });

        function handleOutrosAnimais() {
            var val = getRadioValue('outros-animais');
            if (val === 'sim') {
                showConditional(campoOutros);
                rules['desc-outros-animais'].required = true;
            } else {
                hideConditional(campoOutros);
                rules['desc-outros-animais'].required = false;
                clearState('desc-outros-animais');
            }
        }

        /* ============================================================
           CAMPOS CONDICIONAIS: FELINOS
           ============================================================ */
        if (petSelect) {
            petSelect.addEventListener('change', handlePetSelect);
        }

        function handlePetSelect() {
            if (!petSelect || !felineFields) return;
            var isCat = CAT_PETS[petSelect.value] === true;

            if (isCat) {
                showConditional(felineFields);
                rules['janelas-teladas'].required = true;
                rules['rotas-fuga'].required = true;
            } else {
                hideConditional(felineFields);
                rules['janelas-teladas'].required = false;
                rules['rotas-fuga'].required = false;
                clearState('janelas-teladas');
                clearState('rotas-fuga');
            }
        }

        /* ============================================================
           UTILITÁRIOS: blocos condicionais
           ============================================================ */
        function showConditional(el) {
            if (el) el.classList.add('visible');
        }

        function hideConditional(el) {
            if (el) el.classList.remove('visible');
        }

        /* ============================================================
           VALIDAÇÃO DE UM CAMPO
           ============================================================ */
        function validateField(name) {
            var rule = rules[name];
            if (!rule) return true;

            var el       = document.getElementById(name);
            var errorEl  = document.getElementById('erro-' + name);
            var value    = '';

            if (rule.isRadio) {
                value = getRadioValue(name);
            } else if (rule.isCheckbox) {
                value = el && el.checked ? 'checked' : '';
            } else {
                value = el ? el.value.trim() : '';
            }

            /* Campo não obrigatório e vazio — OK */
            if (!rule.required && !value) {
                if (el && !rule.isRadio && !rule.isCheckbox) clearState(name);
                return true;
            }

            /* Obrigatório e vazio */
            if (rule.required && !value) {
                setError(el, errorEl, messages[name] && messages[name].required || 'Campo obrigatório.', rule);
                return false;
            }

            /* Comprimento mínimo */
            if (rule.minLength && value.length < rule.minLength) {
                setError(el, errorEl, messages[name] && messages[name].minLength || 'Muito curto.', rule);
                return false;
            }

            /* Padrão regex */
            if (rule.pattern && !rule.pattern.test(value)) {
                setError(el, errorEl, messages[name] && messages[name].pattern || 'Formato inválido.', rule);
                return false;
            }

            /* Validação customizada */
            if (rule.custom && !rule.custom(value)) {
                setError(el, errorEl, messages[name] && messages[name].custom || 'Valor inválido.', rule);
                return false;
            }

            setSuccess(el, errorEl, rule);
            return true;
        }

        function getRadioValue(name) {
            var checked = document.querySelector('input[name="' + name + '"]:checked');
            return checked ? checked.value : '';
        }

        function setError(el, errorEl, msg, rule) {
            if (el && !rule.isRadio && !rule.isCheckbox) {
                el.classList.remove('is-valid');
                el.classList.add('is-error');
            }
            if (errorEl) {
                errorEl.textContent = msg;
                errorEl.classList.add('visible');
            }
        }

        function setSuccess(el, errorEl, rule) {
            if (el && !rule.isRadio && !rule.isCheckbox) {
                el.classList.remove('is-error');
                el.classList.add('is-valid');
            }
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('visible');
            }
        }

        function clearState(name) {
            var el = document.getElementById(name);
            var errorEl = document.getElementById('erro-' + name);
            if (el) el.classList.remove('is-error', 'is-valid');
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('visible');
            }
        }

        /* ============================================================
           VALIDAÇÃO DE TODA UMA ETAPA
           ============================================================ */
        function validateStep(stepNum) {
            var fields = stepFields[stepNum] || [];
            var allValid = true;

            fields.forEach(function (name) {
                if (!validateField(name)) allValid = false;
            });

            /* Etapa 2: campo condicional "outros animais" */
            if (stepNum === 2 && campoOutros && campoOutros.classList.contains('visible')) {
                if (!validateField('desc-outros-animais')) allValid = false;
            }

            /* Etapa 3: campos condicionais de felinos */
            if (stepNum === 3 && felineFields && felineFields.classList.contains('visible')) {
                if (!validateField('janelas-teladas')) allValid = false;
                if (!validateField('rotas-fuga')) allValid = false;
            }

            return allValid;
        }

        /* ============================================================
           NAVEGAÇÃO ENTRE ETAPAS
           ============================================================ */
        function goToStep(step) {
            var oldStepEl = document.getElementById('step-' + currentStep);
            if (oldStepEl) oldStepEl.classList.remove('active');

            /* Atualiza indicadores visuais */
            document.querySelectorAll('.step-item').forEach(function (item) {
                var n = +item.getAttribute('data-step');
                item.classList.remove('active', 'done');
                if (n < step)  item.classList.add('done');
                if (n === step) item.classList.add('active');
            });

            document.querySelectorAll('.step-connector').forEach(function (conn, i) {
                if (i < step - 1) conn.classList.add('done');
                else conn.classList.remove('done');
            });

            currentStep = step;

            var newStepEl = document.getElementById('step-' + currentStep);
            if (newStepEl) newStepEl.classList.add('active');

            /* Barra de progresso */
            var pct = Math.round((currentStep / TOTAL_STEPS) * 100);
            if (progressFill)  progressFill.style.width = pct + '%';
            if (progressBar)   progressBar.setAttribute('aria-valuenow', pct);

            /* Botões de navegação */
            if (btnPrev)   btnPrev.style.display   = currentStep === 1            ? 'none'        : 'inline-flex';
            if (btnNext)   btnNext.style.display   = currentStep === TOTAL_STEPS  ? 'none'        : 'inline-flex';
            if (btnSubmit) btnSubmit.style.display = currentStep === TOTAL_STEPS  ? 'inline-flex' : 'none';

            /* Label de etapa */
            if (currentStepEl) currentStepEl.textContent = currentStep;

            /* Rolar suavemente para o topo da seção */
            var section = document.querySelector('.adoption-form-section');
            if (section) {
                var top = section.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        }

        /* ============================================================
           EVENTOS DOS BOTÕES
           ============================================================ */
        if (btnNext) {
            btnNext.addEventListener('click', function () {
                if (validateStep(currentStep)) {
                    goToStep(currentStep + 1);
                } else {
                    shakeBtnNext();
                    focusFirstError(currentStep);
                }
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', function () {
                if (currentStep > 1) goToStep(currentStep - 1);
            });
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateStep(4)) {
                showSuccessModal();
            } else {
                focusFirstError(4);
            }
        });

        function shakeBtnNext() {
            if (!btnNext) return;
            btnNext.classList.add('btn-shake');
            setTimeout(function () { btnNext.classList.remove('btn-shake'); }, 500);
        }

        function focusFirstError(stepNum) {
            var stepEl = document.getElementById('step-' + stepNum);
            if (!stepEl) return;
            var firstError = stepEl.querySelector('.form-control.is-error');
            if (firstError) firstError.focus();
        }

        /* ============================================================
           MODAL DE SUCESSO
           ============================================================ */
        function showSuccessModal() {
            if (!successModal) return;
            successModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            /* Foco acessível no modal */
            var firstFocusable = successModal.querySelector('a, button, [tabindex]');
            if (firstFocusable) setTimeout(function () { firstFocusable.focus(); }, 400);
        }

        /* Fechar modal ao clicar no fundo (overlay) */
        if (successModal) {
            successModal.addEventListener('click', function (e) {
                if (e.target === successModal) {
                    successModal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }

        /* ============================================================
           VALIDAÇÃO EM TEMPO REAL
           — ao perder o foco: valida
           — ao digitar em campo com erro: re-valida
           ============================================================ */
        document.querySelectorAll('.form-control').forEach(function (input) {
            input.addEventListener('blur', function () {
                var name = this.name || this.id;
                if (name) validateField(name);
            });
            input.addEventListener('input', function () {
                if (this.classList.contains('is-error')) {
                    var name = this.name || this.id;
                    if (name) validateField(name);
                }
            });
        });

        document.querySelectorAll('input[type="radio"]').forEach(function (radio) {
            radio.addEventListener('change', function () {
                validateField(this.name);
            });
        });

        document.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
            cb.addEventListener('change', function () {
                validateField(this.id);
            });
        });

        /* ============================================================
           PRÉ-SELEÇÃO VIA PARÂMETRO DE URL (?pet=apollo)
           ============================================================ */
        var urlParams = new URLSearchParams(window.location.search);
        var petParam  = urlParams.get('pet');
        if (petParam && petSelect) {
            var targetOption = Array.from(petSelect.options).find(function (o) {
                return o.value === petParam;
            });
            if (targetOption) {
                petSelect.value = petParam;
                handlePetSelect();
            }
        }

    }

})();
