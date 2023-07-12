//ПЕРЕМЕННЫЕ
const body = document.querySelector('body');

// инпуты 
const workTime = document.getElementById('workTime');
const shortBreakTime = document.getElementById('shortBreakTime');
const longBreakTime = document.getElementById('longBreakTime');

// кнопки режимов
const workButton = document.getElementById('workButton');
const shortBreakButton = document.getElementById('shortBreakButton');
const longBreakButton = document.getElementById('longBreakButton');


// кнопка старт/пауза и абзацы с секундами и минутами
const minutePart = document.querySelector('.minute-part');
const secondPart = document.querySelector('.second-part');
const controlButton = document.getElementById('controlButton');

//кнопки настроек и открыть/закрыть модальное окно
const resetButton = document.getElementById('resetButton');
const settingButton = document.getElementById('settingButton');
const closeModal = document.querySelector('input[value=Close]');
const saveChanges = document.querySelector('input[value=Save]');

const modalWindow = document.querySelector('.modal-window');

const numberInputs = document.querySelectorAll('input[type=number]');

// основные переменные для таймера
let interval = null;
let remainingSeconds = workTime.value * 60;


// КНОПКИ НА ИЗМЕНЕНИЕ СТИЛЕЙ
minutePart.innerHTML = Math.floor(workTime.value).toString().padStart(2, '0');
secondPart.innerHTML = Math.round(((workTime.value - Math.floor(workTime.value)) * 60)).toString().padStart(2, '0');

workButton.addEventListener('click', () => {
    workButton.classList.add('active');
    shortBreakButton.classList.remove('active');
    longBreakButton.classList.remove('active');
    minutePart.innerHTML = Math.floor(workTime.value).toString().padStart(2, '0');
    secondPart.innerHTML = Math.round(((workTime.value - Math.floor(workTime.value)) * 60)).toString().padStart(2, '0');
    remainingSeconds = workTime.value * 60;
    stopTimer()
})
shortBreakButton.addEventListener('click', () => {
    shortBreakButton.classList.add('active');
    workButton.classList.remove('active');
    longBreakButton.classList.remove('active');
    minutePart.innerHTML = Math.floor(shortBreakTime.value).toString().padStart(2, '0');
    secondPart.innerHTML = Math.round(((shortBreakTime.value - Math.floor(shortBreakTime.value)) * 60)).toString().padStart(2, '0');
    remainingSeconds = shortBreakTime.value * 60;
    stopTimer()
})
longBreakButton.addEventListener('click', () => {
    longBreakButton.classList.add('active');
    workButton.classList.remove('active');
    shortBreakButton.classList.remove('active');
    minutePart.innerHTML = Math.floor(longBreakTime.value).toString().padStart(2, '0');
    secondPart.innerHTML = Math.round(((longBreakTime.value - Math.floor(longBreakTime.value)) * 60)).toString().padStart(2, '0');
    remainingSeconds = longBreakTime.value * 60; 
    stopTimer()
})

// добавляем переменные для учета количества выполненных циклов работы и перерывов
let workCount = 0;
let breakCount = 0;

// функция для переключения между режимами работы и перерывов
function switchMode() {
  if (workButton.classList.contains('active')) {
    // если текущий режим - работа, переключаем на короткий перерыв
    shortBreakButton.click();
    breakCount++;
    if (breakCount % 4 === 0) {
      // если выполнено 4 цикла работы, переключаем на длинный перерыв
        longBreakButton.click();
    }
  } else {
    // если текущий режим - перерыв, переключаем на работу
    workButton.click();
    workCount++;
  }
  startTimer(); // запускаем таймер для нового режима
}

// функция для обновления времени таймера и переключения режимов
function updateTimer() {
  remainingSeconds--;
  updateCountDown();
  if (remainingSeconds === 0) {
    soundClick();
    switchMode();
  }
}

// ограничиваем допустимую длину введенных значений в инпуты
numberInputs.forEach(item => {
    item.addEventListener('input', () => {
        if((item.value > 99) || (item.value <= 0)) {
            saveChanges.setAttribute('disabled', '');
        } else {
            saveChanges.removeAttribute('disabled', '');
        }

    })
})

// при нажатии на кнопку если таймер запущен, остановит, и наоборот
controlButton.addEventListener('click', () => {
    if(interval === null) {
        startTimer();
    } else {
        stopTimer()
    }

})

// обновляем данные на экране
function updateCountDown() {
    let minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
    let seconds = Math.floor(remainingSeconds % 60).toString().padStart(2, '0');
    minutePart.innerHTML = minutes;
    secondPart.innerHTML = seconds;
}

// если таймер не запущен, висит старт, иначе висит пауза
function updateControls() {
    if(interval === null) {
        controlButton.innerHTML = 'start';
    } else {
        controlButton.innerHTML = 'pause';
    }
}

// воспроизводим звук
function soundClick() {
    var audio = new Audio();
    audio.src = 'audio/bird.mp3';
    audio.autoplay = true;
}

// запускаем таймер
function startTimer() {
  if (interval === null) {
    interval = setInterval(updateTimer, 1000);
    updateControls();
  }
}

//останавливаем таймер
function stopTimer() {
    clearInterval(interval);
    interval = null;
    updateControls();
}

// кнопка перезапустить
resetButton.addEventListener('click', () => {
    if(workButton.classList.contains('active')) {
        const givenMinutes = workTime.value;
        if(givenMinutes <= 99) {
            stopTimer();
            remainingSeconds = givenMinutes * 60;
            updateCountDown();
        }
    } else if(shortBreakButton.classList.contains('active')) {
        const givenMinutes = shortBreakTime.value;
        if(givenMinutes <= 99) {
            stopTimer();
            remainingSeconds = givenMinutes * 60;
            updateCountDown();
        }
    } else if(longBreakButton.classList.contains('active')) {
        const givenMinutes = longBreakTime.value;
        if(givenMinutes <= 99) {
            stopTimer();
            remainingSeconds = givenMinutes * 60;
            updateCountDown();
        }
    }
})

// открыть модальное окно
settingButton.addEventListener('click', () => {
    modalWindow.classList.add('visible');
    modalWindow.classList.remove('hidden');
})

// закрыть модальное окно
closeModal.addEventListener('click', (event) => {
    event.preventDefault();
    modalWindow.classList.add('hidden');
    modalWindow.classList.remove('visible');
})

modalWindow.addEventListener('click', (event) => {
    if(event.target.classList.contains('modal-window')) {
        modalWindow.classList.remove('visible');
        modalWindow.classList.add('hidden');
    }
})

// сохранить изменения
saveChanges.addEventListener('click', (event) => {
    event.preventDefault();
    modalWindow.classList.add('hidden');
    modalWindow.classList.remove('visible');
    if(workButton.classList.contains('active')) {
        minutePart.innerHTML = Math.floor(workTime.value).toString().padStart(2, '0');
        secondPart.innerHTML = Math.round(((workTime.value - Math.floor(workTime.value)) * 60)).toString().padStart(2, '0');
        remainingSeconds = workTime.value * 60;
    } else if(shortBreakButton.classList.contains('active')) {
        minutePart.innerHTML = Math.floor(shortBreakTime.value).toString().padStart(2, '0');
        secondPart.innerHTML = Math.round(((shortBreakTime.value - Math.floor(shortBreakTime.value)) * 60)).toString().padStart(2, '0');
        remainingSeconds = shortBreakTime.value * 60;
    } else if(longBreakButton.classList.contains('active')) {
        minutePart.innerHTML = Math.floor(longBreakTime.value).toString().padStart(2, '0');
        secondPart.innerHTML = Math.round(((longBreakTime.value - Math.floor(longBreakTime.value)) * 60)).toString().padStart(2, '0');
        remainingSeconds = longBreakTime.value * 60;    
    }
    // смена картинки на фоне
    const select = document.getElementById('theme');
    const options = select.children;
    Array.from(options).forEach(item => {
            if(item.selected) {
                switch (item.value) {
                    case 'redArch':
                        body.className = '';
                        body.classList.add('red-arch');
                        break;
                    case 'castle':
                        body.className = '';
                        body.classList.add('castle');
                        break;
                    case 'water':
                        body.className = '';
                        body.classList.add('water');
                        break;
                    case 'howlsCastle':
                        body.className = '';
                        body.classList.add('howls-castle');
                        break;
                    case 'newYork':
                        body.className = '';
                        body.classList.add('new-york');
                        break;
                    case 'sakura':
                        body.className = '';
                        body.classList.add('sakura');
                        break;
                }
            }
    })
})
