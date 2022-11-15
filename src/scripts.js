import flatpickr from 'flatpickr';
import User from './classes/user.js'
import Booking from './classes/Booking';
import BookingSearch from './classes/BookingSearch';
import './css/styles.css';
import './images/stanley-hotel-with-mountains.png';
import './images/stanley-sky.png';
import './images/deluxe-suite.png';
import './images/lodge-suite.png';
import './images/double-bed.png';
import './images/regular-room.png';
import './images/overlook-logo.png';

import { fetchAll, postBooking } from './apiCalls';


// ********** INITIALIZE APP **********

// ----- Global Variables -----

let store = {
  usersData: null,
  bookingsData: null,
  roomsData: null,
  currentUser: null,
  bookingDate: null,
  selectedBooking: {}
}


// ********** ELEMENT ASSIGNMENTS **********

const bookingsDropdown = document.querySelector('.bookings-dropdown')
const bookingsMenu = document.querySelector('.bookings-menu')
const confirmationModalClose = document.querySelector('.confirmation-modal--close')
const errorModalClose = document.querySelector('.error-modal--close')

const buttons = document.querySelectorAll('button')
const roomCardInfo = document.querySelectorAll('.room-card--info')
const roomCardBookBtn = document.querySelectorAll('.room-card--book-btn')

const calendarInput = document.getElementById('calendar-input')
const findRoomsBtn = document.getElementById('find-rooms-btn')
const loginBtn = document.getElementById('login-btn')
const juniorRoomInfo = document.getElementById('junior-room-info')
const juniorSuiteCard = document.getElementById('junior-suite-card')
const password = document.getElementById('password')
const residentialRoomInfo = document.getElementById('residential-room-info')
const residentialSuiteCard = document.getElementById('residential-suite-card')
const searchError = document.getElementById('search-error')
const singleRoomCard = document.getElementById('single-room-card')
const singleRoomInfo = document.getElementById('single-room-info')
const suiteCard = document.getElementById('suite-card')
const suiteRoomInfo = document.getElementById('suite-room-info')
const username = document.getElementById('username')
const viewBookings = document.getElementById('view-bookings')


// ********** Event Listeners **********

bookingsMenu.addEventListener('click', toggleMenu)
confirmationModalClose.addEventListener('click', hideConfirmationModal)
errorModalClose.addEventListener('click', hideErrorModal)
findRoomsBtn.addEventListener('click', getAllVacancies)
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
    updateAllBookingBtn(e)
  })
})


// ********** FUNCTIONS **********

// ----- Initialize Data -----


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
  .catch(err => {
    console.log(err)
    showErrorModal()
  })

function buildUserInstances(data) {
  store.usersData = data.map(user => {
    return new User(user)
  })
}

function buildBookingInstances(data) {
  store.bookingsData = data.map(booking => {
    return new Booking(booking)
  })
}

// ----- Error Modal -----

function showErrorModal() {
  document.querySelector('.error-modal').classList.remove('hidden')
  document.querySelector('.confirmation-modal--background').classList.remove('hidden')
  document.querySelector('.error-modal--text').innerText = `Booking Successful! You've booked room ${roomNumber} for ${date}!`
}

function hideErrorModal() {
  document.querySelector('.error-modal').classList.add('hidden')
  document.querySelector('.confirmation-modal--background').classList.add('hidden')
}

// ----- Login -----

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

function validateLogin(validatedUsername, validatedPassword) {
  if (validatedUsername && validatedPassword) {
    store.currentUser = validatedUsername
    document.getElementById('header-welcome').innerText = `Welcome back, ${validatedUsername.name}!`
    hideLogin()
  } else {
    document.getElementById('login-error').style.opacity = "1"
  }
}

function hideLogin() {
  document.getElementById('login-background-img').classList.add('hidden')
  document.getElementById('login').classList.add('hidden')
}

// ----- Calendar Widget -----

flatpickr(calendarInput, {
  enableTime: false,
  altInput: true,
  altFormat: "F J, Y",
  mode: "single",
  minDate: "today",
  onChange: function(selectedDates) {
    if (selectedDates.length === 0) {
      findRoomsBtn.innerText = 'Find Available Rooms'
      store.bookingDate = null;
    } else {
      findRoomsBtn.innerText = 'Click to Search'
      store.bookingDate = new Date(selectedDates)
    }
  }
});

// ----- Bookings Dropdown -----

function resetBookingBtns() {
  roomCardBookBtn.forEach((button) => {
    button.disabled = true
    button.innerText = "Select Room"
  })
}

function updateAllBookingBtn(e) {
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
}

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

// ----- Search Vacancies -----

function getAllVacancies() {
  store.selectedBooking = {}
  console.log(store.bookingDate)

  if (store.bookingDate) {
    const search = new BookingSearch(store.currentUser, store.bookingDate, store.bookingsData, store.roomsData)
    hideRoomCards()
    clearOldData(search)
    search.roomSearch()
    search.removeBookedRooms()
    sortRoomType(search)
    updateSearchButtonText(search)
  }
}

function hideRoomCards() {
  singleRoomCard.classList.add('hidden')
  juniorSuiteCard.classList.add('hidden')
  residentialSuiteCard.classList.add('hidden')
  suiteCard.classList.add('hidden')
  searchError.classList.add('hidden')
}

function clearOldData(search) {
  singleRoomInfo.innerHTML = ''
  juniorRoomInfo.innerHTML = ''
  residentialRoomInfo.innerHTML = ''
  suiteRoomInfo.innerHTML = ''
  findRoomsBtn.innerText = 'Find Available Rooms'

  search.vacantRooms = []
}

function sortRoomType(search) {
  const roomTypeFilter = document.getElementById('room-type-dropdown').value
  if (roomTypeFilter) {
    sortRoomTypeFiltered(roomTypeFilter, search)
  }
  else {
    sortRoomTypeUnfiltered(search)
  }
}

function sortRoomTypeUnfiltered(search) {
  search.vacantRooms.forEach(vacancy => {
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

  if (search.vacantRooms.length === 0) {
    searchError.classList.remove('hidden')
  }
}

function sortRoomTypeFiltered(filter, search) {
  const filteredVacancies = search.vacantRooms.filter(vacancy => {
    return vacancy.roomType === filter
  })

  search.vacantRooms = filteredVacancies
  sortRoomTypeUnfiltered(search)
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

function updateSearchButtonText(search) {
  if (search.vacantRooms.length >= 0) {
    findRoomsBtn.innerText = `${search.vacantRooms.length} Vacancies Found!`
  }
  else {
    findRoomsBtn.innerText = `Sold Out`
  }
}

// ----- Book Room -----

function bookRoom(e) {
  const id = Number(store.currentUser.id)
  const date = store.bookingDate.toISOString().split('T')[0].replaceAll('-', '/')
  const roomNumber = Number(store.selectedBooking[e.target.dataset.roomType])

  postBooking(id, date, roomNumber)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Status code: ${response.status}
          Endpoint: ${response.url}`
        );
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      const newBooking = new Booking(data.newBooking)
      store.bookingsData.push(newBooking)
      buildBookingsMenu(store.currentUser, store.bookingsData, store.roomsData)
      getAllVacancies()
      resetBookingBtns()
    })
    .catch(err => {
      console.log(err)
      showErrorModal()
    });

  showConfirmationModal(date, roomNumber)
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