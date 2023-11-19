import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      alert('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

const dateTimePicker = flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  const selectedDate = dateTimePicker.selectedDates[0];
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    alert('Please choose a date in the future');
    return;
  }

  const timerInterval = setInterval(() => {
    const remainingTime = selectedDate - new Date();

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      alert('Time is up!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    document.querySelector('[data-days]').textContent = days;
    document.querySelector('[data-hours]').textContent = hours;
    document.querySelector('[data-minutes]').textContent = minutes;
    document.querySelector('[data-seconds]').textContent = seconds;
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
