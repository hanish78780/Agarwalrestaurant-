document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('contactForm');
    const customAlert = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    const closeAlert = document.getElementById('closeAlert');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name-1').value;
        const email = document.getElementById('email-1').value;
        const phone = document.getElementById('phone-1').value;
        const message = document.getElementById('message').value;

        // Set the custom alert message
        alertMessage.innerHTML = `Thank you, ${name}! Your message has been submitted successfully.<br>Email: ${email}<br>Phone: ${phone}<br>Message: ${message}`;

        // Show the custom alert
        customAlert.style.display = 'block';
        form.reset();
    });

    // Close the custom alert when the OK button is clicked
    closeAlert.addEventListener('click', function() {
        customAlert.style.display = 'none';
    });
});
