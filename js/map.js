const jsonPath = "assets/sample_floormap.json";

fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("floorplan-container");
        const floorplan = document.getElementById("floorplan");
        const totalWidth = floorplan.width;
        const totalHeight = floorplan.height;
        console.log(totalWidth);
        console.log(totalHeight);

        data.forEach(camera => {
            const x = parseFloat(camera.x) * totalWidth;
            const y = parseFloat(camera.y) * totalHeight;

            const dot = document.createElement("img");
            dot.src = "assets/reddot.png";
            dot.classList.add("overlay");

            // Position the dot
            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;

            // Add the dot to the container
            container.appendChild(dot);
        });
    })
    .catch(error => console.error("Error loading JSON:", error));

document.addEventListener('DOMContentLoaded', () => {

});