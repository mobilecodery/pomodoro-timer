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
    // Prevent text highlighting or browser drag-and-drop
    e.preventDefault(); 
    
    isDragging = true;
    
    // Get the exact click point so it doesn't "snap"
    const rect = timerBox.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    timerBox.style.opacity = "0.8";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    // Move the box based on mouse position
    timerBox.style.left = `${e.clientX - offsetX}px`;
    timerBox.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    timerBox.style.opacity = "1";
});
