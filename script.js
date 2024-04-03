let secondWindow = null; // Переменная для хранения ссылки на второе окно
let timerRunning = false; // Переменная для хранения состояния таймера
let timerInterval;
let seconds = 90;
let senshuAkaVisible = false;
let senshuAoVisible = false;
var akaScore = 0;
var aoScore = 0;

function uncheckAllCheckboxes() {
    // Получаем все чекбоксы на странице
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Проходимся по каждому чекбоксу и снимаем отметку
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
}

function warn(checkbox) {
    // Если чекбокс отмечен, делаем элемент видимым, иначе скрываем его
    if (secondWindow && !secondWindow.closed) {
        if (checkbox.checked) {
            secondWindow.postMessage({newWarn: checkbox.id}, '*');
        } else {
            secondWindow.postMessage({unWarn: checkbox.id}, '*');
        }
    }
}

function openOrFocusSecondWindow() {
    if (secondWindow === null || secondWindow.closed) {
        secondWindow = window.open("second.html", "_blank", "width=1600,height=900");
        secondWindow.timerRunning = timerRunning; // Передаем состояние таймера во второе окно
    } else {
        secondWindow.focus();
    }
}

function minusScore(color) {
    if (color === 'aka') {
        if (akaScore > 0) {
            akaScore--;
        }
    } else if (color === 'ao') {
        if (aoScore > 0) {
            aoScore--;
        }
    }
    updateScore()
}

function yuko(color) {
    if (color === 'aka') {
        akaScore++;
    } else if (color === 'ao') {
        aoScore++;
    }
    updateScore()
}

function wazaari(color) {
    if (color === 'aka') {
        akaScore += 2;
    } else if (color === 'ao') {
        aoScore += 2;
    }
    updateScore()
}

function ippon(color) {
    if (color === 'aka') {
        akaScore += 3;
    } else if (color === 'ao') {
        aoScore += 3;
    }
    updateScore()
}

function updateScore() {
    document.getElementById('aka-score').innerText = akaScore;
    document.getElementById('ao-score').innerText = aoScore;
    
    var data = {
        newAkaScore: akaScore,
        newAoScore: aoScore
    }

    if (secondWindow && !secondWindow.closed) {
        secondWindow.postMessage({newScore: data}, '*');
    }
}

function startTimer() {
    if (!timerRunning) {
        timerInterval = setInterval(updateTimer, 1000);
        document.getElementById('timerDisplay').style.color = 'rgb(255, 187, 0)';
        document.getElementById('pauseButton').style.display = 'block';
        document.getElementById('startButton').style.display = 'none';
    }
    timerRunning = true;
    if (secondWindow && !secondWindow.closed) {
        secondWindow.postMessage('start', '*');
    }
}

function pauseTimer() {
    timerRunning = false;
    if (secondWindow && !secondWindow.closed) {
        secondWindow.postMessage('pause', '*');
    }
    clearInterval(timerInterval);
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('startButton').style.display = 'block';
    document.getElementById('timerDisplay').style.color = 'black';
}

function formatTime(time) {
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    return `${minutes < 10 ? minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function resetMatch() {
    pauseTimer()
    seconds = 90;
    akaScore = 0;
    aoScore = 0;
    document.getElementById('timerDisplay').innerText = formatTime(seconds);
    if (secondWindow && !secondWindow.closed) {
        secondWindow.postMessage({newTime: seconds}, '*');
        secondWindow.postMessage('resetMatch', '*');
    }
    updateScore();
    uncheckAllCheckboxes();
}

function updateTimer() {
    seconds--;
    if (seconds < 0) {
        pauseTimer();
        seconds = 0;
    }

    document.getElementById('timerDisplay').innerText = formatTime(seconds);
}

function updateTimerr(newTime) {
    seconds = newTime;
    if (!timerRunning) {
        document.getElementById('timerDisplay').innerText = formatTime(seconds);
    }
}


// Обработчик события перед закрытием первого окна
window.addEventListener("beforeunload", function(event) {
    if (secondWindow && !secondWindow.closed) {
        secondWindow.postMessage('close', '*');
    }
});