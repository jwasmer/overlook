const testCustomerData = [
  {
    id: 1,
    name: "Leatha Ullrich"
  },
  {
    id: 2,
    name: "Rocio Schuster"
  },
  {
    id: 3,
    name: "Kelvin Schiller"
  }
]

const testBookingsData =[
  {
    id: "5fwrgu4i7k55hl6x8",
    userID: 1,
    date: "2023/01/11",
    roomNumber: 1
  },
  {
    id: "5fwrgu4i7k55hl6uf",
    userID: 2,
    date: "2023/01/09",
    roomNumber: 1
  },
  {
    id: "5fwrgu4i7k55hl6uy",
    userID: 2,
    date: "2023/01/24",
    roomNumber: 2
  },
  {
    id: "5fwrgu4i7k55hl6tl",
    userID: 3,
    date: "2022/01/10",
    roomNumber: 2
  },
  {
    id: "5fwrgu4i7k55hl6v3",
    userID: 3,
    date: "2022/02/07",
    roomNumber: 3
    },
    {
    id: "5fwrgu4i7k55hl6zn",
    userID: 3,
    date: "2022/01/27",
    roomNumber: 3
  }
]

const testRoomsData = [
  {
    number: 1,
    roomType: "residential suite",
    bidet: false,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 343.95
  },
  {
    number: 2,
    roomType: "junior suite",
    bidet: false,
    bedSize: "king",
    numBeds: 2,
    costPerNight: 496.41
  },
  {
    number: 3,
    roomType: "single room",
    bidet: false,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 374.67
  }
]

export { testCustomerData, testBookingsData, testRoomsData };