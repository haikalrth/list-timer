// To-Do List Functionality
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

// Countdown Timer Functionality
let countdown;
const timerDisplay = document.getElementById('timer-display');
const startStopButton = document.getElementById('start-stop');
let isTimerRunning = false;
let pausedTime = 0;

// Tambahkan elemen audio
const alarmSound = new Audio('sounds/alarm.mp3'); 

function toggleTimer() {
    if (isTimerRunning) {
        stopTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    
    if (hours === 0 && minutes === 0 && seconds === 0 && pausedTime === 0) {
        alert("Please enter a valid time!");
        return;
    }

    let totalTime = pausedTime || (hours * 3600 + minutes * 60 + seconds);
    const now = Date.now();
    const then = now + totalTime * 1000;
    
    displayTimeLeft(totalTime);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "Time's up!";
            alarmSound.play(); 
            isTimerRunning = false;
            startStopButton.textContent = "Start";
            pausedTime = 0;
            return;
        }
        displayTimeLeft(secondsLeft);
        pausedTime = secondsLeft;
    }, 1000);
    
    isTimerRunning = true;
    startStopButton.textContent = "Stop";
}

function stopTimer() {
    clearInterval(countdown);
    isTimerRunning = false;
    startStopButton.textContent = "Continue";
}

function resetTimer() {
    clearInterval(countdown);
    timerDisplay.textContent = "00:00:00";
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
    startStopButton.textContent = "Start";
    isTimerRunning = false;
    pausedTime = 0;

    // Hentikan suara alarm jika sedang dimainkan
    alarmSound.pause();
    alarmSound.currentTime = 0; // Kembalikan audio ke awal
}


function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainderMinutes = Math.floor((seconds % 3600) / 60);
    const remainderSeconds = seconds % 60;
    const display = `${hours < 10 ? '0' : ''}${hours}:${remainderMinutes < 10 ? '0' : ''}${remainderMinutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}
