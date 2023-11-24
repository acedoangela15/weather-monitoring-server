const HttpError = require("../models/http-error");
const Log = require("../models/log");

const createLog = async (req, res, next) => {
  try {
    const newLog = new Log({
      humidity: 60.5,
      temperature: 29.5,
      rainfall: "HIGH",
      wind_speed: 1.5,
    });

    await newLog.save();

    res.json({ ...newLog._doc, message: "Log added sucessfully" });
  } catch (error) {
    console.log("log reg error: ", error);
    return next(new HttpError("Something went wrong", 500));
  }
};

const getLatestLog = async (req, res, next) => {
  try {
    const log = await Log.find();

    res.json(log);
  } catch (error) {
    console.log("log reg error: ", error);
    return next(new HttpError("Something went wrong", 500));
  }
};

const updateLog = async (req, res, next) => {
  const { uid } = req.params;

  const payload = req.body;
  try {
    const log = await Log.findById(uid);
    if (!log) return next(new HttpError("Log not found", 404));

    const updateLog = await Log.findByIdAndUpdate(uid, payload, { new: true });

    res.json({ log: updateLog, message: "Log updated successfully" });
  } catch (error) {
    console.log("log reg error: ", error);
    return next(new HttpError("Something went wrong", 500));
  }
};

module.exports = {
  createLog,
  updateLog,
  getLatestLog,
};