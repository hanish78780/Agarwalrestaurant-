document.getElementById('booking-form').addEventListener('submit', function (event) {
  // Prevent form submission for validation
  event.preventDefault();

  // Retrieve form values
  var name = document.getElementById('name1').value;
  var email = document.getElementById('email1').value;
  var phone = document.getElementById('phone1').value;
  var date = document.getElementById('date').value;
  var time = document.getElementById('time').value;
  var table = document.getElementById('table').value;

  // Simple validation
  if (name === "" || email === "" || phone === "" || date === "" || time === "" || table === "") {
      alert("Please fill in all the required fields.");
      return;  // Stop the submission process if fields are missing
  }

  // Remove existing confirmation popup if any
  var existingPopup = document.getElementById('confirmation-popup');
  if (existingPopup) {
      existingPopup.remove();
  }

  // Show confirmation pop-up
  var confirmationPopup = document.createElement('div');
  confirmationPopup.id = 'confirmation-popup'; // Unique ID for the popup
  confirmationPopup.innerHTML = `
  <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); z-index: 1000;">
    <h2>Your booking is confirmed!</h2>
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Phone: ${phone}</p>
    <p>Date: ${date}</p>
    <p>Time: ${time}</p>
    <p>Table: ${table}</p>
    <button id="ok-button" style="background-color: #4CAF50; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">OK</button>
    <button style="background-color: #4CAF50; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" onclick="window.location.href='index.html'">Back to Home</button>        
  </div>
  `;
  document.body.appendChild(confirmationPopup);

  // Add event listener to close the pop-up
  var okButton = document.getElementById('ok-button');
  okButton.addEventListener('click', function () {
      confirmationPopup.remove();
      // Clear form fields after confirmation
      document.getElementById('booking-form').reset();
  });
});

// jQuery for smooth scrolling
$(document).ready(function() {
  $('a').on('click', function(event) {
      if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({
              scrollTop: $(hash).offset().top
          }, 800, function() {
              window.location.hash = hash;
          });
      }
  });
});
