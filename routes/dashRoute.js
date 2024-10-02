const express = require("express");
const router = express.Router();
const { allDashinfo } = require("../controllers/DashboardController");

router.get("/stat/:email", allDashinfo);

module.exports = router;
