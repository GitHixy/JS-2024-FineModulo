
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

const fetchAndDisplayItems = async () => {
    const URL = 'https://striveschool-api.herokuapp.com/api/product/';
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFmYzVlZjczMjBjNjAwMThiOGYwMjIiLCJpYXQiOjE3MDYwMTgyODcsImV4cCI6MTcwNzIyNzg4N30.hTBDNVKtRVWz3SuiyDSwgQmp1w7i8wHRKehZa-Pbdyo';
    try {
        const response = await fetch( URL, {
            method: 'GET' ,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
        const items = await response.json();
        console.log(items);
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = ''; 

        items.forEach(item => {
            
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
            detailsButton.onclick = () => detailsItem(item);
            
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
        });
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}
fetchAndDisplayItems();

export const handleFormSubmit = async (event) => {
    event.preventDefault(); 

    
    const formData = new FormData(event.target);
    const productData = {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        brand: document.getElementById('productBrand').value,
        imageUrl: document.getElementById('productImageUrl').value,
        price: document.getElementById('productPrice').value
    };
    if (
        productData.name === '' ||
        productData.description === '' ||
        productData.brand === '' ||
        productData.imageUrl === '' ||
        productData.price === ''
    ) {
        alert('Please fill in all the fields.');
        return;
    } else {
        productData.price = parseFloat(productData.price);
    
        console.log("Sending product data:", productData);
    }

    const URL = 'https://striveschool-api.herokuapp.com/api/product/';
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFmYzVlZjczMjBjNjAwMThiOGYwMjIiLCJpYXQiOjE3MDYwMTgyODcsImV4cCI6MTcwNzIyNzg4N30.hTBDNVKtRVWz3SuiyDSwgQmp1w7i8wHRKehZa-Pbdyo';
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
    fetchAndDisplayItems();
};

const deleteItem = async (item) => {
    const URL = 'https://striveschool-api.herokuapp.com/api/product/';
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFmYzVlZjczMjBjNjAwMThiOGYwMjIiLCJpYXQiOjE3MDYwMTgyODcsImV4cCI6MTcwNzIyNzg4N30.hTBDNVKtRVWz3SuiyDSwgQmp1w7i8wHRKehZa-Pbdyo';
    try {
        const response = await fetch(`${URL}${item._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`Error deleting item: ${response.statusText}`);
        }
        console.log('Item deleted:', item);
        fetchAndDisplayItems(); 
    } catch (error) {
        console.error('Error deleting item:', error);
    }
};

const editItem = async (item) => {
    console.log('Editing item:', item);
    
}

