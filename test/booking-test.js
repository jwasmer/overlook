import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking'
import { testCustomerData, testBookingsData, testRoomsData } from './data/test-data'

describe('Booking.js class file', () => {
  let booking1;
  let booking2;
  let booking3;

  beforeEach(() => {
    booking1 = new Booking(testBookingsData[0])
    booking2 = new Booking(testBookingsData[1])
    booking3 = new Booking(testBookingsData[4])
  })

  it('Should have a property containing the userID of the customer that booked the room', () => {
    expect(booking1.userID).to.deep.equal(1)
    expect(booking2.userID).to.deep.equal(2)
  })

  it('Should have a property containing the bookings unique bookingID', () => {
    expect(booking1.bookingID).to.deep.equal("5fwrgu4i7k55hl6x8")
    expect(booking2.bookingID).to.deep.equal("5fwrgu4i7k55hl6uf")
  })

  it('Should have a property containing the date object of the booking', () => {
    expect(booking1.date).to.deep.equal(new Date("2023/01/11"))
    expect(booking2.date).to.deep.equal(new Date("2023/01/09"))
  })

  it('Should have a property to store the room number of the booking', () => {
    expect(booking1.roomNum).to.deep.equal(1)
    expect(booking3.roomNum).to.deep.equal(5)
  })

  it('Should have a method to display a date object in the format of YYYY/MM/DD', () => {
    expect(booking1.displayDate()).to.deep.equal("2023/01/11")
  })
});
