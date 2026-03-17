document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email2').value;

    if (email) {
        alert(`Thank you for subscribing, ${email}!`);
        document.getElementById('email').value = ''; // Clear the input field after submission
    } else {
        alert('Please enter a valid email address.');
    }
});
