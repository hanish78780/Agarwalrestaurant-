document.addEventListener('DOMContentLoaded', function () {
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const upiOptions = document.getElementById('upi-options');
    const upiMethodInputs = document.querySelectorAll('input[name="upi-method"]');
    const qrCodeContainer = document.getElementById('qr-code-container');
    const upiIdForm = document.getElementById('upi-id-form');
    const cardDetailsForm = document.getElementById('card-details-form');
    const payNowBtn = document.getElementById('pay-now-btn');
    const totalPaid = JSON.parse(localStorage.getItem('cartTotal')) || 0;
    document.getElementById('total-paid').innerText = `Rs. ${totalPaid.toFixed(2)}`;

    // Function to toggle payment method UI (UPI or Card form)
    function togglePaymentMethod() {
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;

        // Hide all payment sections first
        upiOptions.classList.add('hidden');
        cardDetailsForm.classList.add('hidden');
        qrCodeContainer.classList.add('hidden');
        upiIdForm.classList.add('hidden');

        if (selectedMethod === 'UPI') {
            upiOptions.classList.remove('hidden');
        } else if (selectedMethod === 'Credit Card' || selectedMethod === 'Debit Card') {
            cardDetailsForm.classList.remove('hidden');
        }
    }

    // Function to toggle UPI options (QR code or UPI ID)
    function toggleUpiOptions() {
        const selectedUpiMethod = document.querySelector('input[name="upi-method"]:checked').value;

        // Hide QR code and UPI ID form by default
        qrCodeContainer.classList.add('hidden');
        upiIdForm.classList.add('hidden');

        if (selectedUpiMethod === 'UPI ID') {
            upiIdForm.classList.remove('hidden');
        } else {
            qrCodeContainer.classList.remove('hidden');
        }
    }

    // Add event listeners for payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('change', togglePaymentMethod);
    });

    // Add event listeners for UPI method selection
    upiMethodInputs.forEach(method => {
        method.addEventListener('change', toggleUpiOptions);
    });

    // Handle Pay Now button click
    payNowBtn.addEventListener('click', function () {
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
        let paymentSuccess = false; // Default flag for payment success

        if (selectedMethod === 'UPI') {
            const selectedUpiMethod = document.querySelector('input[name="upi-method"]:checked').value;

            if (selectedUpiMethod === 'UPI ID') {
                const upiId = document.getElementById('upi-id').value;
                if (upiId) {
                    alert(`Paying via UPI ID: ${upiId}`);
                    paymentSuccess = true;
                } else {
                    alert('Please enter a valid UPI ID.');
                }
            } else {
                // Show QR code for Google Pay, PhonePe, or Paytm
                alert(`Paying via ${selectedUpiMethod} (Scan QR code)`);
                paymentSuccess = true;
            }
        } else if (selectedMethod === 'Credit Card' || selectedMethod === 'Debit Card') {
            const cardNumber = document.getElementById('card-number').value;
            const cardName = document.getElementById('card-name').value;
            const expiryDate = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;

            if (cardNumber && cardName && expiryDate && cvv) {
                alert(`Paying via Card: ${cardNumber}, Name: ${cardName}, Expiry: ${expiryDate}`);
                paymentSuccess = true;
            } else {
                alert('Please fill in all card details.');
            }
        } else if (selectedMethod === 'Cash on Delivery') {
            alert('Payment will be made on delivery.');
            paymentSuccess = true;
        }

        // Redirect to success page if payment is successful
        if (paymentSuccess) {
            window.location.href = 'success.html';
        }
    });
});
