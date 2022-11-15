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

import { fetchAll, postBooking } from './apiCalls';

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
  },
  selectedBooking: {}
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
    buildUserInstances(store.usersData)
  })

// ********** Element Assignments **********
const bookingsMenu = document.querySelector('.bookings-menu')
const bookingsDropdown = document.querySelector('.bookings-dropdown')
const buttons = document.querySelectorAll('button')
const viewBookings = document.getElementById('view-bookings')
const findRoomsBtn = document.getElementById('find-rooms-btn')
const calendarInput = document.getElementById('calendar-input')
const singleRoomCard = document.getElementById('single-room-card')
const juniorSuiteCard = document.getElementById('junior-suite-card')
const residentialSuiteCard = document.getElementById('residential-suite-card')
const suiteCard = document.getElementById('suite-card')
const searchError = document.getElementById('search-error')
const singleRoomInfo = document.getElementById('single-room-info')
const juniorRoomInfo = document.getElementById('junior-room-info')
const residentialRoomInfo = document.getElementById('residential-room-info')
const suiteRoomInfo = document.getElementById('suite-room-info')
const roomCardInfo = document.querySelectorAll('.room-card--info')
const roomCardBookBtn = document.querySelectorAll('.room-card--book-btn')
const modalClose = document.querySelector('.confirmation-modal--close')
const username = document.getElementById('username')
const password = document.getElementById('password')
const loginBtn = document.getElementById('login-btn')

// ********** Event Listeners **********
bookingsMenu.addEventListener('click', toggleMenu)
findRoomsBtn.addEventListener('click', getAllVacancies)
modalClose.addEventListener('click', hideConfirmationModal)
loginBtn.addEventListener('click', userLogin)

buttons.forEach((button) => {
  button.addEventListener('click', function(e) {
    event.preventDefault()
  })
})

roomCardBookBtn.forEach((button) => {
  button.addEventListener('click', (e) => {
    bookRoom(e)
  })
})

roomCardInfo.forEach((container) => {
  container.addEventListener('click', function(e) {
    const buttonRoomType = e.target.dataset.roomType

    if (store.selectedBooking !== e.target.id) {
      store.selectedBooking[e.target.dataset.roomType] = e.target.id

      roomCardBookBtn.forEach((button) => {
        if (buttonRoomType === button.dataset.roomType) {
          button.disabled = false
          button.innerText = "Book Now"
        }
      })
    }
  })
})

function bookRoom(e) {
  const id = Number(store.currentUser.id)
  const date = store.search.bookingDate.toISOString().split('T')[0].replaceAll('-', '/')
  const roomNumber = Number(store.selectedBooking[e.target.dataset.roomType])

  postBooking(id, date, roomNumber)
    .then(response => response.json())
    .then(data => {
      console.log('Data: ', data)
      const newBooking = new Booking(data.newBooking)
      store.bookingsData.push(newBooking)
      buildBookingsMenu(store.currentUser, store.bookingsData, store.roomsData)
    })
    .catch(err => {
      console.log(err)
  });
  showConfirmationModal(date, roomNumber)
}

function userLogin() {
  const validatedUsername = checkUsername()
  const validatedPassword = checkPassword()
  validateLogin(validatedUsername, validatedPassword)
  buildBookingsMenu(store.currentUser, store.bookingsData, store.roomsData)
}

function checkUsername() {
  const validate = store.usersData.find(element => username.value === element.username)
  if (validate) {
    return validate
  }
}

function checkPassword() {
  if (password.value === 'overlook2021') {
    return true
  }
}

function hideLogin() {
  document.getElementById('login-background-img').classList.add('hidden')
  document.getElementById('login').classList.add('hidden')
}

function validateLogin(validatedUsername, validatedPassword) {
  if (validatedUsername && validatedPassword) {
    store.currentUser = validatedUsername
    document.getElementById('header-welcome').innerText = `Welcome back, ${validatedUsername.name}!`
    hideLogin()
  } else {
    document.getElementById('login-error').style.opacity = "1"
  }
}

function showConfirmationModal(date, roomNumber) {
  document.querySelector('.confirmation-modal').classList.remove('hidden')
  document.querySelector('.confirmation-modal--background').classList.remove('hidden')
  document.querySelector('.confirmation-modal--text').innerText = `Booking Successful! You've booked room ${roomNumber} for ${date}!`
}

function hideConfirmationModal() {
  document.querySelector('.confirmation-modal').classList.add('hidden')
  document.querySelector('.confirmation-modal--background').classList.add('hidden')
}

// ********** Flatpickr Calendar **********
flatpickr(calendarInput, {
  enableTime: false,
  altInput: true,
  altFormat: "F J, Y",
  mode: "single",
  minDate: "today",
  onChange: function(selectedDates) {
    if (selectedDates.length === 0) {
      findRoomsBtn.innerText = 'Find Available Rooms'
      store.search.bookingDate = null;
    } else {
      findRoomsBtn.innerText = 'Click to Search'
      store.search.bookingDate = new Date(selectedDates)
    }
  }
});

function getAllVacancies() {
  store.selectedBooking = {}
  if (store.search.bookingDate) {
    hideRoomCards()
    clearOldData()
    roomSearch()
    removeBookedRooms()
    sortRoomType()
    updateSearchButtonText()
  }
}

function roomSearch() {
  store.search.results = store.currentUser.getVacancies(store.bookingsData, store.search.bookingDate)
}

function removeBookedRooms() {
  store.roomsData.forEach(room => {
    const isBooked = store.search.results.some(result => {
      return result.roomNum === room.number
    })
    if (!isBooked) {
      store.search.vacantRooms.push(room)
    }
  })
}

function sortRoomType() {
  const roomTypeFilter = document.getElementById('room-type-dropdown').value
  if (roomTypeFilter) {
    sortRoomTypeFiltered(roomTypeFilter)
  }
  else {
    sortRoomTypeUnfiltered()
  }
}

function sortRoomTypeUnfiltered() {
  store.search.vacantRooms.forEach(vacancy => {
    const bedSize = vacancy.bedSize.charAt(0).toUpperCase() + vacancy.bedSize.slice(1)
    const bidet = () => {
      if (vacancy.bidet) {
        return 'has bidet'
      } else {
        return 'no bidet'
      }
    }
    sortIntoSingleRoom(vacancy, bedSize, bidet)
    sortIntoJuniorSuite(vacancy, bedSize, bidet)
    sortIntoResidentialSuite(vacancy, bedSize, bidet)
    sortIntoSuite(vacancy, bedSize, bidet)
  })

  if (store.search.vacantRooms.length === 0) {
    searchError.classList.remove('hidden')
  }
}

function sortIntoSingleRoom(vacancy, bedSize, bidet) {
  if (vacancy.roomType === 'single room') {
    singleRoomInfo.tabIndex = "0"
    singleRoomInfo.innerHTML += 
    `<input 
    type="radio" 
    name="vacant-single" 
    value="${vacancy.roomType} / ${vacancy.number}"
    class="room-card--input"
    id="${vacancy.number}" 
    data-room-type="single-room" 
    />

    <label for="${vacancy.number}" class="room-card--label">
    Room ${vacancy.number}: ${vacancy.numBeds} ${bedSize} bed(s), ${bidet()}. $${vacancy.costPerNight} per night.
    </label>`

    singleRoomCard.classList.remove('hidden')
  }
}

function sortIntoJuniorSuite(vacancy, bedSize, bidet) {
  if (vacancy.roomType === 'junior suite') {
    juniorRoomInfo.tabIndex = "0"
    juniorRoomInfo.innerHTML +=     
    `<input 
    type="radio" 
    name="vacant-junior" 
    value="${vacancy.roomType} / ${vacancy.number}"
    class="room-card--input"
    id="${vacancy.number}" 
    data-room-type="junior-room" />

    <label for="${vacancy.number}" class="room-card--label">
    Room ${vacancy.number}: ${vacancy.numBeds} ${bedSize} bed(s), ${bidet()}. $${vacancy.costPerNight} per night.
    </label>`

    juniorSuiteCard.classList.remove('hidden')
  }
}

function sortIntoResidentialSuite(vacancy, bedSize, bidet) {
  if (vacancy.roomType === 'residential suite') {
    residentialRoomInfo.tabIndex = "0"
    residentialRoomInfo.innerHTML +=     
    `<input 
    type="radio" 
    name="vacant-residential" 
    value="${vacancy.roomType} / ${vacancy.number}"
    class="room-card--input"
    id="${vacancy.number}" 
    data-room-type="residential-room" />

    <label for="${vacancy.number}" class="room-card--label">
    Room ${vacancy.number}: ${vacancy.numBeds} ${bedSize} bed(s), ${bidet()}. $${vacancy.costPerNight} per night.
    </label>`

    residentialSuiteCard.classList.remove('hidden')
  }
}

function sortIntoSuite(vacancy, bedSize, bidet) {
  if (vacancy.roomType === 'suite') {
    suiteRoomInfo.tabIndex = "0"
    suiteRoomInfo.innerHTML +=     
    `<input 
    type="radio" 
    name="vacant-suite" 
    value="${vacancy.roomType} / ${vacancy.number}"
    class="room-card--input"
    id="${vacancy.number}" 
    data-room-type="suite-room" />

    <label for="${vacancy.number}" class="room-card--label">
    Room ${vacancy.number}: ${vacancy.numBeds} ${bedSize} bed(s), ${bidet()}. $${vacancy.costPerNight} per night.
    </label>`

    suiteCard.classList.remove('hidden')
  }
}

function sortRoomTypeFiltered(filter) {
  const filteredVacancies = store.search.vacantRooms.filter(vacancy => {
    return vacancy.roomType === filter
  })

  store.search.vacantRooms = filteredVacancies
  sortRoomTypeUnfiltered()
}

function updateSearchButtonText() {
  if (store.search.vacantRooms.length >= 0) {
    findRoomsBtn.innerText = `${store.search.vacantRooms.length} Vacancies Found!`
  }
  else {
    findRoomsBtn.innerText = `Sold Out`
  }
}

function hideRoomCards() {
  singleRoomCard.classList.add('hidden')
  juniorSuiteCard.classList.add('hidden')
  residentialSuiteCard.classList.add('hidden')
  suiteCard.classList.add('hidden')
  searchError.classList.add('hidden')
}

function clearOldData() {
  singleRoomInfo.innerHTML = ''
  juniorRoomInfo.innerHTML = ''
  residentialRoomInfo.innerHTML = ''
  suiteRoomInfo.innerHTML = ''
  findRoomsBtn.innerText = 'Find Available Rooms'

  store.search.vacantRooms = []
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
    viewBookings.innerHTML += `<p class="menu--booking"> Date: ${booking.displayDate()}, Room: ${room.roomType} #${room.number}, Price: $${room.costPerNight}</p>`
  })
  viewBookings.innerHTML += `<p class="menu--booking"> Total Price: $${Math.round(totalPrice * 100)/100} </p>`
}

function buildBookingInstances(data) {
  store.bookingsData = data.map(booking => {
    return new Booking(booking)
  })
}

function buildUserInstances(data) {
  store.usersData = data.map(user => {
    return new User(user)
  })
}

export { store };