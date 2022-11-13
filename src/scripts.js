import './css/styles.css';
import './images/stanley-hotel-with-mountains.png';
import './images/stanley-sky.png';
import './images/lodge-suite.png';
import './images/double-bed.png';
import './images/regular-room.png';
import './images/overlook-logo.png';

import flatpickr from 'flatpickr';

import { fetchAll } from './apiCalls';

// ********** INITIALIZE **********
let store = {
  userData: null,
  bookingsData: null,
}

fetchAll()
  .then((data) => {
    store.userData = loginUser(data.usersData)
    store.bookingsData = data.bookingsData
  })

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
    bookingsDropdown.style.opacity = ".90"
    bookingsDropdown.style.pointerEvents = "all"
  } else {
    bookingsDropdown.style.opacity = "0"
    bookingsDropdown.style.pointerEvents = "none"
  }
}

const booking = flatpickr(bookingForm, {
  enableTime: false,
  dateFormat: "F J",
  mode: "range",
  minDate: "today",
  closeOnSelect: false,
  wrap: true
});

/*
GOAL: To store a given booking as a class containing all relevant booking data. POST this data. Have the dropdown menu reflect the changes.

DATA: Calendar data. Room data. User.
  rooms (4): Residential Suite, Single Room, Junior Suite, Suite, 
*/

function loginUser(data) {
  const randomUserIndex = Math.floor(Math.random() * data.customers.length)
  store.userData = data.customers[randomUserIndex]
  console.log(store.userData)
}