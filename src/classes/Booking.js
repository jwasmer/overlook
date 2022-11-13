class Booking{
  constructor(dates, room, user) {
    this.owner = user;
    this.room = room;
    this.startDate = dates.selectedDates[0];
    this.endDate = dates.selectedDates[1];
  }
}