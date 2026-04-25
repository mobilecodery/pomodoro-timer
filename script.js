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
    
    const isResizeHandle = (e.clientX > rect.right - 30) && (e.clientY > rect.bottom - 30);

    if (isResizeHandle) {
        return; 
    } else {
        
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