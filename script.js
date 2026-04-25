const cursor = document.getElementById("liquid-cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

const timerBox = document.querySelector(".timer");
let isDragging = false;
let offsetX, offsetY;

timerBox.addEventListener("mousedown", (e) => {
    if (e.target.closest('button') || e.target.id === 'display-text') return;
    const rect = timerBox.getBoundingClientRect();
    isDragging = true;
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    timerBox.style.opacity = "0.8";
    timerBox.style.cursor = "grabbing";
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

let currentMode = "work"; 
let isTimerRunning = false; 
let timeLeft = 25 * 60;
let lastSetTime = 25 * 60;
let timerInterval = null;

const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const displayText = document.getElementById('display-text');
const modal = document.getElementById('custom-modal');
const openBtn = document.getElementById('open-menu-btn');
const closeBtn = document.getElementById('close-modal');
const timeDisplay = document.querySelector('.time-display');

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
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            isTimerRunning = false;
            startBtn.innerText = "▶";
            alert("Session finished!");
        }
    }, 1000);
}

startBtn.addEventListener('click', () => {
  if (!isTimerRunning) {
    if (displayText.innerHTML === "" && currentMode === "work") {
      updateQuote();
    }
    isTimerRunning = true;
    startBtn.innerText = "⏸";
    startTimer();
  } else {
    isTimerRunning = false;
    startBtn.innerText = "▶";
    clearInterval(timerInterval);
  }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
    startBtn.innerText = "▶";
    timeLeft = lastSetTime; 
    updateDisplay();
    if (currentMode === "work") {
        updateQuote(); 
    } else {
        displayText.innerHTML = "Rest up! 🌿";
    }
});

openBtn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";

window.setTimer = function(mins, mode) {
    clearInterval(timerInterval);
    isTimerRunning = false;
    startBtn.innerText = "▶";
    lastSetTime = mins * 60;
    timeLeft = lastSetTime;
    currentMode = mode;
    updateDisplay();
    if (mode === "break") {
        displayText.innerHTML = "Rest up! 🌿";
    } else {
        displayText.innerHTML = ""; 
    }
    modal.style.display = "none";
};
