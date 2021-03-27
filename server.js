const express = require("express");
const mongoose = require("mongoose");
const config = require("./config")

const stationController = require("./controllers/station.controller")
const tripController = require("./controllers/trip.controller")
const userController = require("./controllers/user.controller")

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connect to Database successfully"))
  .catch(console.log)

const app = express();

app.use(express.json())

app.use("/images", express.static("images"))

app.use("/api", stationController)
app.use("/api", tripController)
app.use("/api/users", userController)
app.use("/api", require("./controllers/ticket.controller"))

const port = process.env.PORT || 7000

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
}) 
