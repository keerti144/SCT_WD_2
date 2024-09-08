let startTime, updatedTime, difference, timerInterval;
let isRunning = false;
const timeDisplay = document.getElementById('time-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapTimesList = document.getElementById('lap-times');

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 10);
        startPauseBtn.textContent = 'Pause';
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        startPauseBtn.textContent = 'Start';
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    timeDisplay.textContent = '00:00:00.000';
    difference = 0;
    lapTimesList.innerHTML = '';
    startPauseBtn.textContent = 'Start';
    isRunning = false;
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = timeDisplay.textContent;
        lapTimesList.appendChild(lapTime);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    timeDisplay.textContent = formatTime(updatedTime);
}

function formatTime(milliseconds) {
    let date = new Date(milliseconds);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let ms = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${ms}`;
}

startPauseBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
