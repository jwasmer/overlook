import chai from 'chai';
import Booking from '../src/classes/Booking.js';
const expect = chai.expect;
import User from '../src/classes/User.js'
import { testCustomerData, testBookingsData, testRoomsData } from './data/test-data.js'

describe('User.js class file', () => {
  let user1;
  let user2;
  let user3;
  let testBookings

  beforeEach(() => {
    user1 = new User(testCustomerData[0])
    user2 = new User(testCustomerData[1])
    user3 = new User(testCustomerData[2])

    testBookings = testBookingsData.map(booking => {
      return booking = new Booking(booking)
    })
  })

  it('Should have a property that stores the customers id', () => {
    expect(user1.id).to.deep.equal(1)
    expect(user3.id).to.deep.equal(3)
  })

  it('Should have a property that stores the customers name', () => {
    expect(user1.name).to.deep.equal("Leatha Ullrich")
    expect(user2.name).to.deep.equal("Rocio Schuster")
  })

  it('Should have a username property consisting of the word customer and the user id (e.x. customer50)', () => {
    expect(user1.username).to.deep.equal('customer1')
    expect(user3.username).to.deep.equal('customer3')
  })

  it('Should be able to find all bookings the customer has made', () => {
    expect(user1.findAllBookings(testBookingsData)).to.deep.equal([testBookingsData[0]])
    expect(user2.findAllBookings(testBookingsData)).to.deep.equal([testBookingsData[1], testBookingsData[2]])
  })

  it('Should be able to search for all room listings on a specific date', () => {
    expect(user1.findVacancies(testBookings, new Date("2023/01/11"))).to.deep.equal([testBookings[0], testBookings[2], testBookings[3], testBookings[4]])
  })
});

