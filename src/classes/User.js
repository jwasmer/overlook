class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id
  }
  
  findAllBookings(bookings) {
    return bookings.filter(booking => {
      booking.userID === this.id
    })
  }
}

export default User;