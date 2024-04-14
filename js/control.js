let secondWindow = null; // Переменная для хранения ссылки на второе окно
let timerRunning = false; // Переменная для хранения состояния таймера
let timerInterval;
let timerRunningMed = false;
let timerIntervalMed;
let timerRunningWait = false;
let timerIntervalWait;
let seconds = 90;
let secondsWait = 60;
let secondsMed = 180;
let AkaVisible = false;
let AoVisible = false;
var akaScore = 0;
var aoScore = 0;
var akaippon = 0;
var akawazaari = 0;
var akayuko = 0;
var aoippon = 0;
var aowazaari = 0;
var aoyuko = 0;
var tatamiNumber = 1;
var audioPlayer = document.getElementById('audioPlayer');
var end = document.getElementById('end-game');
end.muted = true;
audioPlayer.muted = true;
var oldStyle = 'css/control-1.css';
var newStyle = 'css/control-2.css';
var currentStyle = oldStyle;

function toggleStyle() {
    var link = document.getElementById('style-link');
    if (currentStyle === oldStyle) {
        link.href = newStyle;
        currentStyle = newStyle;
    } else {
        link.href = oldStyle;
        currentStyle = oldStyle;
    }
}

document.getElementById("settings-button").addEventListener("click", function() {
    document.getElementById("time-modal").style.display = "block";
});

document.getElementsByClassName("close-time")[0].addEventListener("click", function() {
    document.getElementById("time-modal").style.display = "none";
});

document.getElementsByClassName("close-wait")[0].addEventListener("click", function() {
    document.getElementById("wait-modal").style.display = "none";
    pauseTimerWait()
});

document.getElementById("wait-button").addEventListener("click", function() {
    document.getElementById("wait-modal-1").style.display = "block";
});


document.getElementsByClassName("close-wait-1")[0].addEventListener("click", function() {
    document.getElementById("wait-modal-1").style.display = "none";
});

document.getElementById("med-button").addEventListener("click", function() {
    if (secondWindow && !secondWindow.closed) {
        document.getElementById("med-modal").style.display = "block";
    };
});

document.getElementsByClassName("close-med")[0].addEventListener("click", function() {
    document.getElementById("med-modal").style.display = "none";
    pauseTimerMed();
});

document.getElementById("tatami-button").addEventListener("click", function() {
    document.getElementById("tatami-modal").style.display = "block";
});

document.getElementsByClassName("close-tatami")[0].addEventListener("click", function() {
    document.getElementById("tatami-modal").style.display = "none";
});

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

function onStart() {
    openOrFocusSecondWindow()
}

function onOpen() {
    updateScore();
    secondWindow.postMessage({newTatami: tatamiNumber}, '*');
    secondWindow.postMessage({newTime: seconds}, '*');

    var buttonAka = document.getElementById('akasenshu');
    var buttonStylesAka = window.getComputedStyle(buttonAka);
    var buttonColorAka = buttonStylesAka.backgroundColor;

    var buttonAo = document.getElementById('aosenshu');
    var buttonStylesAo = window.getComputedStyle(buttonAo);
    var buttonColorAo = buttonStylesAo.backgroundColor;
    if (buttonColorAo === 'rgb(255, 238, 0)') {
        secondWindow.postMessage({ showSenshu: 'aosenshu'}, '*');
    }
    if (buttonColorAka === 'rgb(255, 238, 0)') {
        secondWindow.postMessage({ showSenshu: 'akasenshu'}, '*');
    }

    var aoc1 = document.getElementById('aoc1');
    var aoc2 = document.getElementById('aoc2');
    var aoc3 = document.getElementById('aoc3');
    var aohc = document.getElementById('aohc');
    var aoh = document.getElementById('aoh');

    var akac1 = document.getElementById('akac1');
    var akac2 = document.getElementById('akac2');
    var akac3 = document.getElementById('akac3');
    var akahc = document.getElementById('akahc');
    var akah = document.getElementById('akah');

    if (aoc1.checked) {
        secondWindow.postMessage({newWarn: aoc1.id}, '*');
    };
    if (aoc2.checked) {
        secondWindow.postMessage({newWarn: aoc2.id}, '*');
    };
    if (aoc3.checked) {
        secondWindow.postMessage({newWarn: aoc3.id}, '*');
    };
    if (aohc.checked) {
        secondWindow.postMessage({newWarn: aohc.id}, '*');
    };
    if (aoh.checked) {
        secondWindow.postMessage({newWarn: aoh.id}, '*');
    };

    if (akac1.checked) {
        secondWindow.postMessage({newWarn: akac1.id}, '*');
    };
    if (akac2.checked) {
        secondWindow.postMessage({newWarn: akac2.id}, '*');
    };
    if (akac3.checked) {
        secondWindow.postMessage({newWarn: akac3.id}, '*');
    };
    if (akahc.checked) {
        secondWindow.postMessage({newWarn: akahc.id}, '*');
    };
    if (akah.checked) {
        secondWindow.postMessage({newWarn: akah.id}, '*');
    };
    end.muted = true;
    audioPlayer.muted = true;
    audioPlayer.play();
    end.play();
}

function openOrFocusSecondWindow() {
    if (secondWindow === null || secondWindow.closed) {
        secondWindow = window.open("scoreboard.html", "_blank", "width=1600,height=900");
        setTimeout(onOpen, 1 * 1000);
    } else {
        secondWindow.focus();
    }
}

function minusScore(color) {
    if (color === 'akayuko') {
        if (akayuko >= 1) {
            if (akayuko === 1) {
                document.getElementById("akayukocount").setAttribute("disabled", "disabled");
            }
            akayuko--;
            akaScore--;
        }
    } else if (color === 'aoyuko') {
        if (aoyuko >= 1) {
            if (aoyuko === 1) {
                document.getElementById("aoyukocount").setAttribute("disabled", "disabled");
            }
            aoyuko--;
            aoScore--;
        }
    } else if (color === 'akawazaari') {
        if (akawazaari >= 1) {
            if (akawazaari === 1) {
                document.getElementById("akawazaaricount").setAttribute("disabled", "disabled");
            }
            akawazaari--;
            akaScore -= 2;
        }
    } else if (color === 'aowazaari') {
        if (aowazaari >= 1) {
            if (aowazaari === 1) {
                document.getElementById("aowazaaricount").setAttribute("disabled", "disabled");
            }
            aowazaari--;
            aoScore -= 2;
        }
    } else if (color === 'akaippon') {
        if (akaippon >= 1) {
            if (akaippon === 1) {
                document.getElementById("akaipponcount").setAttribute("disabled", "disabled");
            }
            akaippon--;
            akaScore -= 3;
        }
    } else if (color === 'aoippon') {
        if (aoippon >= 1) {
            if (aoippon === 1) {
                document.getElementById("aoipponcount").setAttribute("disabled", "disabled");
            }
            aoippon--;
            aoScore -= 3;
        }
    }
    updateScore()
    updatecount()
}

function yuko(color) {
    if (color === 'aka') {
        akaScore++;
        akayuko++;
        document.getElementById("akayukocount").removeAttribute("disabled");
    } else if (color === 'ao') {
        aoScore++;
        aoyuko++;
        document.getElementById("aoyukocount").removeAttribute("disabled");
    }
    updateScore()
    updatecount()
}

function wazaari(color) {
    if (color === 'aka') {
        akaScore += 2;
        akawazaari++;
        document.getElementById("akawazaaricount").removeAttribute("disabled");
    } else if (color === 'ao') {
        aoScore += 2;
        aowazaari++;
        document.getElementById("aowazaaricount").removeAttribute("disabled");
    }
    updateScore()
    updatecount()
}

function ippon(color) {
    if (color === 'aka') {
        akaScore += 3;
        akaippon++;
        document.getElementById("akaipponcount").removeAttribute("disabled");
    } else if (color === 'ao') {
        aoScore += 3;
        aoippon++;
        document.getElementById("aoipponcount").removeAttribute("disabled");
    }
    updateScore()
    updatecount()
}

function updatecount() {
    document.getElementById('aoippon').textContent = "IPPON⠀⠀⠀"+aoippon;
    document.getElementById('aowazaari').textContent = "WAZA-ARI "+aowazaari;
    document.getElementById('aoyuko').textContent = "YUKO ⠀⠀⠀"+aoyuko;
    
    document.getElementById('akaippon').textContent = "IPPON⠀⠀⠀"+akaippon;
    document.getElementById('akawazaari').textContent = "WAZA-ARI "+akawazaari;
    document.getElementById('akayuko').textContent = "YUKO ⠀⠀⠀"+akayuko;
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

function medTime() {
    if (secondWindow && !secondWindow.closed) {
        if (!timerRunningMed) {
            timerIntervalMed = setInterval(updateTimerMed, 1000);
        }
        timerRunningMed = true;
        secondWindow.postMessage('startMed', '*');
    }
}

function waitStart() {
    if (secondWindow && !secondWindow.closed) {
        updateTimeWait()
        if (!timerRunningWait) {
            timerIntervalWait = setInterval(updateTimerWait, 1000);
        }
        timerRunningWait = true;
        secondWindow.postMessage('startWait', '*');
        document.getElementById("wait-modal").style.display = "block";
    }
    document.getElementById("wait-modal-1").style.display = "none";
}

function startTimer() {
    if (!timerRunning) {
        timerInterval = setInterval(updateTimer, 1000);
        document.getElementById('timerDisplay').style.color = 'rgb(255, 187, 0)';
        document.getElementById('stop-button').style.display = 'block';
        document.getElementById('start-button').style.display = 'none';
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
    document.getElementById('stop-button').style.display = 'none';
    document.getElementById('start-button').style.display = 'block';
    document.getElementById('timerDisplay').style.color = 'white';
}

function stopTimer() {
    timerRunning = false;
    if (secondWindow && !secondWindow.closed) {
        secondWindow.postMessage('stopTime', '*');
    }
    clearInterval(timerInterval);
    document.getElementById('stop-button').style.display = 'none';
    document.getElementById('start-button').style.display = 'block';
    document.getElementById('timerDisplay').style.color = 'white';
}

function pauseTimerMed() {
    timerRunningMed = false;
    if (secondWindow && !secondWindow.closed) {
        secondWindow.postMessage('pauseMed', '*');
    }
    clearInterval(timerIntervalMed);
    secondsMed = 180;
    document.getElementById('med-timer').innerText = "3:00";
    document.getElementById("med-modal").style.display = "none";
}

function pauseTimerWait() {
    timerRunningWait = false;
    if (secondWindow && !secondWindow.closed) {
        secondWindow.postMessage('pauseWait', '*');
    }
    clearInterval(timerIntervalWait);
    secondsWait = 60;
    document.getElementById('wait-timer').innerText = formatTime(secondsWait);
    document.getElementById("wait-modal").style.display = "none";
}

function formatTime(time) {
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    return `${minutes < 10 ? minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function isElementVisible(element) {
    return window.getComputedStyle(element).display !== 'none';
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        event.preventDefault();
        var startButton = document.getElementById("start-button")
        var stopButton = document.getElementById("stop-button")
        if (isElementVisible(startButton)) {
            startTimer()
        } else if (isElementVisible(stopButton)) {
            pauseTimer()
        }
        
    }
})

function resetMatch() {
    pauseTimer()
    akaScore = 0;
    aoScore = 0;
    updateTime();
    if (secondWindow && !secondWindow.closed) {
        secondWindow.postMessage({newTime: seconds}, '*');
        secondWindow.postMessage('resetMatch', '*');
    }
    updateScore();
    uncheckAllCheckboxes();
    akaippon = 0;
    akawazaari = 0;
    akayuko = 0;
    aoippon = 0;
    aowazaari = 0;
    aoyuko = 0;
    updatecount()
    end.muted = true;
    audioPlayer.muted = true;
    AkaVisible = false;
    AoVisible = false;
    document.getElementById('akasenshu').style.backgroundColor = 'rgb(223, 223, 223)';
    document.getElementById('aosenshu').style.backgroundColor = 'rgb(223, 223, 223)';
    document.getElementById("aoipponcount").setAttribute("disabled", "disabled");
    document.getElementById("akaipponcount").setAttribute("disabled", "disabled");
    document.getElementById("aowazaaricount").setAttribute("disabled", "disabled");
    document.getElementById("akawazaaricount").setAttribute("disabled", "disabled");
    document.getElementById("aoyukocount").setAttribute("disabled", "disabled");
    document.getElementById("akayukocount").setAttribute("disabled", "disabled");
}

function updateTimer() {
    seconds--;
    if (seconds < 0) {
        seconds = 0;
        stopTimer();
        end.muted = false;
        end.play();
    } else if (seconds <= 15) {
        document.getElementById('timerDisplay').style.color = 'rgb(255, 0, 0)';
    }
    if (seconds === 15) {
        audioPlayer.muted = false;
        audioPlayer.play();
    }
    document.getElementById('timerDisplay').innerText = formatTime(seconds);
}

function updateTimerMed() {
    secondsMed--;
    if (secondsMed < 0) {
        pauseTimerMed();
        secondsMed = 0;
    }
    document.getElementById('med-timer').innerText = formatTime(secondsMed);
}

function updateTimerWait() {
    secondsWait--;
    if (secondsWait < 0) {
        pauseTimerWait();
        secondsWait = 0;
    }
    document.getElementById('wait-timer').innerText = formatTime(secondsWait);
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

// Функция для обновления времени на втором окне
function updateTime() {
    let minutes = parseInt(document.getElementById('minutes').value);
    let seconds = parseInt(document.getElementById('seconds').value);

    if (!isNaN(minutes) && !isNaN(seconds)) {
        seconds = minutes * 60 + seconds;
        if (secondWindow && !secondWindow.closed) {
            secondWindow.postMessage({newTime: seconds}, '*');
        }
        updateTimerr(seconds);
        document.getElementById("time-modal").style.display = "none";
    }
}

function updateTimeWait() {
    let minutesWait = parseInt(document.getElementById('minutesWait').value);
    let secondsWait = parseInt(document.getElementById('secondsWait').value);

    if (!isNaN(minutesWait) && !isNaN(secondsWait)) {
        secondsWait = minutesWait * 60 + secondsWait;
        if (secondWindow && !secondWindow.closed) {
            secondWindow.postMessage({newTimeWait: secondsWait}, '*');
        }
        updateTimerrWait(secondsWait);
        document.getElementById("wait-modal").style.display = "none";
    }
}

function updateTimerrWait(newTime) {
    secondsWait = newTime;
    if (!timerRunningWait) {
        document.getElementById('wait-timer').innerText = formatTime(secondsWait);
    }
}

function updateTatami() {
    let number = parseInt(document.getElementById('tatami-number').value);
    tatamiNumber = number;

    if (!isNaN(number)) {
        if (secondWindow && !secondWindow.closed) {
            secondWindow.postMessage({newTatami: number}, '*');
        }
    }
    document.getElementById("tatami-modal").style.display = "none";
}

function senshuAdd(color) {
    // Получаем элемент кнопки по его ID
    var button = document.getElementById(`${color}`);

    var buttonStyles = window.getComputedStyle(button);
    var buttonColor = buttonStyles.backgroundColor;
    if (buttonColor === 'rgb(223, 223, 223)') {
        if (color === 'aosenshu') {
            AoVisible = !AoVisible;
            document.getElementById('aosenshu').style.backgroundColor = AoVisible ? 'rgb(255, 238, 0)' : 'rgb(223, 223, 223)';
            if (secondWindow && !secondWindow.closed) {
                secondWindow.postMessage({ showSenshu: 'aosenshu'}, '*');
            }
        } else {
            AkaVisible = !AkaVisible;
            document.getElementById('akasenshu').style.backgroundColor = AkaVisible ? 'rgb(255, 238, 0)' : 'rgb(223, 223, 223)';
            if (secondWindow && !secondWindow.closed) {
                secondWindow.postMessage({ showSenshu: 'akasenshu' }, '*');
            }
        }
    } else {
        if (color === 'aosenshu') {
            AoVisible = !AoVisible;
            document.getElementById(color).style.backgroundColor = AoVisible ? 'rgb(255, 238, 0)' : 'rgb(223, 223, 223)';
            if (secondWindow && !secondWindow.closed) {
                secondWindow.postMessage({ hideSenshu: 'aosenshu' }, '*');
            }
        } else {
            AkaVisible = !AkaVisible;
            document.getElementById(color).style.backgroundColor = AkaVisible ? 'rgb(255, 238, 0)' : 'rgb(223, 223, 223)';
            if (secondWindow && !secondWindow.closed) {
                secondWindow.postMessage({ hideSenshu: 'akasenshu' }, '*');
            }
        }
    }

}