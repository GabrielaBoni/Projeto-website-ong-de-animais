/* ==========================================================================
   VOLUNTARIADO — Validação e Envio do Formulário de Inscrição
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initVolunteerForm();
});

function initVolunteerForm() {
    const form = document.getElementById('volunteer-form');
    const successModal = document.getElementById('volunteer-success-modal');

    if (!form) return;

    applyPhoneMask(document.getElementById('vol-telefone'));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // --- Campos de texto / email ---
        const textFields = [
            { id: 'vol-nome',     msg: 'Informe seu nome completo.' },
            { id: 'vol-email',    msg: 'Informe um e-mail válido.', validate: 'email' },
            { id: 'vol-telefone', msg: 'Informe um telefone válido (mín. 10 dígitos).', validate: 'phone' },
        ];

        textFields.forEach(({ id, msg, validate }) => {
            const input = document.getElementById(id);
            const errorEl = document.getElementById('erro-' + id);
            if (!input) return;

            clearFieldError(input, errorEl);

            if (!input.value.trim()) {
                setFieldError(input, errorEl, msg);
                isValid = false;
            } else if (validate === 'email' && !isValidEmail(input.value)) {
                setFieldError(input, errorEl, msg);
                isValid = false;
            } else if (validate === 'phone' && input.value.replace(/\D/g, '').length < 10) {
                setFieldError(input, errorEl, msg);
                isValid = false;
            }
        });

        // --- Select turno ---
        const turnoSelect = document.getElementById('vol-turno');
        const turnoError = document.getElementById('erro-vol-turno');
        if (turnoSelect) {
            clearFieldError(turnoSelect, turnoError);
            if (!turnoSelect.value) {
                setFieldError(turnoSelect, turnoError, 'Selecione um turno de preferência.');
                isValid = false;
            }
        }

        // --- Checkboxes de dias ---
        const daysChecked = form.querySelectorAll('input[name="vol-dias"]:checked');
        const daysError = document.getElementById('erro-vol-dias');
        if (daysChecked.length === 0) {
            if (daysError) {
                daysError.textContent = 'Selecione pelo menos um dia disponível.';
                daysError.classList.add('visible');
            }
            isValid = false;
        } else {
            if (daysError) {
                daysError.textContent = '';
                daysError.classList.remove('visible');
            }
        }

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
        input.addEventListener('input', () => {
            const errorEl = document.getElementById('erro-' + input.id);
            clearFieldError(input, errorEl);
        });
    });

    // Limpar erro de dias ao marcar checkbox
    form.querySelectorAll('input[name="vol-dias"]').forEach(cb => {
        cb.addEventListener('change', () => {
            const daysError = document.getElementById('erro-vol-dias');
            if (daysError) {
                daysError.textContent = '';
                daysError.classList.remove('visible');
            }
        });
    });
}

/* --- Máscara de telefone celular brasileiro --- */
function applyPhoneMask(input) {
    if (!input) return;
    input.addEventListener('input', function () {
        let v = this.value.replace(/\D/g, '').substring(0, 11);
        if (v.length > 6) {
            v = '(' + v.substring(0, 2) + ') ' + v.substring(2, 7) + '-' + v.substring(7);
        } else if (v.length > 2) {
            v = '(' + v.substring(0, 2) + ') ' + v.substring(2);
        } else if (v.length > 0) {
            v = '(' + v;
        }
        this.value = v;
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
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function shakeSendButton(form) {
    const btn = form.querySelector('[type="submit"]');
    if (!btn) return;
    btn.classList.add('btn-shake');
    btn.addEventListener('animationend', () => btn.classList.remove('btn-shake'), { once: true });
}

function scrollToFirstError(form) {
    const firstError = form.querySelector('.is-error, .field-error.visible');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
