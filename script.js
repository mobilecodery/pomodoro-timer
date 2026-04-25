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

const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const displayText = document.getElementById('display-text');
const timeDisplay = document.querySelector('.time-display');
const timerChoice = document.getElementById('timer-choice');

let isTimerRunning = false; 
let timeLeft = 25 * 60;
let timerInterval = null;

const messages = [
  "Work hard in silence.<br>Let success make the noise.",
  "Don't stop until you're proud.",
  "The best way to predict<br>your future is to create it.",
  "Be the CEO of your own life.",
  "Study now, sparkle later.",
  "She believed she could,<br> so she did.",
  "Dream big<br>work hard<br>stay focused.",
  "Chasing dreams,<br> not people.",
  "Smart is the new pretty.",
  "Make it happen, girl.",
  "they say fake it till you make it<br>and i did"
];

// --- 3. FUNCTIONS ---
function updateQuote() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  displayText.innerHTML = messages[randomIndex];
}

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timeDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            isTimerRunning = false;
            startBtn.innerText = "▶";
            alert("Session finished! Time for a break?");
        }
    }, 1000);
}

// --- 4. EVENT LISTENERS ---

// START / PAUSE BUTTON
startBtn.addEventListener('click', () => {
  if (!isTimerRunning) {
    // Starting or Resuming
    if (displayText.innerHTML === "") {
      updateQuote();
    }
    isTimerRunning = true;
    startBtn.innerText = "⏸";
    startTimer();
    console.log("Timer Started");
  } else {
    // Pausing
    isTimerRunning = false;
    startBtn.innerText = "▶";
    clearInterval(timerInterval);
    console.log("Timer Paused");
  }
});

// RESET BUTTON
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
    startBtn.innerText = "▶";
    
    // Reset time based on the dropdown choice
    timeLeft = timerChoice.value * 60;
    updateDisplay();
    
    updateQuote(); 
    console.log("Timer Reset");
});

// DROPDOWN CHOICE
timerChoice.addEventListener('change', () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
    startBtn.innerText = "▶";
    timeLeft = timerChoice.value * 60;
    updateDisplay();
});