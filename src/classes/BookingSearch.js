class BookingSearch {
  constructor(currentUser, date, bookings, rooms) {
    this.rooms = rooms
    this.bookings = bookings
    this.user = currentUser
    this.bookingDate = date
    this.selectedBooking = {}
    this.roomFilter = null
    this.results = null
    this.vacantRooms = []
  }

  roomSearch() {
    this.results = this.user.findVacancies(this.bookings, this.bookingDate)
  }
  
  removeBookedRooms() {
    this.rooms.forEach(room => {
      const isBooked = this.results.some(result => {
        return result.roomNum === room.number
      })
      if (!isBooked) {
        this.vacantRooms.push(room)
      }
    })
  }
}

export default BookingSearch;