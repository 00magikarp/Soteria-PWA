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
                updateLocationDisplay();

                // // Start tracking location
                // startTrackingLocation();
            },
            error => {
                console.error('Error requesting location permission:', error.message);
                updateLocationDisplay(failed=true);
            }
        );
    } else {
        console.log('Geolocation is not supported by this browser.');
        updateLocationDisplay(failed=true);
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
    const mapImg = document.getElementById("map");

    if (locationBox) {
        if (!failed) {
            locationBox.innerHTML = `<span id="success">You're being protected!</span>`;
        } else {
            locationBox.innerHTML = `<span id="failure"">Location not shared!</span>`
        }
    }

    // if (mapImg) {
    //     if (!failed) {
    //         mapImg.innerHTML = `<img src="https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=20&size=500x500">`
    //     }
    // }
}

document.addEventListener('DOMContentLoaded', () => {
    requestLocationPermission();
});
