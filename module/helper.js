
export const createAndAppendElement = (parent, elementType, attributes, textContent) => {
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

export const createFormGroup = (form, label, id, type, value) => {
    const formGroup = createAndAppendElement(form, 'div', { class: 'form-group mb-3' });
    createAndAppendElement(formGroup, 'label', { for: id }, label);
    if (type === 'textarea') {
        createAndAppendElement(formGroup, 'textarea', { class: 'form-control', id: id, value: value });
    } else {
        createAndAppendElement(formGroup, 'input', { class: 'form-control', id: id, type: type, value: value });
    }
};

export const validateObjectFields = (obj) => {
    for (const key in obj) {
        if (obj[key] === '') {
            alert('Please fill in all the fields.');
            return false;
        }
    }
    return true;
}

export const collectUpdatedProductData = () => {
    return {
        name: document.getElementById('editProductName').value,
        description: document.getElementById('editProductDescription').value,
        brand: document.getElementById('editProductBrand').value,
        imageUrl: document.getElementById('editProductImageUrl').value,
        price: parseFloat(document.getElementById('editProductPrice').value)
    };
};
