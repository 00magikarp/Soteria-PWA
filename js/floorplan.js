const jsonPath = "assets/sample_floormap.json";

fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("floorplan-container");
        const floorplan = document.getElementById("floorplan");

        function positionDots() {
            // Get the current dimensions of the image
            const renderedWidth = floorplan.offsetWidth;
            const renderedHeight = floorplan.offsetHeight;

            // Clear existing dots
            const existingDots = document.querySelectorAll(".overlay");
            existingDots.forEach(dot => dot.remove());

            // Add dots
            data.cameras.forEach(camera => {
                const x = parseFloat(camera.x) * renderedWidth;
                const y = parseFloat(camera.y) * renderedHeight;

                const dot = document.createElement("img");
                dot.src = "assets/reddot.png";
                dot.classList.add("overlay");

                // Position the dot
                dot.style.left = `${x}px`;
                dot.style.top = `${y}px`;

                // Add the dot to the container
                container.appendChild(dot);
            });
        }

        // Position dots on load and when the window is resized
        positionDots();
        window.addEventListener("resize", positionDots);
    })
    .catch(error => console.error("Error loading JSON:", error));
document.addEventListener('DOMContentLoaded', () => {

});