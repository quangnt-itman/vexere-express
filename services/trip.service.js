const { Trip } = require("../models/trip.model")
const { Seat } = require("../models/seat.model")

const seatCodeArray = [
  "A01", "A02", "A03", "A04", "A05", "A06",
  "A07", "A08", "A09", "A10", "A11", "A12",
  "B01", "B02", "B03", "B04", "B05", "B06",
  "B07", "B08", "B09", "B10", "B11", "B12",
]

module.exports.createTrip = (req, res, next) => {
  const { fromStationId, toStationId, startTime, price } = req.body;

  const seats = seatCodeArray.map(code => {
    return new Seat({ code })
  })

  // Mongoose: Trip.create = new Trip + save
  // (
  //   new Trip({
  //     fromStationId, toStationId, startTime, price, seats
  //   })
  // ).save()
  return Trip.create({
    fromStationId: fromStationId,
    toStationId, startTime, price, seats
  })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.json(err))
}