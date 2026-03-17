window.onload = function () {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;

    // Retrieve cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the cart is empty
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    // Display cart items
    cart.forEach((item, index) => {
        total += item.price;

        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" width="50" height="50" />
                <span>${item.title}</span>
                <span>Rs.${item.price.toFixed(2)}</span>
                <button class="remove-item-btn" data-index="${index}">Remove</button>
            </div>
        `;
        cartItemsList.appendChild(cartItem);
    });

    // Update the total price
    cartTotalElement.innerText = `Rs.${total.toFixed(2)}`;

    // Remove item from cart
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', function () {
            const itemIndex = button.getAttribute('data-index');
            cart.splice(itemIndex, 1);  // Remove the item from the cart array
            localStorage.setItem('cart', JSON.stringify(cart));  // Update localStorage
            window.location.reload();  // Reload the page to refresh the cart display
        });
    });
};

// Checkout button functionality (can redirect to payment page)
document.getElementById('checkout-btn').addEventListener('click', function () {
    window.location.href = 'checkout.html';  // Redirect to checkout page
});
