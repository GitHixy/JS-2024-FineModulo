
const params = new URLSearchParams(window.location.search);
const itemId = params.get('id');

const createNavbar = () => {
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

    const homeLink = document.createElement('a');
    homeLink.className = 'navbar-link ms-auto me-2 text-white';
    homeLink.textContent = 'Back to Home';
    homeLink.href = 'index.html';
    navbar.appendChild(homeLink);

    document.getElementById('navbarContainer').appendChild(navbar);
};
createNavbar();

const fetchItemDetailsAndGenerateCard = async () => {
  const URL = `https://striveschool-api.herokuapp.com/api/product/${itemId}`;
  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFmYzVlZjczMjBjNjAwMThiOGYwMjIiLCJpYXQiOjE3MDYwMTgyODcsImV4cCI6MTcwNzIyNzg4N30.hTBDNVKtRVWz3SuiyDSwgQmp1w7i8wHRKehZa-Pbdyo';

  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (response.ok) {
      const item = await response.json();

      const cardDiv = document.createElement('div');
      cardDiv.className = 'card mx-auto mb-3 bg-dark cardElement2 col-6';

      
      const cardImg = document.createElement('img');
      cardImg.className = 'card-img-top mx-auto';
      cardImg.src = item.imageUrl;
      cardImg.alt = item.name;

      
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      
      const cardTitle = document.createElement('h5');
      cardTitle.className = 'card-title text-white';
      cardTitle.textContent = item.name;

      const cardDescription = document.createElement('p');
      cardDescription.className = 'card-text text-white';
      cardDescription.textContent = item.description;

      const cardBrand = document.createElement('h6');
      cardBrand.className = 'card-brand text-white';
      cardBrand.textContent = item.brand;

      const cardPrice = document.createElement('p');
      cardPrice.className = 'card-text text-white text-truncate';
      cardPrice.textContent = item.price + ' $';

      
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardDescription);
      cardBody.appendChild(cardBrand);
      cardBody.appendChild(cardPrice);

      
      cardDiv.appendChild(cardImg);
      cardDiv.appendChild(cardBody);

      
      const itemDetailsContainer = document.getElementById('itemDetailsContainer');
      itemDetailsContainer.appendChild(cardDiv);
    } else {
      console.error('Failed to fetch item details');
    }
  } catch (error) {
    console.error('Error fetching item details:', error);
  }
};

fetchItemDetailsAndGenerateCard();
