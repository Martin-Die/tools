import startLoad from './startLoad';
import sendToGPT from './GPTresponder';

function validateForm() {
    const form = document.getElementById('pestelForm');
    const textareas = form.querySelectorAll('textarea');
    let isValid = true;
    let firstInvalidField = null;

    textareas.forEach(textarea => {
        if (textarea.value.trim() === '') {
            isValid = false;
            showError(textarea, 'Ce champ est requis');
            if (!firstInvalidField) firstInvalidField = textarea;
        } else {
            removeError(textarea);
        }
    });

    if (isValid) {
        startLoad();
        sendToGPT();
    } else if (firstInvalidField) {
        firstInvalidField.focus();
    }
}

function showError(element, message) {
    let errorElement = element.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        element.parentNode.insertBefore(errorElement, element.nextSibling);
    }
    errorElement.textContent = message;
    element.classList.add('error');
}

function removeError(element) {
    const errorElement = element.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
    element.classList.remove('error');
}

export default validateForm;