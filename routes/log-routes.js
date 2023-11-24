const express = require("express");
const router = express.Router();

const logController = require("../controllers/log-controller");

router.post("/new", logController.createLog);
router.get("/", logController.getLatestLog);
router.put("/:uid", logController.updateLog);

module.exports = router;
