import { createAndAppendElement, handleFormSubmit } from './helper.js';

const formContainer = document.getElementById('formContainer');
const addProductBtn = document.getElementById('addProductBtn');

export const createNavbar = () => {
    const navbar = document.createElement('nav');
    navbar.className = 'navbar navbar-expand-lg navbar-light bg-dark';

    const ionIconElement = document.createElement('ion-icon');
    ionIconElement.className = 'text-white ms-1'
    ionIconElement.setAttribute('name', 'card');
    ionIconElement.setAttribute('size', 'large');
    navbar.appendChild(ionIconElement);
    
    const navbarBrand = document.createElement('a');
    navbarBrand.className = 'navbar-brand ms-1 text-white';
    navbarBrand.textContent = 'E-Scam.com';

    navbar.appendChild(navbarBrand);
    document.getElementById('navbarContainer').appendChild(navbar);
};
createNavbar();

const createForm = () => {
        const form = createAndAppendElement(formContainer, 'form', {'id': 'productForm'});

        const createFormGroup = (labelText, inputType, inputId, placeholder, isTextArea = false) => {
            const div = createAndAppendElement(form, 'div', { 'class': 'mb-2' });
            createAndAppendElement(div, 'label', { 'for': inputId, 'class': 'form-label' }, labelText);
            if (isTextArea) {
                createAndAppendElement(div, 'textarea', { 'class': 'form-control', 'id': inputId, 'placeholder': placeholder });
            } else {
                createAndAppendElement(div, 'input', { 'type': inputType, 'class': 'form-control', 'id': inputId, 'placeholder': placeholder });
            }
        };

        createFormGroup('Name:', 'text', 'productName', 'Enter product name');
        createFormGroup('Description:', 'text', 'productDescription', 'Enter description', true);
        createFormGroup('Brand:', 'text', 'productBrand', 'Enter product brand');
        createFormGroup('Image URL:', 'text', 'productImageUrl', 'Enter image URL');
        createFormGroup('Price ($):', 'number', 'productPrice', '0.00');

        createAndAppendElement(form, 'button', { 'type': 'submit', 'class': 'btn btn-success mb-5' }, 'Submit');

        form.style.display = 'none'; 
    };

    addProductBtn.addEventListener('click', () => {
        const form = formContainer.querySelector('form');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });

createForm();
const productForm = document.getElementById('productForm');
productForm.addEventListener('submit', handleFormSubmit);

