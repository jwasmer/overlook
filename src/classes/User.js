class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id
    this.username = 'customer' + user.id
  }
  
  findAllBookings(bookings) {
    return bookings.filter(booking => {
      return booking.userID === this.id
    })
  }

  findVacancies(bookings, date) {
    return bookings.filter(booking => {
      if (booking.date.getTime() === date.getTime()) {
        return booking.date.getTime() === date.getTime()
      }
    })
  }
}

export default User;