// Get meal details from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get("title") || "Meal Title";
const price = parseFloat(urlParams.get("price")) || 0.0;
const img = decodeURIComponent(urlParams.get("img")) || "https://via.placeholder.com/370x150";

// Update the order summary
document.getElementById("title").textContent = title;
document.getElementById("price").textContent = `Price: Rs. ${price.toFixed(2)}`;
document.getElementById("img").src = img;

// Add hover effect to the image
const imageElement = document.querySelector(".image-container img");
imageElement.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.05)";
});
imageElement.addEventListener("mouseout", function () {
    this.style.transform = "scale(1)";
});

// Payment Method Logic
const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
const upiOptions = document.getElementById("upiOptions");
const creditCardInfo = document.getElementById("creditCardInfo");
const qrCode = document.getElementById("qrCode");
const qrCodeImg = document.getElementById("qrCodeImg");
const upiIdInput = document.getElementById("upiIdInput");

// Toggle Payment Method Sections (UPI, Credit Card, COD)
paymentMethods.forEach(method => {
    method.addEventListener("change", function () {
        if (this.value === "upi") {
            upiOptions.classList.remove("d-none");
            creditCardInfo.classList.add("d-none");
        } else if (this.value === "creditCard") {
            upiOptions.classList.add("d-none");
            creditCardInfo.classList.remove("d-none");
            qrCode.classList.add("d-none");
            upiIdInput.classList.add("d-none");
        } else {
            upiOptions.classList.add("d-none");
            creditCardInfo.classList.add("d-none");
            qrCode.classList.add("d-none");
        }
    });
});

// UPI Method Logic (Google Pay, PhonePe, Paytm, UPI ID)
const upiMethods = document.querySelectorAll('input[name="upiMethod"]');
upiMethods.forEach(upi => {
    upi.addEventListener("change", function () {
        if (this.value === "UPIID") {
            upiIdInput.classList.remove("d-none");
            qrCode.classList.add("d-none");
        } else {
            upiIdInput.classList.add("d-none");
            qrCode.classList.remove("d-none");

            // Set QR code image based on UPI method selected
            if (this.value === "PhonePe") {
                qrCodeImg.src = "/assets/photos/qr.jpg"; // Replace with actual QR code image
            } else if (this.value === "GooglePay") {
                qrCodeImg.src = "/assets/photos/googlepay_qr.jpg"; // Replace with actual QR code image
            } else if (this.value === "Paytm") {
                qrCodeImg.src = "/assets/photos/paytm_qr.jpg"; // Replace with actual QR code image
            }
        }
    });
});

// Validate and submit the payment form
document.getElementById("make-payment").addEventListener("click", (e) => {
    e.preventDefault();

    // Validate form fields
    const formFields = [
        "email", "password", "country", "zip"
    ];
    let isValid = formFields.every((field) => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.classList.add("is-invalid");
            return false;
        } else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
            return true;
        }
    });

    // UPI-specific validation
    if (document.getElementById("upi").checked) {
        const upiMethod = document.querySelector('input[name="upiMethod"]:checked');
        if (upiMethod && upiMethod.value === "UPIID") {
            const upiId = document.getElementById("upiIdValue").value.trim();
            if (!upiId) {
                document.getElementById("upiIdValue").classList.add("is-invalid");
                isValid = false;
            } else {
                document.getElementById("upiIdValue").classList.remove("is-invalid");
                document.getElementById("upiIdValue").classList.add("is-valid");
            }
        }
    }

    // Redirect upon valid form submission
    if (isValid) {
        if (document.getElementById("upi").checked && document.querySelector('input[name="upiMethod"]:checked').value === "UPIID") {
            window.location.href = "upi_payment_processing.html"; // Redirect to UPI payment page
        } else {
            window.location.href = "thankyou.html"; // Redirect to Thank You page
        }
    }
});

// Date format for credit card expiration date (MM/YY)
document.getElementById("expDate").addEventListener("input", function (e) {
    let input = e.target.value;

    // Automatically add '/' after the month (2 digits)
    if (input.length === 2 && !input.includes("/")) {
        e.target.value = input + "/";
    }

    // Limit the year part (YY) to 2 digits after '/'
    if (input.includes("/")) {
        let parts = input.split("/");
        if (parts[1] && parts[1].length > 2) {
            e.target.value = parts[0] + "/" + parts[1].slice(0, 2);
        }
    }
});

// Quantity, subtotal, and total calculations
document.getElementById("quantity").addEventListener("input", calculateTotal);

function calculateTotal() {
    const price = parseFloat(document.getElementById("price").textContent.replace("Price: Rs. ", ""));
    const quantity = parseInt(document.getElementById("quantity").value, 10);
    const subtotal = price * quantity;
    const taxes = subtotal * 0.1; // Assuming 10% tax rate
    const total = subtotal + taxes;

    // Update summary fields
    document.getElementById("subtotal").textContent = `Rs. ${subtotal.toFixed(2)}`;
    document.getElementById("taxes").textContent = `Taxes (10%): Rs. ${taxes.toFixed(2)}`;
    document.getElementById("total").textContent = `Total: Rs. ${total.toFixed(2)}`;
}

// Initial calculation when the page loads
calculateTotal();
