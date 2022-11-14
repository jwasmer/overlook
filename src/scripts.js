import User from './classes/user.js'
import Booking from './classes/Booking';
import './css/styles.css';
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
  search: {
    bookingDate: null,
    roomFilter: null,
    results: null,
    vacantRooms: [],
  }

}

// *** API calls ***
fetchAll()
  .then((data) => {
    store.usersData = data.usersData.customers
    store.bookingsData = data.bookingsData.bookings
    store.roomsData = data.roomsData.rooms
    store.currentUser = new User(store.usersData[0])
  })
  .then(() => {
    buildBookingInstances(store.bookingsData)
    buildBookingsMenu(store.currentUser, store.bookingsData, store.roomsData)
  })

// ********** Element Assignments **********
const bookingsMenu = document.querySelector('.bookings-menu')
const bookingsDropdown = document.querySelector('.bookings-dropdown')
const buttons = document.querySelectorAll('button')
const bookingForm = document.querySelector('.flatpickr')
const viewBookings = document.getElementById('view-bookings')
const findRoomsBtn = document.getElementById('find-rooms-btn')
const calendarInput = document.getElementById('calendar-input')

// ********** Event Listeners **********
bookingsMenu.addEventListener('click', toggleMenu)
findRoomsBtn.addEventListener('click', roomSearch)
buttons.forEach((button) => {
  button.addEventListener('click', function(e) {
    event.preventDefault()
  })
})

// ********** Flatpickr Calendar **********
const selectedDate = flatpickr(bookingForm, {
  enableTime: false,
  altInput: true,
  altFormat: "F J, Y",
  mode: "single",
  minDate: "today",
  wrap: true,
  onChange: function(selectedDates) {
    store.search.bookingDate = new Date(selectedDates)
  }
});

function renderVacancies() {
  roomSearch()
  removeBookedRooms()

}

function roomSearch() {
  store.search.results = store.currentUser.getVacancies(store.bookingsData, store.search.bookingDate)
}

function removeBookedRooms() {
  store.roomsData.forEach(room => {
    const isBooked = store.search.results.some(result => {
      result.roomNum === room.number
    })
    if (!isBooked) {
      vacantRooms.push(room)
    }
  })
}

function renderUnbookedRooms() {
  
}

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

function buildBookingsMenu(user, bookingsData, roomsData) {
  const userBookings = user.findAllBookings(bookingsData)
  let totalPrice = 0

  userBookings.forEach(booking => {
    const room = booking.findRoomData(roomsData)
    totalPrice += room.costPerNight
    viewBookings.innerHTML += `<p class="menu--booking"> Date: ${booking.date}, Room: ${room.roomType} #${room.number}, Price: $${room.costPerNight}</p>`
  })
  viewBookings.innerHTML += `<p class="menu--booking"> Total Price: $${Math.round(totalPrice * 100)/100} </p>`
}

function buildBookingInstances(data) {
  store.bookingsData = data.map(booking => {
    return new Booking(booking)
  })
}