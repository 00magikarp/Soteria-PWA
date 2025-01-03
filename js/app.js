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

// Start location tracking
// function startTrackingLocation() {
//     if ('geolocation' in navigator) {
//         const watchId = navigator.geolocation.watchPosition(
//             position => {
//                 latitude = position.coords.latitude;
//                 longitude = position.coords.longitude;
//                 console.log('Updated Latitude:', latitude);
//                 console.log('Updated Longitude:', longitude);
//
//                 // Update UI with the updated position
//                 updateLocationDisplay();
//             },
//             error => {
//                 console.error('Error watching location:', error.message);
//                 updateLocationDisplay(failed=true);
//             },
//             {
//                 enableHighAccuracy: true,
//                 maximumAge: 0,
//                 timeout: 5000
//             }
//         );
//
//         // Stop tracking when needed
//         // navigator.geolocation.clearWatch(watchId);
//     }
// }

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
            locationBox.innerHTML = `<span id="success">${latitude}, ${longitude}</span>`;
        } else {
            locationBox.innerHTML = `<span id="failure"">Not found</span>`
        }
    }

    if (mapImg) {
        if (!failed) {
            mapImg.innerHTML = `<img src="https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=20&size=500x500">`
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    requestLocationPermission();
});
