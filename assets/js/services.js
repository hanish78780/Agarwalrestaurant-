   // Pre-approved delivery areas with coordinates (latitude, longitude)
   const deliveryAreas = [
    { city: "Jaipur", lat: 26.9124, lon: 75.7873 },
    { city: "Mahwa", lat: 27.0467, lon: 76.1443 },
    { city: "Dausa", lat: 26.8933, lon: 76.3375 },
    { city: "Mumbai", lat: 19.0759, lon: 72.8777 },
    { city: "Delhi", lat: 28.7041, lon: 77.1025 },
    { city: "Udaipur", lat: 24.5854, lon: 73.7125 }
  ];

const maxDeliveryDistance = 50; // 50 km

// Initialize the map
const map = L.map('map').setView([37.7749, -122.4194], 4); // Default view centered on USA

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to verify user's current location using Geolocation API
function verifyGeolocation() {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = '';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        messageDiv.innerHTML = '<div class="alert alert-warning">Geolocation is not supported by this browser.</div>';
    }
}

// Success callback for geolocation
function success(position) {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    // Set the map view to the user's location
    map.setView([userLat, userLon], 10);

    // Add a marker for the user's location
    const userMarker = L.marker([userLat, userLon]).addTo(map)
        .bindPopup("You are here.")
        .openPopup();

    let found = false;
    let nearestCity = '';
    let nearestDistance = 0;

    for (let i = 0; i < deliveryAreas.length; i++) {
        const area = deliveryAreas[i];
        const distance = calculateDistance(userLat, userLon, area.lat, area.lon);

        // Add delivery area markers and circles to the map
        const marker = L.marker([area.lat, area.lon]).addTo(map)
            .bindPopup(`${area.city}<br>Delivery Area`);

        L.circle([area.lat, area.lon], {
            color: 'green',
            fillColor: '#green',
            fillOpacity: 0.2,
            radius: maxDeliveryDistance * 1000 // Radius in meters
        }).addTo(map);

        if (distance <= maxDeliveryDistance) {
            found = true;
            nearestCity = area.city;
            nearestDistance = distance;
            break;
        }
    }

    const messageDiv = document.getElementById('message');
    if (found) {
        messageDiv.innerHTML = `<div class="alert alert-success">Yes! We deliver to your area near ${nearestCity}, within ${nearestDistance.toFixed(2)} km.</div>`;
    } else {
        messageDiv.innerHTML = `<div class="alert alert-danger">Sorry, we do not deliver to your current location.</div>`;
    }
}

// Error callback for geolocation
function error() {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = '<div class="alert alert-danger">Unable to retrieve your location. Please check your location settings.</div>';
}

// Function to calculate distance between two coordinates (in kilometers)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

// Convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}