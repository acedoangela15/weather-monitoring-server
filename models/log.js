const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  temperature: {
    type: Number,
  },
  rainfall: {
    type: String,
  },
  humidity: {
    type: Number,
  },
  wind_speed: {
    type: Number,
  },
});

module.exports = mongoose.model("Log", LogSchema);
