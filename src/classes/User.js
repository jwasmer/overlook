

class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id
  }
  
  findAllBookings(bookings) {
    return bookings.filter(booking => {
      return booking.userID === this.id
    })
  }

  getVacancies(bookings, date) {
    return bookings.filter(booking => {
      return booking.date.getTime() === date.getTime()
    })
  }
}

export default User;