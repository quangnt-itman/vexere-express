const express = require("express");
const { getStations, createStation,
  replaceStation, updateStation,
  getStationById,
  deleteStation } = require("../services/station.service")


const router = express.Router();

router.get("/stations", getStations);
router.get("/stations/:stationId", getStationById);
router.post("/stations", createStation)
router.put("/stations/:stationId", replaceStation)
router.patch("/stations/:stationId", updateStation)
router.delete("/stations/:stationId", deleteStation)

module.exports = router;