const { Station } = require("../models/station.model");

module.exports.getStations = (req, res, next) => {
  return Station.find()
    .then(stations => {
      return res.status(200).json(stations);
    })
    .catch(err => {
      return res.status(500).json(err)
    })
}

module.exports.createStation = (req, res, next) => {
  const { name, address, province } = req.body;
  return Station.create({
    name, address, province
  })
    .then(station => {
      return res.status(201).json(station)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
}

// PUT /api/stations/:stationId
// body: {name, address, province}
module.exports.replaceStation = (req, res, next) => {
  const { stationId } = req.params;

  Station.findById(stationId)
    .then(station => {
      if (!station) return Promise.reject({
        status: 404,
        message: "Station Not Found"
      })

      // Object.keys(["name", "address", "province"])
      Object
        .keys(Station.schema.obj)
        .forEach(key => {
          station[key] = req.body[key];
        })

      return station.save()
    })
    .then(station => res.status(200).json(station))
    .catch(err => res.json(err))
}

// PATCH /api/stations/:stationId
// body: {name, address, province}
module.exports.updateStation = (req, res, next) => {
  const { stationId } = req.params;

  Station.findById(stationId)
    .then(station => {
      if (!station) return Promise.reject({
        status: 404,
        message: "Station Not Found"
      })

      // station.name = req.body.name ? req.body.name : station.name;
      // station.address = req.body.address ? req.body.address : station.address;
      // station.province = req.body.province ? req.body.province : station.province;
      Object.keys(req.body)
        .forEach(key => station[key] = req.body[key])

      return station.save()
    })
    .then(station => res.status(200).json(station))
    .catch(err => res.json(err))
}

module.exports.getStationById = (req, res, next) => {
  const { stationId } = req.params;

  Station.findById(stationId)
    .then(station => {
      if (!station) return Promise.reject({
        status: 404,
        message: "Station Not Found"
      })

      return res.status(200).json(station)
    })
    .catch(err => res.json(err))
}

module.exports.deleteStation = (req, res, next) => {
  const { stationId } = req.params;

  let _station;
  Station.findById(stationId)
    .then(station => {
      if (!station) return Promise.reject({
        status: 404,
        message: "Station Not Found"
      })

      _station = station

      return station.deleteOne()
    })
    .then(() => {
      res.status(200).json(_station)
    })
    .catch(err => res.json(err))
}