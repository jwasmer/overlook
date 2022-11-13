import chai from 'chai';
const expect = chai.expect;
import User from '../src/classes/User.js'
import { testCustomerData, testBookingsData, testRoomsData } from './data/test-data.js'

describe('User.js class file', () => {
  let user1;
  let user2;
  let user3;

  beforeEach(() => {
    user1 = new User(testCustomerData[0])
    user2 = new User(testCustomerData[1])
    user3 = new User(testCustomerData[2])
  })

  it('Should have a property that stores the customers id', () => {
    expect(user1.id).to.deep.equal(1)
    expect(user3.id).to.deep.equal(3)
  })
  it('Should have a property that stores the customers name', () => {
    expect(user1.name).to.deep.equal("Leatha Ullrich")
    expect(user2.name).to.deep.equal("Rocio Schuster")
  })
  it('Should be able to find all bookings the customer has made', () => {
    expect(user1.findAllBookings(testBookingsData)).to.deep.equal([testBookingsData[0]])
    expect(user2.findAllBookings(testBookingsData)).to.deep.equal([testBookingsData[1], testBookingsData[2]])
  })
});

