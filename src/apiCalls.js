import { store } from './scripts'
import Booking from './classes/Booking'

const fetchData = (url) => {
  return fetch(url).then(response => response.json())
}

const apiCalls = {
  getUserData: () => {
    return fetchData('http://localhost:3001/api/v1/customers')
  },
  getRoomsData: () => {
    return fetchData('http://localhost:3001/api/v1/rooms')
  },
  getBookingsData: () => {
    return fetchData('http://localhost:3001/api/v1/bookings')
  }
}

const fetchAll = () => {
  return Promise.all([
    apiCalls.getUserData(),
    apiCalls.getRoomsData(),
    apiCalls.getBookingsData()
  ])
    .then(data => {
      return {
        usersData: data[0],
        roomsData: data[1],
        bookingsData: data[2]
      }
    })
}

const postBooking = (id, date, roomNumber) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({ "userID": id, "date": `${date}`, "roomNumber": roomNumber }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export { fetchData, apiCalls, fetchAll, postBooking }