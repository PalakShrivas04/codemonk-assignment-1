document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('recamanCanvas');
    const ctx = canvas.getContext('2d');
    const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('sliderValue');

    // Predefined Recaman sequence
    const recamanSequence = [
        0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24,
        8, 25, 43, 62, 42, 63, 41, 64, 40, 65, 39, 66, 38, 67, 37, 68,
        36, 69, 35, 70, 34, 71, 33, 72, 32, 73, 31, 74, 30, 75, 29, 76,
        28, 77, 27, 78, 26, 79, 25, 80, 24, 81, 23, 82, 22, 83, 21, 84,
        20, 85, 19, 86
    ];

    const maxIndex = 65; // Limiting the maximum index to 65
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const startX = 10; // Start x position
    const stepSize = 5; // Smaller step size for each unit in the sequence

    // Function to draw the axis
    function drawAxis() {
        ctx.beginPath();
        ctx.moveTo(0, canvasHeight / 2);
        ctx.lineTo(canvasWidth, canvasHeight / 2);
        ctx.strokeStyle = 'gray';
        ctx.stroke();
    }

    // Function to draw Recaman sequence up to a given index
    function drawRecaman(index) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawAxis(); // Draw the axis

        // Starting point
        let prevX = startX;
        let prevY = canvasHeight / 2;

        for (let i = 1; i <= index; i++) {
            if (i > maxIndex) break; // Stop drawing if index exceeds maxIndex
            const prev = recamanSequence[i - 1];
            const curr = recamanSequence[i];
            const radius = Math.abs(curr - prev) * stepSize;

            // Determine current x position
            const currX = startX + Math.min(curr, prev) * stepSize;

            // Draw the arc
            ctx.beginPath();
            if (i % 2 === 0) {
                ctx.arc(currX + radius, prevY, radius, Math.PI, 0, true);
            } else {
                ctx.arc(currX + radius, prevY, radius, 0, Math.PI, true);
            }
            ctx.strokeStyle = 'black';
            ctx.stroke();

            // Connect the arcs with a straight line
            if (i > 1) {
                ctx.beginPath();
                ctx.moveTo(prevX + radius, prevY);
                ctx.lineTo(currX, prevY);
                ctx.strokeStyle = 'black';
                ctx.stroke();
            }

            // Update previous coordinates for next arc
            prevX = currX + radius;
        }

        // Update slider value display
        sliderValue.textContent = index;
    }

    // Initial draw
    drawRecaman(maxIndex);

    // Update canvas on slider change
    slider.addEventListener('input', function() {
        const value = parseInt(slider.value);
        drawRecaman(value);
        sliderValue.textContent = value; // Update slider value display
    });
});
