const urlParams = new URLSearchParams(window.location.search);
        const title = urlParams.get('title') || 'Default Meal Title';
        const text = urlParams.get('text');
        const price = parseFloat(urlParams.get('price')) || 0.00;
        const img = urlParams.get('img') || 'https://via.placeholder.com/200';
        const rating = urlParams.get('rating');
        console.log('Title:', title);
        console.log('Text:', text);
        console.log('Price:', price);
        console.log('Image URL:', img);
        console.log('Rating:', rating);
        // Set meal details
        document.getElementById('title').textContent = title;
        document.getElementById('text').textContent = text;
        document.getElementById('price').textContent = `Price: Rs. ${price.toFixed(2)}`;
        document.getElementById('img').src = img;
        // document.getElementById('rating').textContent = rating;
    
        // Add rating if available
        if (rating) {
            const ratingElement = document.createElement('p');
            ratingElement.textContent = `Rating: ${rating}`;
            document.querySelector('.meal-details').appendChild(ratingElement);
        }
    
      
    
        document.getElementById('order-form').addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form submission
    
            const formFields = ['firstName', 'lastName', 'phoneNumber', 'streetAddress', 'city', 'state', 'postalCode', 'country'];
            let isValid = true;
    
            formFields.forEach((field) => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
    
            if (isValid) {
                const encodedImgUrl = encodeURIComponent(img);
                const encodedTitle = encodeURIComponent(title);
                const encodedPrice = encodeURIComponent(price.toFixed(2)); // Ensure price is formatted as a string
                window.location.href = `payment.html?title=${encodedTitle}&price=${encodedPrice}&img=${encodedImgUrl}`;
            }
        });