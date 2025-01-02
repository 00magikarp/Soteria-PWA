let latitude = 0;
let longitude = 0;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.error('Service Worker registration failed:', err));
}

function requestLocationPermission() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                console.log('Permission granted.');
                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);

                // Update UI with the current position
                updateLocationDisplay();

                // Start tracking location
                startTrackingLocation();
            },
            error => {
                console.error('Error requesting location permission:', error.message);
            }
        );
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}

// Start location tracking
function startTrackingLocation() {
    if ('geolocation' in navigator) {
        const watchId = navigator.geolocation.watchPosition(
            position => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                console.log('Updated Latitude:', latitude);
                console.log('Updated Longitude:', longitude);

                // Update UI with the updated position
                updateLocationDisplay();
            },
            error => {
                console.error('Error watching location:', error.message);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000
            }
        );

        // Stop tracking when needed
        // navigator.geolocation.clearWatch(watchId);
    }
}

function sendLocationToServer(latitude, longitude) {
    fetch('/update-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude })
    }).then(response => console.log('Location sent:', response));
}

// Function to update the UI
function updateLocationDisplay() {
    const latitudeBox = document.getElementById('latitude');
    const longitudeBox = document.getElementById('longitude');

    if (latitudeBox && longitudeBox) {
        latitudeBox.innerHTML = latitude;
        longitudeBox.innerHTML = longitude;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    requestLocationPermission();
});
