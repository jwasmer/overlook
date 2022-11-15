import chai from 'chai';
const expect = chai.expect;
import BookingSearch from '../src/classes/BookingSearch'
import Booking from '../src/classes/Booking'
import User from '../src/classes/User'
import { testCustomerData, testBookingsData, testRoomsData } from './data/test-data'

describe('BookingSearch.js class file', () => {
  let bookingSearch;
  let rooms;
  let bookings;
  let currentUser;
  let date;

  beforeEach(() => {
    currentUser = new User(testCustomerData[0])
    date = new Date("2023/01/11")
    bookings = testBookingsData.map(booking => {
      return new Booking(booking)
    })
    rooms = testRoomsData
    bookingSearch = new BookingSearch(currentUser, date, bookings, rooms)
  })

  it('Should have a property containing all rooms data', () => {
    expect(bookingSearch.rooms).to.deep.equal(rooms)
  })

  it('Should have a property containing all bookings data', () => {
    expect(bookingSearch.bookings).to.deep.equal(bookings)
  })

  it('Should have a property containing the current user', () => {
    expect(bookingSearch.user).to.deep.equal(currentUser)
  })

  it('Should have a property containing the currently selected booking date', () => {
    expect(bookingSearch.bookingDate).to.deep.equal(date)
  })

  it('Should be able to find a list of all rooms booked on the selected date and store the results', () => {
    bookingSearch.roomSearch()
    expect(bookingSearch.results).to.deep.equal([bookings[0], bookings[2], bookings[3], bookings[4]])
  })

  it('Should be able to convert the booked room search results into a list of vacant rooms', () => {
    bookingSearch.roomSearch()
    bookingSearch.removeBookedRooms()
    expect(bookingSearch.vacantRooms).to.deep.equal([rooms[1]])
  })
});
