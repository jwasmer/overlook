// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import flatpickr from 'flatpickr';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/stanley-hotel-with-mountains.png';
import './images/stanley-sky.png';
import './images/lodge-suite.png';
import './images/double-bed.png';
import './images/regular-room.png';
import './images/overlook-logo.png';

const datePicker = document.querySelector(".date-picker");
const bookingsMenu = document.querySelector('.bookings-menu')
const bookingsDropdown = document.querySelector('.bookings-dropdown')
const bookBtn = document.querySelectorAll('.room-card--book-btn')

bookingsMenu.addEventListener('click', toggleMenu)
bookBtn.forEach(button => {
  addEventListener('click', displayCalendar)
})

function toggleMenu() {
  if (bookingsDropdown.style.opacity === "0") {
    bookingsDropdown.style.opacity = "1"
    bookingsDropdown.style.pointerEvents = "all"
  } else {
    bookingsDropdown.style.opacity = "0"
    bookingsDropdown.style.pointerEvents = "none"
  }
}

function displayCalendar() {
  event.preventDefault()
}

const booking = flatpickr(bookBtn, {
  enableTime: false,
});