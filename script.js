console.log("JS is connected!");
alert("The script is running!");

const cursor = document.getElementById("liquid-cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});


const timerBox = document.querySelector(".timer");
let isDragging = false;
let offsetX, offsetY;

timerBox.addEventListener("mousedown", (e) => {
    const rect = timerBox.getBoundingClientRect();
    
    // Check if clicking the bottom-right corner (approx 30px area for easier grabbing)
    const isResizeHandle = (e.clientX > rect.right - 30) && (e.clientY > rect.bottom - 30);

    if (isResizeHandle) {
        // If it IS the handle, we DO NOTHING and let the CSS 'resize' work
        return; 
    } else {
        // If it's NOT the handle, we start the dragging logic
        e.preventDefault(); 
        isDragging = true;
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        timerBox.style.opacity = "0.8";
        timerBox.style.cursor = "grabbing";
    }
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    timerBox.style.left = `${e.clientX - offsetX}px`;
    timerBox.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    timerBox.style.opacity = "1";
    timerBox.style.cursor = "grab";
});
