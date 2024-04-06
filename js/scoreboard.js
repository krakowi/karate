let timerInterval;
let timerRunning = false;
let seconds = 90;
let timerIntervalMed;
let timerRunningMed = false;
let secondsMed = 180;
let timerIntervalWait;
let timerRunningWait = false;
let secondsWait = 60;
let senshuAkaVisible = false;
let senshuAoVisible = false;
var akaScore = 0;
var aoScore = 0;

function warn(pen) {
    if (pen === 'akac1') {
        document.getElementById('akac1').style.border = '5px solid rgb(255, 238, 0)';
        document.getElementById('akac1').style.borderRadius = '13px';
        document.getElementById('akac1').style.backgroundColor = 'rgba(255, 217, 0, 0.342)';
    } else if (pen === 'akac2') {
        document.getElementById('akac2').style.border = '5px solid rgb(255, 238, 0)';
        document.getElementById('akac2').style.borderRadius = '13px';
        document.getElementById('akac2').style.backgroundColor = 'rgba(255, 217, 0, 0.342)';
    } else if (pen === 'akac3') {
        document.getElementById('akac3').style.border = '5px solid rgb(255, 238, 0)';
        document.getElementById('akac3').style.borderRadius = '13px';
        document.getElementById('akac3').style.backgroundColor = 'rgba(255, 217, 0, 0.342)';
    } else if (pen === 'akahc') {
        document.getElementById('akahc').style.border = '5px solid rgb(255, 238, 0)';
        document.getElementById('akahc').style.borderRadius = '13px';
        document.getElementById('akahc').style.backgroundColor = 'rgba(255, 217, 0, 0.342)';
    } else if (pen === 'akah') {
        document.getElementById('akah').style.border = '5px solid rgb(255, 238, 0)';
        document.getElementById('akah').style.backgroundColor = 'rgba(255, 217, 0, 0.342)';
        document.getElementById('akah').style.borderRadius = '13px';
        document.getElementById('ao-score').classList.add('flashing');
    } else if (pen === 'aoc1') {
        document.getElementById('aoc1').style.border = '5px solid rgb(255, 238, 0)';
        document.getElementById('aoc1').style.borderRadius = '13px';
        document.getElementById('aoc1').style.backgroundColor = 'rgba(255, 217, 0, 0.342)';
    } else if (pen === 'aoc2') {
        document.getElementById('aoc2').style.border = '5px solid rgb(255, 238, 0)';
        document.getElementById('aoc2').style.borderRadius = '13px';
        document.getElementById('aoc2').style.backgroundColor = 'rgba(255, 217, 0, 0.342)';
    } else if (pen === 'aoc3') {
        document.getElementById('aoc3').style.border = '5px solid rgb(255, 238, 0)';
        document.getElementById('aoc3').style.borderRadius = '13px';
        document.getElementById('aoc3').style.backgroundColor = 'rgba(255, 217, 0, 0.342)';
    } else if (pen === 'aohc') {
        document.getElementById('aohc').style.border = '5px solid rgb(255, 238, 0)';
        document.getElementById('aohc').style.borderRadius = '13px';
        document.getElementById('aohc').style.backgroundColor = 'rgba(255, 217, 0, 0.342)';
    } else if (pen === 'aoh') {
        document.getElementById('aoh').style.border = '5px solid rgb(255, 238, 0)';
        document.getElementById('aoh').style.borderRadius = '13px';
        document.getElementById('aoh').style.backgroundColor = 'rgba(255, 217, 0, 0.342)';
        document.getElementById('aka-score').classList.add('flashing');
    }
}

function unwarn(pen) {
    if (pen === 'akac1') {
        document.getElementById('akac1').style.border = 'none';
        document.getElementById('akac1').style.backgroundColor = 'transparent';
    } else if (pen === 'akac2') {
        document.getElementById('akac2').style.border = 'none';
        document.getElementById('akac2').style.backgroundColor = 'transparent';
    } else if (pen === 'akac3') {
        document.getElementById('akac3').style.border = 'none';
        document.getElementById('akac3').style.backgroundColor = 'transparent';
    } else if (pen === 'akahc') {
        document.getElementById('akahc').style.border = 'none';
        document.getElementById('akahc').style.backgroundColor = 'transparent';
    } else if (pen === 'akah') {
        document.getElementById('akah').style.border = 'none';
        document.getElementById('akah').style.backgroundColor = 'transparent';
    } else if (pen === 'aoc1') {
        document.getElementById('aoc1').style.border = 'none';
        document.getElementById('aoc1').style.backgroundColor = 'transparent';
    } else if (pen === 'aoc2') {
        document.getElementById('aoc2').style.border = 'none';
        document.getElementById('aoc2').style.backgroundColor = 'transparent';
    } else if (pen === 'aoc3') {
        document.getElementById('aoc3').style.border = 'none';
        document.getElementById('aoc3').style.backgroundColor = 'transparent';
    } else if (pen === 'aohc') {
        document.getElementById('aohc').style.border = 'none';
        document.getElementById('aohc').style.backgroundColor = 'transparent';
    } else if (pen === 'aoh') {
        document.getElementById('aoh').style.border = 'none';
        document.getElementById('aoh').style.backgroundColor = 'transparent';
    }
}

function unwarnall() {
    document.getElementById('akac1').style.border = 'none';
    document.getElementById('akac2').style.border = 'none';
    document.getElementById('akac3').style.border = 'none';
    document.getElementById('akahc').style.border = 'none';
    document.getElementById('akah').style.border = 'none';
    document.getElementById('aoc1').style.border = 'none';
    document.getElementById('aoc2').style.border = 'none';
    document.getElementById('aoc3').style.border = 'none';
    document.getElementById('aohc').style.border = 'none';
    document.getElementById('aoh').style.border = 'none';

    document.getElementById('akac1').style.backgroundColor = 'transparent';
    document.getElementById('akac2').style.backgroundColor = 'transparent';
    document.getElementById('akac3').style.backgroundColor = 'transparent';
    document.getElementById('akahc').style.backgroundColor = 'transparent';
    document.getElementById('akah').style.backgroundColor = 'transparent';
    document.getElementById('aoc1').style.backgroundColor = 'transparent';
    document.getElementById('aoc2').style.backgroundColor = 'transparent';
    document.getElementById('aoc3').style.backgroundColor = 'transparent';
    document.getElementById('aohc').style.backgroundColor = 'transparent';
    document.getElementById('aoh').style.backgroundColor = 'transparent';
}

// Функция для запуска таймера
function startTimer() {
    if (!timerRunning) {
        document.getElementById('timer').style.color = 'rgb(255, 187, 0)';
        timerInterval = setInterval(updateTimer, 1000);
        timerRunning = true;
    }
}

function startTimerMed() {
    if (!timerRunningMed) {
        timerIntervalMed = setInterval(updateTimerMed, 1000);
        timerRunningMed = true;
        document.getElementById('med-modal').style.display = 'block';
    }
}

function startTimerWait() {
    if (!timerRunningWait) {
        timerIntervalWait = setInterval(updateTimerWait, 1000);
        timerRunningWait = true;
        document.getElementById('wait-modal').style.display = 'block';
    }
}

// Функция для остановки таймера
function pauseTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('timer').style.color = 'white';
}

function pauseTimerMed() {
    clearInterval(timerIntervalMed);
    timerRunningMed = false;
    secondsMed = 180;
    document.getElementById('med-modal').style.display = "none";
    document.getElementById('med-timer').innerText = "3:00";
}

function pauseTimerWait() {
    clearInterval(timerIntervalWait);
    timerRunningWait = false;
    secondsWait = 60;
    document.getElementById('wait-modal').style.display = "none";
    document.getElementById('wait-timer').innerText = "1:00";
}

// Функция для обновления таймера
function updateTimer() {
    seconds--;
    if (seconds < 0) {
        pauseTimer();
        seconds = 0;
        if (akaScore < aoScore) {
            document.getElementById('ao-score').classList.add('flashing');
        } else if (akaScore > aoScore) {
            document.getElementById('aka-score').classList.add('flashing');
        } else if (akaScore === aoScore) {
            if (senshuAkaVisible === true) {
                document.getElementById('aka-score').classList.add('flashing');
            } else if (senshuAoVisible === true) {
                document.getElementById('ao-score').classList.add('flashing');
            }
        }
    } else if (seconds <= 15) {
        document.getElementById('timer').style.color = 'rgb(255, 0, 0)';
    }
    document.getElementById('timer').innerText = formatTime(seconds);
}

function updateTimerMed() {
    secondsMed--;
    if (secondsMed < 0) {
        pauseTimerMed();
        secondsMed = 0;
        document.getElementById('med-modal').style.display = "none";
    }
    document.getElementById('med-timer').innerText = formatTime(secondsMed);
}

function updateTimerWait() {
    secondsWait--;
    if (secondsWait < 0) {
        pauseTimerWait();
        secondsWait = 0;
        document.getElementById('wait-modal').style.display = "none";
    }
    document.getElementById('wait-timer').innerText = formatTime(secondsWait);
}

// Функция для форматирования времени
function formatTime(time) {
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    return `${minutes < 10 ? minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function hideElement() {
    document.getElementById('over-modal').style.display = 'none';
  }

function showForSeconds(seconds) {
    document.getElementById('over-modal').style.display = 'block';
    setTimeout(hideElement, seconds * 1000); // переводим секунды в миллисекунды
}

window.addEventListener('message', function(event) {
    if (event.data === 'start') { // старт времени
        startTimer();
    } else if (event.data === 'startMed') { // старт времени
        startTimerMed();
    } else if (event.data === 'startWait') { // старт времени
        startTimerWait();
    } else if (event.data === 'pause') { // пауза времени
        pauseTimer();
    } else if (event.data === 'pauseMed') { // пауза времени
        pauseTimerMed();
    } else if (event.data === 'pauseWait') { // пауза времени
        pauseTimerWait();
    } else if (event.data === 'close') { // закрытие окна
        closeWindow();
    } else if (event.data.newTime !== undefined) { // смена времени
        updateTime(event.data.newTime);
    } else if (event.data === 'stopTime') {
        showForSeconds(2);
    } else if (event.data.newTimeWait !== undefined) { // смена времени
        updateTimeWait(event.data.newTimeWait);
    } else if (event.data.newTatami !== undefined) { // смена номера татами
        updateTatami(event.data.newTatami);
    } else if (event.data.showAkaSenshu) { // ака сеншу
        senshuAkaVisible = !senshuAkaVisible;
        document.getElementById('aka-senshu').style.display = senshuAkaVisible ? 'flex' : 'none';
    } else if (event.data === 'resetMatch') { // Перезапустить матч
        senshuAkaVisible = false
        document.getElementById('aka-senshu').style.display = 'none';
        senshuAoVisible = false
        document.getElementById('ao-senshu').style.display = 'none';
        unwarnall();
        akaScore = 0;
        aoScore = 0;
    } else if (event.data.showAoSenshu) { // ао сеншу
        senshuAoVisible = !senshuAoVisible;
        document.getElementById('ao-senshu').style.display = senshuAoVisible ? 'flex' : 'none';
    } else if (event.data.newScore) { // обновить счет
        newAkaScore = event.data.newScore.newAkaScore;
        newAoScore = event.data.newScore.newAoScore;
        document.getElementById('aka-score').innerText = newAkaScore;
        document.getElementById('ao-score').innerText = newAoScore;
        akaScore = newAkaScore;
        aoScore = newAoScore;

        var scoreDifference = Math.abs(newAkaScore - newAoScore);
        if (scoreDifference >= 8) {
            if (newAkaScore > newAoScore) {
                document.getElementById('aka-score').classList.add('flashing');
            } else if (newAkaScore < newAoScore) {
                document.getElementById('ao-score').classList.add('flashing');
            }       
        } else {
            document.getElementById('aka-score').classList.remove('flashing');
            document.getElementById('ao-score').classList.remove('flashing');
        }
    } else if (event.data.newWarn) { // выдать наказание
        warn(event.data.newWarn);
    } else if (event.data.unWarn) { // снять наказание
        unwarn(event.data.unWarn);
    }
});

// Функция для обновления времени
function updateTime(newTime) {
    seconds = newTime;
    if (!timerRunning) {
        document.getElementById('timer').innerText = formatTime(seconds);
    }
}

function updateTimeWait(newTimeWait) {
    secondsWait = newTimeWait;
    if (!timerRunningWait) {
        document.getElementById('wait-timer').innerText = formatTime(secondsWait);
    }
}

function updateTatami(newTatami) {
    number = newTatami;
    document.getElementById('tatami-number').innerText = number;
}

// Функция для закрытия окна
function closeWindow() {
    window.close();
}