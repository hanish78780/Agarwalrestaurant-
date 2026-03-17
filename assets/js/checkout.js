window.onload = function () {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalElement = document.getElementById('cart-total');
    const cardDetails = document.getElementById('card-details');
    let total = 0;

    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Display cart items
    cart.forEach(item => {
        total += item.price;

        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" width="60" height="60" />
            <span>${item.title}</span>
            <span>Rs.${item.price.toFixed(2)}</span>
        `;
        cartItemsList.appendChild(cartItem);
    });

    cartTotalElement.innerText = `Rs.${total.toFixed(2)}`;

    
  
    

    // Handle form submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent form from submitting the default way

        const formData = new FormData(checkoutForm);
        const name = formData.get('name');
        const address = formData.get('address');
        const city = formData.get('city');
        const state = formData.get('state');
        const zip = formData.get('zip');
       
        const totalAmount = total;  
        localStorage.setItem('cartTotal', JSON.stringify(totalAmount));
        window.location.href = 'payment1.html';
    });
   
};
