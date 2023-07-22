const startTimerBtn = document.getElementById("startTimerBtn");
const activeTimersDisplay = document.getElementById("activeTimersDisplay");
const timerEndDisplay = document.getElementById("timerEndDisplay");
const alertSound = document.getElementById("alertSound");
const paragraph = document.getElementById("para");
let timers = [];

startTimerBtn.addEventListener("click", () => {
  paragraph.style.display = "none";
  const hours = parseInt(document.getElementById("hours").value);
  const minutes = parseInt(document.getElementById("minutes").value);
  const seconds = parseInt(document.getElementById("seconds").value);

  if (!isNaN(hours) || !isNaN(minutes) || !isNaN(seconds)) {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      createTimer(totalSeconds);
    }
  }
});

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;
}

function updateTimersDisplay() {
  activeTimersDisplay.innerHTML = ""; // Clear the display before updating

  timers.forEach((timer, index) => {
    const timerDiv = document.createElement("div");
    timerDiv.className = "timer";
    timerDiv.innerHTML = `
    <div style="margin-right: 20px">
          <p style="color: white">Time Left :</p>
        </div>
      <div class=run-time style="margin-left: 150px">  
    <span class="timer-remaining">${formatTime(timer.remainingTime)}</span>
      </div>
      <button class="stop-timer-btn" data-index="${index}">Stop Timer</button>
    `;

    activeTimersDisplay.appendChild(timerDiv);
  });
}

function playAlertSound() {
  alertSound.currentTime = 0; // Rewind to the beginning of the audio
  alertSound.play();
}

function stopTimer(index) {
  clearInterval(timers[index].intervalId);
  timers[index].intervalId = null; //Indicate that timer is stop here.....
  //timers.splice(index, 1);
  updateTimersDisplay();
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("stop-timer-btn")) {
    const index = parseInt(event.target.dataset.index);
    stopTimer(index);
  }
});

function createTimer(totalSeconds) {
  const timer = {
    remainingTime: totalSeconds,
    intervalId: null,
  };

  timer.intervalId = setInterval(() => {
    timer.remainingTime--;

    if (timer.remainingTime <= 0) {
      clearInterval(timer.intervalId);
      timerEndDisplay.textContent = "Timer Is Up !";
      timerEndDisplay.style.display = "block";
      playAlertSound();
      setTimeout(() => {
        timerEndDisplay.style.display = "none";
        activeTimersDisplay.style.display = "none";
      }, 5000); // Hide the timer end display after 5 seconds
    }

    updateTimersDisplay();
  }, 1000);

  timers.push(timer);
  updateTimersDisplay();
}