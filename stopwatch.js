let startTime = null;
let elapsedTime = 0;
let timerInterval;
let lapCount = 0;

// Elements
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const lapList = document.getElementById("lap-list");

// Start Button Functionality
document.getElementById("start-btn").addEventListener("click", () => {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
  }
});

// Pause Button Functionality
document.getElementById("pause-btn").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

// Reset Button Functionality
document.getElementById("reset-btn").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  lapCount = 0;
  lapList.innerHTML = ""; // Clear laps
  updateTimerDisplay(0, 0, 0);
});

// Lap Button Functionality
document.getElementById("lap-btn").addEventListener("click", () => {
  if (timerInterval) {
    lapCount++;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
    lapList.appendChild(li);
  }
});

// Update Timer
function updateTimer() {
  elapsedTime = Date.now() - startTime;
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  updateTimerDisplay(minutes, seconds, milliseconds);
}

// Update Timer Display
function updateTimerDisplay(minutes, seconds, milliseconds) {
  minutesEl.textContent = formatNumber(minutes);
  secondsEl.textContent = formatNumber(seconds);
  millisecondsEl.textContent = formatNumber(milliseconds);
}

// Format Time for Lap Display
function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${formatNumber(minutes)}:${formatNumber(seconds)}:${formatNumber(milliseconds)}`;
}

// Format Number with Leading Zeros
function formatNumber(number) {
  return number.toString().padStart(2, "0");
}
