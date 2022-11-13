class Booking{
  constructor(booking) {
    this.userID = booking.userID;
    this.bookingID = booking.id;
    this.date = new Date(booking.date);
    this.roomNum = booking.roomNumber
  }

  findRoomData(rooms) {
    return rooms.find(room => room.number === this.roomNum)
  }
}

export default Booking;