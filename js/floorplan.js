const jsonPath = "assets/sample_floormap.json";

document.addEventListener('DOMContentLoaded', () => {
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("floorplan-container");
            const floorplan = document.getElementById("floorplan");

            function positionDots() {
                const floorplanBox = floorplan.getBoundingClientRect();
                const width = floorplanBox.width;
                const height = floorplanBox.height;
                console.log(floorplanBox);
                console.log("dimensions", width, height);

                const existingDots = document.querySelectorAll(".overlay");
                existingDots.forEach(dot => dot.remove());

                data.cameras.forEach(camera => {
                    console.log(camera.x, camera.y);
                    const x = parseFloat(camera.x) * width;
                    const y = parseFloat(camera.y) * height;
                    console.log(x, y);

                    const dot = document.createElement("img");
                    dot.src = "assets/reddot.svg";
                    dot.classList.add("overlay");
                    dot.style.left = `${x}px`;
                    dot.style.top = `${y}px`;
                    container.appendChild(dot);
                    console.log(dot.x, dot.y);
                });
            }

            positionDots();
            window.addEventListener("resize", positionDots);
        })
        .catch(error => console.error("Error loading JSON:", error));
});