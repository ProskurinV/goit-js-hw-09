import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0];
    if (selectedDates[0] <= new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

function onStartTimer() {
  let timerId = setInterval(() => {
    let diff = new Date(input.value) - new Date();
    startBtn.disabled = true;
    if (diff >= 0) {
      let time = convertMs(diff);
      days.textContent = addLeadingZero(time.days);
      hours.textContent = addLeadingZero(time.hours);
      minutes.textContent = addLeadingZero(time.minutes);
      seconds.textContent = addLeadingZero(time.seconds);
    } else if (diff <= 1) {
      Notiflix.Notify.success('Time is over');
      clearInterval(timerId);
    }
  }, 1000);
}

flatpickr(input, options);
startBtn.addEventListener('click', onStartTimer);
