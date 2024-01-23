import { accessToken, URL } from './main.js';

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

document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.getElementById('formContainer');
    const addProductBtn = document.getElementById('addProductBtn');

    const createAndAppendElement = (parent, elementType, attributes, textContent) => {
        const element = document.createElement(elementType);
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        if (textContent) {
            element.textContent = textContent;
        }
        parent.appendChild(element);
        return element;
    };

    const createForm = () => {
        const form = createAndAppendElement(formContainer, 'form', {'id': 'productForm'});

        const createFormGroup = (labelText, inputType, inputId, placeholder, isTextArea = false) => {
            const div = createAndAppendElement(form, 'div', { 'class': 'mb-3' });
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

        createAndAppendElement(form, 'button', { 'type': 'submit', 'class': 'btn btn-success' }, 'Submit');

        form.style.display = 'none'; 
    };

    addProductBtn.addEventListener('click', () => {
        const form = formContainer.querySelector('form');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });
    createForm();
    const handleFormSubmit = async (event) => {
        event.preventDefault(); 

        
        const formData = new FormData(event.target);
        const productData = {
            name: document.getElementById('productName').value,
            description: document.getElementById('productDescription').value,
            brand: document.getElementById('productBrand').value,
            imageUrl: document.getElementById('productImageUrl').value,
            price: document.getElementById('productPrice').value
        };
        productData.price = parseFloat(productData.price);
        console.log("Sending product data:", productData);

        
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` 
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Product added successfully:', data);

            
            event.target.reset();
        } catch (error) {
            console.error('Error adding product:', error);
            
        }
    };

    
    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', handleFormSubmit);
});
