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

// ********** Initialize App **********

// *** Global Variables ***
let store = {
  usersData: null,
  bookingsData: null,
  roomsData: null,
  currentUser: null,
}

// *** API calls ***
fetchAll()
  .then((data) => {
    store.usersData = data.usersData
    store.bookingsData = data.bookingsData
    store.roomsData = data.roomsData
    store.currentUser = new User(store.usersData.customers[0])
  })
  .then(() => {
    buildBookingsMenu(store.currentUser, store.bookingsData.bookings, store.roomsData.rooms)
  })

// ********** Event Listeners **********
const bookingsMenu = document.querySelector('.bookings-menu')
const bookingsDropdown = document.querySelector('.bookings-dropdown')
const buttons = document.querySelectorAll('button')
const bookingForm = document.querySelector('.flatpickr')
const viewBookings = document.getElementById('view-bookings')
const findRoomsBtn = document.getElementById('find-rooms-btn')
const calendarInput = document.getElementById('calendar-input')
bookingsMenu.addEventListener('click', toggleMenu)
buttons.forEach((button) => {
  button.addEventListener('click', function(e) {
    event.preventDefault()
  })
})

// ********** Flatpickr Calendar **********
const booking = flatpickr(bookingForm, {
  enableTime: false,
  dateFormat: "F J, Y",
  mode: "single",
  minDate: "today",
  wrap: true
});

// ********** View Bookings **********
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
  let totalPrice = 0
  userBookings.forEach(booking => {
    const room = allRooms.find(room => booking.roomNumber === room.number)
    viewBookings.innerHTML += `<p class="menu--booking"> Date: ${booking.date}, Room: ${room.roomType} #${room.number}, Price: $${room.costPerNight}</p>`
    totalPrice += room.costPerNight
  })
  viewBookings.innerHTML += `<p class="menu--booking"> Total Price: $${Math.round(totalPrice * 100)/100} </p>`
}

