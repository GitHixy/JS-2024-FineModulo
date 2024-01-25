import { handleFormSubmit, deleteItem, saveProductChanges } from './fetch.js';
import { createAndAppendElement, createFormGroup } from './helper.js';

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

export const createCard = (item) => {
    const cardDiv = document.createElement('div');
            cardDiv.className = 'card mx-auto mb-3 bg-dark cardElement col-6';

            const cardImg = document.createElement('img');
            cardImg.className = 'card-img-top mx-auto my-2';
            cardImg.src = item.imageUrl; 
            cardImg.alt = item.name;
        
            
        const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
        
            
            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title text-white';
            cardTitle.textContent = item.name;

            const cardDescription = document.createElement('p');
            cardDescription.className = 'card-text text-white text-truncate';
            cardDescription.textContent = item.description;

            const cardBrand = document.createElement('h6');
            cardBrand.className = 'card-brand text-white';
            cardBrand.textContent = item.brand;

            const cardPrice = document.createElement('p');
            cardPrice.className = 'card-text text-white text-truncate';
            cardPrice.textContent = item.price + ' $';
        
            const detailsButton = document.createElement('button');
            detailsButton.className = 'btn btn-secondary m-1';
            detailsButton.textContent = 'Details';
            detailsButton.onclick = () => {
                window.location.href = `details.html?id=${item._id}`;
              };
            
            const editButton = document.createElement('button');
            editButton.className = 'btn btn-primary m-1';
            editButton.textContent = 'Edit';
            editButton.onclick = () => editItem(item);
        
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger m-1';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteItem(item);
        
            
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            cardBody.appendChild(cardBrand);
            cardBody.appendChild(cardPrice);
            cardBody.appendChild(detailsButton);
            cardBody.appendChild(editButton);
            cardBody.appendChild(deleteButton);
        
            cardDiv.appendChild(cardImg);
            cardDiv.appendChild(cardBody);
        
            
            itemList.appendChild(cardDiv);
}

const createForm = async() => {
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

export const createEditForm = (modalBody, item) => {
    const form = createAndAppendElement(modalBody, 'form', { id: 'editProductForm' });

    
    createFormGroup(form, 'Name:', 'editProductName', 'text', item.name);

    
    createFormGroup(form, 'Description:', 'editProductDescription', 'text', item.description);

    
    createFormGroup(form, 'Brand:', 'editProductBrand', 'text', item.brand);

    
    createFormGroup(form, 'Image URL:', 'editProductImageUrl', 'text', item.imageUrl);

    
    createFormGroup(form, 'Price: ($)', 'editProductPrice', 'number', item.price.toString());
};

export const editItem =  (item) => {
    console.log('Editing item:', item);
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.innerHTML = ''; 

    
    const modalDiv = createAndAppendElement(modalContainer, 'div', {
        class: 'modal fade',
        id: 'editModal',
        tabindex: '-1',
        role: 'dialog',
        'aria-labelledby': 'editModalLabel',
        'aria-hidden': 'true'
    });

    const modalDialog = createAndAppendElement(modalDiv, 'div', { class: 'modal-dialog', role: 'document' });
    const modalContent = createAndAppendElement(modalDialog, 'div', { class: 'modal-content bg-dark text-white' });

    
    const modalHeader = createAndAppendElement(modalContent, 'div', { class: 'modal-header' });
    createAndAppendElement(modalHeader, 'h5', { class: 'modal-title', id: 'editModalLabel' }, 'Edit Product');
    const closeButton = createAndAppendElement(modalHeader, 'button', {
        type: 'button',
        class: 'btn-close',
        'aria-label': 'Close'
    });
    closeButton.addEventListener('click', () => {
        const modalElement = document.getElementById('editModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    });

    
    const modalBody = createAndAppendElement(modalContent, 'div', { class: 'modal-body' });
    createEditForm(modalBody, item);
    

    
    const modalFooter = createAndAppendElement(modalContent, 'div', { class: 'modal-footer' });
    const saveButton = createAndAppendElement(modalFooter, 'button', {
        type: 'button',
        class: 'btn btn-primary',
        'data-dismiss': 'modal'
    }, 'Save changes');

    saveButton.addEventListener('click', () => {
        saveProductChanges(item._id);
        modal.hide();
    });
   
    
    const modalElement = document.getElementById('editModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    
}