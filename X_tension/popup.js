let timerInterval;
let totalSeconds = 0;
const timerElement = document.getElementById('timer');
const recordingIndicator = document.getElementById('recording-indicator');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

function startTimer() {
    // Reset timer
    totalSeconds = 0;
    updateTimerDisplay();
    
    // Start interval
    timerInterval = setInterval(function() {
        totalSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    totalSeconds = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}


document.getElementById("start").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "startRecording" });
    });

    // timerElement.classList.remove('hidden');
    // recordingIndicator.classList.remove('hidden');
    
    // // Start timer
    // startTimer();
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
});

document.getElementById("stop").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "stopRecording" });
    });

    // timerElement.classList.add('hidden');
    // recordingIndicator.classList.add('hidden');
    
    // // Stop timer
    // stopTimer();
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
});
