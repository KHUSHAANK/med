const intervalInput = document.getElementById('interval');
const startButton = document.getElementById('startButton');
const timerDisplay = document.getElementById('timer');
const bellSound = document.getElementById('bellSound');

let intervalId;
let remainingSeconds = 0;

function updateTimerDisplay() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startMeditation() {
  remainingSeconds = intervalInput.value * 60;
  updateTimerDisplay();

  clearInterval(intervalId); // Clear any previous interval
  intervalId = setInterval(() => {
    remainingSeconds--;
    updateTimerDisplay();

    if (remainingSeconds === 0) {
      clearInterval(intervalId);
      bellSound.play();
    }
  }, 1000); // Update every second

  startButton.disabled = true; // Disable button while meditation is in progress
}

// Start meditation on Enter key press in the interval input field
intervalInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    startMeditation();
  }
});

startButton.addEventListener('click', startMeditation); // Existing click event listener
