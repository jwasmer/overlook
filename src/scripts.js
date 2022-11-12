import './css/styles.css';
import flatpickr from 'flatpickr';

import './images/stanley-hotel-with-mountains.png';
import './images/stanley-sky.png';
import './images/lodge-suite.png';
import './images/double-bed.png';
import './images/regular-room.png';
import './images/overlook-logo.png';

const datePicker = document.querySelector(".date-picker"); /* recheck when dropdown is done */
const bookingsMenu = document.querySelector('.bookings-menu')
const bookingsDropdown = document.querySelector('.bookings-dropdown')
const bookBtn = document.querySelectorAll('.room-card--book-btn')
const bookingForm = document.querySelectorAll('.flatpickr')

bookingsMenu.addEventListener('click', toggleMenu)
bookBtn.forEach((button) => {
  button.addEventListener('click', function(e) {
    event.preventDefault()
  })
  button.addEventListener('dblclick', function(e) {
    console.log(booking)
  })
})

function toggleMenu() {
  if (bookingsDropdown.style.opacity === "0") {
    bookingsDropdown.style.opacity = ".95"
    bookingsDropdown.style.pointerEvents = "all"
  } else {
    bookingsDropdown.style.opacity = "0"
    bookingsDropdown.style.pointerEvents = "none"
  }
}

const booking = flatpickr(bookingForm, {
  enableTime: false,
  mode: "range",
  minDate: "today",
  closeOnSelect: false,
  wrap: true
});