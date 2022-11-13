import './css/styles.css';
import User from './classes/user.js'
import './images/stanley-hotel-with-mountains.png';
import './images/stanley-sky.png';
import './images/deluxe-suite.png';
import './images/lodge-suite.png';
import './images/double-bed.png';
import './images/regular-room.png';
import './images/overlook-logo.png';


import flatpickr from 'flatpickr';

import { fetchAll } from './apiCalls';

// ********** INITIALIZE **********
let store = {
  usersData: null,
  bookingsData: null,
  roomsData: null,
  currentUser: null,
}

fetchAll()
  .then((data) => {
    store.usersData = data.usersData
    store.bookingsData = data.bookingsData
    store.roomsData = data.roomsData
    store.currentUser = new User(store.usersData.customers[0])
    console.log(store.currentUser)
  })

const bookingsMenu = document.querySelector('.bookings-menu')
const bookingsDropdown = document.querySelector('.bookings-dropdown')
const bookBtn = document.querySelectorAll('.room-card--book-btn')
const bookingForm = document.querySelectorAll('.flatpickr')
const viewBookings = document.getElementById('view-bookings')

bookingsMenu.addEventListener('click', toggleMenu)
bookBtn.forEach((button) => {
  button.addEventListener('click', function(e) {
    event.preventDefault()
  })
  button.addEventListener('dblclick', function(e) {
    console.log(booking)
  })
})

const booking = flatpickr(bookingForm, {
  enableTime: false,
  dateFormat: "F J",
  mode: "range",
  minDate: "today",
  closeOnSelect: false,
  wrap: true
});

function toggleMenu() {
  if (bookingsDropdown.style.opacity === "0") {
    bookingsDropdown.style.opacity = ".90"
    bookingsDropdown.style.pointerEvents = "all"
  } else {
    bookingsDropdown.style.opacity = "0"
    bookingsDropdown.style.pointerEvents = "none"
  }
}

function buildBookingsMenu(user, allBookings, allRooms) {
  const userBookings = user.findAllBookings(allBookings)
  userBookings.forEach(booking => {
    const room = allRooms.find(room => booking.roomNumber === room.number)
    viewBookings.innerHTML += `<p class="menu--booking"> Date: ${booking.date}, Room: ${room.roomType} #${room.number}`
  })
}

/*
GOAL: To store a given booking as a class containing all relevant booking data. POST this data. Have the dropdown menu reflect the changes.

DATA: Calendar data. Room data. User.
  rooms (4): Residential Suite, Single Room, Junior Suite, Suite, 
*/