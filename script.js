/***********************************************************************************************
-------------------------------------CLOCK-BLOCK-START------------------------------------------
********************************************************************************************** */


let btnClock = document.querySelector('.btn-clock');
let displayClock = document.querySelector('.clock');

function clock() {
    setInterval(() => {

        let C_hours = document.getElementById('c-hours');
        let C_mins = document.getElementById('c-mins');
        let C_secs = document.getElementById('c-secs');
        let ampm = document.getElementById('ampm');

        let h = new Date().getHours();
        let m = new Date().getMinutes();
        let s = new Date().getSeconds();
        let ap = h >= 12 ? 'PM' : 'AM';

        let C_hh = document.getElementById('c-hh');
        let C_mm = document.getElementById('c-mm');
        let C_ss = document.getElementById('c-ss');

        let C_hr_dot = document.querySelector('.c-hr-dot');
        let C_min_dot = document.querySelector('.c-min-dot');
        let C_sec_dot = document.querySelector('.c-sec-dot');

        // Converting 24-hours clock into 12-Hours Clock
        if (h > 12) {
            h = h - 12;
        }

        // Adding zero before single digit
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        //Analog clock
        C_hh.style.strokeDashoffset = 440 - (440 * h) / 12;
        C_mm.style.strokeDashoffset = 440 - (440 * m) / 60;
        C_ss.style.strokeDashoffset = 440 - (440 * s) / 60;

        C_hr_dot.style.transform = `rotate(${h * 30}deg)`;
        C_min_dot.style.transform = `rotate(${m * 6}deg)`;
        C_sec_dot.style.transform = `rotate(${s * 6}deg)`;

        C_hours.innerHTML = h + "<div><span>Hours</span></div>";
        C_mins.innerHTML = m + "<div><span>Minutes</span></div>";
        C_secs.innerHTML = s + "<div><span>Seconds</span></div>";
        ampm.innerHTML = ap;

    })
}

function showClock() {
    displayClock.classList.remove('d-none');
    displayTimer.classList.add('d-none');
    clock();
}

btnClock.addEventListener('click', showClock);

/***********************************************************************************************
-------------------------------------CLOCK-BLOCK-END------------------------------------------
********************************************************************************************** */


/***********************************************************************************************
-------------------------------------TIMER-BLOCK-START------------------------------------------
********************************************************************************************** */

let displayTimer = document.querySelector('.timer');
let btnTimer = document.querySelector('.btn-timer');
let btnSet = document.querySelector('.btn-set');
let btnStart = document.querySelector('.btn-start');
let btnPlay = document.querySelector('.btn-play');
let btnPause = document.querySelector('.btn-pause');
let btnReset = document.querySelector('.btn-reset');

let startInterval = null;
let isPaused = false;

let T_hrs = document.getElementById('t-hrs');
let T_mins = document.getElementById('t-mins');
let T_secs = document.getElementById('t-secs');

let T_hh = document.getElementById('t-hh');
let T_mm = document.getElementById('t-mm');
let T_ss = document.getElementById('t-ss');

let T_hr_dot = document.querySelector('.t-hr-dot');
let T_min_dot = document.querySelector('.t-min-dot');
let T_sec_dot = document.querySelector('.t-sec-dot');

let input_hours = document.querySelector('.input-hr');
let input_minutes = document.querySelector('.input-min');

function reset() {
    input_minutes.value = input_hours.value = '';
    T_hh.style.strokeDashoffset = T_mm.style.strokeDashoffset = T_ss.style.strokeDashoffset = 1
    T_hr_dot.style.transform = T_min_dot.style.transform = T_sec_dot.style.transform = `rotate(0deg)`;

    T_hrs.innerHTML = '00' + "<div><span>Hours</span></div>"
    T_mins.innerHTML = '00' + "<div><span>Minutes</span></div>";
    T_secs.innerHTML = '00' + "<div><span>Seconds</span></div>";
    clearInterval(startInterval);
    isPaused = false;
    btnSet.classList.remove('disabled');
    btnStart.classList.add('disabled')
    btnPlay.classList.add('disabled');
    btnPlay.classList.add('d-none');
    btnPause.classList.add('disabled');
    btnPause.classList.remove('d-none');    
    btnReset.classList.add('disabled');

}
function set() {
    let hours = input_hours.value;
    let minutes = input_minutes.value;
    let seconds = 0;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    T_hrs.innerHTML = hours + "<div><span>Hours</span></div>"
    T_mins.innerHTML = minutes + "<div><span>Minutes</span></div>";
    T_secs.innerHTML = seconds + "<div><span>Seconds</span></div>";

    btnSet.classList.add('disabled');
    btnStart.classList.remove('disabled');
    btnReset.classList.remove('disabled');
}

function start() {
    let hours = input_hours.value;
    let minutes = input_minutes.value;
    let seconds = 0;
    let display_hours, display_minutes, display_seconds;

    startInterval = setInterval(() => {
        if (!isPaused) {
            if (hours == 0 && minutes == 0 && seconds == 0) {
                hours = minutes = seconds = 0;
            } else if (seconds != 0) {
                seconds--;
            } else if (minutes != 0 && seconds == 0) {
                seconds = 59;
                minutes--;
            } else if (hours != 0 && minutes == 0) {
                seconds = minutes = 59;
                hours--
            }

            display_hours = hours < 10 ? '0' + hours : hours;
            display_minutes = minutes < 10 ? '0' + minutes : minutes;
            display_seconds = seconds < 10 ? '0' + seconds : seconds;

            T_hh.style.strokeDashoffset = 440 - (440 * hours) / 12;
            T_mm.style.strokeDashoffset = 440 - (440 * minutes) / 60;
            T_ss.style.strokeDashoffset = 440 - (440 * seconds) / 60;

            T_hr_dot.style.transform = `rotate(${hours * 30}deg)`;
            T_min_dot.style.transform = `rotate(${minutes * 6}deg)`;
            T_sec_dot.style.transform = `rotate(${seconds * 6}deg)`;

            T_hrs.innerHTML = display_hours + "<div><span>Hours</span></div>"
            T_mins.innerHTML = display_minutes + "<div><span>Minutes</span></div>";
            T_secs.innerHTML = display_seconds + "<div><span>Seconds</span></div>";
        }
    }, 1000)

    btnStart.classList.add('disabled');
    btnPause.classList.remove('disabled');
}
function showTimer() {
    displayTimer.classList.remove('d-none');
    displayClock.classList.add('d-none');
}
btnTimer.addEventListener('click', showTimer);
btnReset.addEventListener('click', reset);
btnSet.addEventListener('click', set);
btnStart.addEventListener('click', start);
btnPlay.addEventListener('click', (e) => {
    e.preventDefault();
    isPaused = false;
    btnPause.classList.remove('disabled');
    btnPause.classList.remove('d-none');
    btnPlay.classList.add('disabled');
    btnPlay.classList.add('d-none');
})
btnPause.addEventListener('click', (e) => {
    e.preventDefault();
    isPaused = true;
    btnPlay.classList.remove('disabled');
    btnPlay.classList.remove('d-none');
    btnPause.classList.add('disabled');
    btnPause.classList.add('d-none')
})

/***********************************************************************************************
-------------------------------------TIMER-BLOCK-END------------------------------------------
********************************************************************************************** */
