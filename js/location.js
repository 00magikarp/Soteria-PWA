let latitude = 0;
let longitude = 0;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.error('Service Worker registration failed:', err));
}

export function requestLocationPermission(callback) {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                console.log('Permission granted.');
                console.log('Latitude:', latitude);
                console.log(position.coords.latitude);
                console.log('Longitude:', longitude);
                console.log(position.coords.longitude);
                updateLocationDisplay();

                if (callback) callback(latitude, longitude);
            },
            error => {
                console.error('Error requesting location permission:', error.message);
                updateLocationDisplay(true);
            }
        );
    } else {
        console.log('Geolocation is not supported by this browser.');
        updateLocationDisplay(true);
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
function updateLocationDisplay(failed=false) {
    const locationBox = document.getElementById('location');

    if (locationBox) {
        if (!failed) {
            locationBox.innerHTML = `<span id="success">You're being protected!</span>`;
        } else {
            locationBox.innerHTML = `<span id="failure"">Location not shared!</span>`
        }
    }
}

export function getLatitude() {
    return latitude;
}

export function getLongitude() {
    return longitude;
}

document.addEventListener('DOMContentLoaded', () => {
    requestLocationPermission();
});
