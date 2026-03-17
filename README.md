# 🍽️ Agrawal Restaurant 

Welcome to the **Agrawal Restaurant** web application repository! This is a fully functional, responsive, and dynamic restaurant website designed to offer a seamless food ordering and table booking experience for customers.

## 🚀 Features

- **🍔 Dynamic Menu System:** Browse over 50+ delicious items divided into categories (Breakfast, Dinner, Desserts, Beverages, Combos).
- **🔍 Live Search & Filter:** Instantly search through the menu and filter by food category.
- **🛒 Smart Shopping Cart:** Built using `localStorage`, the cart survives page reloads. Includes live total calculations and an interactive notification badge.
- **💳 Multi-Method Payment UI:** A complete checkout flow supporting:
  - UPI (Dynamic QR codes for Google Pay, PhonePe, Paytm, or custom UPI ID)
  - Credit Card / Debit Card (with live MM/YY format validation)
  - Cash on Delivery
- **🔐 User Authentication:** Client-side Sign Up, Sign In, and Sign Out functionality persistently stored using `localStorage` for a personalized session.
- **📅 Table Booking:** Backend PHP integration attached to a MySQL database specifically to reserve tables seamlessly.
- **📱 Responsive UI:** Fully responsive design built primarily with Bootstrap 5, optimized for mobile, tablet, and desktop views.
- **📸 High-Quality Media:** Includes an ambient background video header, Bootstrap Carousel logic, and a full customer & food photo gallery.

## 💻 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+), Bootstrap 5
- **Backend/Database:** PHP, MySQL (for Table Bookings)
- **Icons & Fonts:** FontAwesome, Bootstrap Icons, Boxicons, Google Fonts

## 📁 Project Structure

```text
restorant/
│
├── assets/
│   ├── css/          # Stylesheets (style.css, menu.css, cart.css, etc.)
│   ├── js/           # Scripts (menu.js, cart.js, payment.js, etc.)
│   ├── photos/       # Image assets and favicons
│   └── video/        # Background videos
│
├── index.html        # Home Page
├── menu.html         # Menu / Ordering Page
├── cart.html         # User's Shopping Cart
├── checkout.html     # Checkout details
├── payment.html      # Payment processing UI
├── order.html        # Single item order interface
├── restaurant.html   # Restaurant details
├── services.html     # Offered services
├── about.html        # About Us page
├── contact.html      # Contact Us
├── booking.php       # PHP script handling MySQL table reservations
└── README.md         # You are here!
```

## 🛠️ How to Run Locally

### 1. Running the Frontend Only
Since the majority of the app is purely client-side:
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/hanish78780/Agarwalrestaurant-.git
   ```
2. Navigate to the project folder.
3. Simply double-click on `index.html` to open it in your browser, or use VS Code's **Live Server** extension.

### 2. Running the Full Application (Including PHP Booking)
To use the Table Booking feature (`booking.php`), you need a local server environment capable of running PHP and MySQL (e.g., **XAMPP**, **WAMP**, or **MAMP**):
1. Move the cloned `restorant` folder into your local server's root directory (e.g., `C:\xampp\htdocs\` for XAMPP).
2. Start the **Apache** and **MySQL** services from your control panel.
3. Open phpMyAdmin (`http://localhost/phpmyadmin`) and create a database named `restaurant_booking`.
4. Create a table named `bookings` with columns: `id` (Auto Increment, Primary Key), `name`, `email`, `phone`, `booking_date`, `booking_time`, and `table_number`.
5. Access the site via your browser at `http://localhost/restorant/index.html`.

## 👨‍💻 Developed By

**Hanish Singhal**

Feel free to reach out or open an issue if you have suggestions or find bugs!
