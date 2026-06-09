/* ==========================================================================
   CONTATO — Validação e Envio do Formulário de Mensagem
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById('contact-form');
    const successModal = document.getElementById('contact-success-modal');
    const msgTextarea = document.getElementById('contact-mensagem');
    const msgCountEl = document.getElementById('msg-count');

    if (!form) return;

    // Contador de caracteres da mensagem
    if (msgTextarea && msgCountEl) {
        msgTextarea.addEventListener('input', () => {
            msgCountEl.textContent = msgTextarea.value.length;
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        const fields = [
            { id: 'contact-nome',     msg: 'Informe seu nome completo.' },
            { id: 'contact-email',    msg: 'Informe um e-mail válido.', validate: 'email' },
            { id: 'contact-assunto',  msg: 'Selecione um assunto.', isSelect: true },
            { id: 'contact-mensagem', msg: 'Escreva sua mensagem (mínimo 20 caracteres).', minLen: 20 },
        ];

        fields.forEach(({ id, msg, validate, minLen, isSelect }) => {
            const input = document.getElementById(id);
            const errorEl = document.getElementById('erro-' + id);
            if (!input) return;

            clearFieldError(input, errorEl);

            const value = input.value.trim();

            if (!value) {
                setFieldError(input, errorEl, msg);
                isValid = false;
            } else if (validate === 'email' && !isValidEmail(value)) {
                setFieldError(input, errorEl, msg);
                isValid = false;
            } else if (minLen && value.length < minLen) {
                setFieldError(input, errorEl, msg);
                isValid = false;
            }
        });

        if (!isValid) {
            shakeSendButton(form);
            scrollToFirstError(form);
            return;
        }

        // Exibe modal de sucesso
        if (successModal) {
            successModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            form.reset();
            if (msgCountEl) msgCountEl.textContent = '0';
        }
    });

    // Fechar modal ao clicar fora
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Limpar erros ao editar campos
    form.querySelectorAll('.form-control').forEach(input => {
        const event = input.tagName === 'SELECT' ? 'change' : 'input';
        input.addEventListener(event, () => {
            const errorEl = document.getElementById('erro-' + input.id);
            clearFieldError(input, errorEl);
        });
    });
}

/* --- Helpers --- */
function setFieldError(input, errorEl, msg) {
    input.classList.add('is-error');
    input.classList.remove('is-valid');
    if (errorEl) {
        errorEl.textContent = msg;
        errorEl.classList.add('visible');
    }
}

function clearFieldError(input, errorEl) {
    input.classList.remove('is-error');
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeSendButton(form) {
    const btn = form.querySelector('[type="submit"]');
    if (!btn) return;
    btn.classList.add('btn-shake');
    btn.addEventListener('animationend', () => btn.classList.remove('btn-shake'), { once: true });
}

function scrollToFirstError(form) {
    const firstError = form.querySelector('.is-error');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
