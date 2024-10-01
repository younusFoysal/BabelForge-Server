const express = require("express");
const router = express.Router();
const { allDashinfo } = require("../controllers/DashboardController");

router.get("/stat", allDashinfo);

module.exports = router;
