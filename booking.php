<?php
// Database connection settings
$servername = "localhost";  // Change to your live server details if needed
$username = "root";         // Replace with your live database username
$password = "";             // Replace with your live database password
$dbname = "restaurant_booking";  // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $table = $_POST['table'];

    // SQL query to insert data into the bookings table
    $sql = "INSERT INTO bookings (name, email, phone, booking_date,booking_time, table_number) VALUES ('$name', '$email', '$phone', '$date','$time',$table')";

    // Execute the query and check for success
    if ($conn->query($sql) === TRUE) {
      echo "Booking confirmed!";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();

    // Close the connection
}
?>
