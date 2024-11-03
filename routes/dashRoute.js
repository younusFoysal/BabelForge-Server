const express = require("express");
const router = express.Router();
const { allDashinfo } = require("../controllers/DashboardController");
const { verifyToken } = require("../middleware/auth");

router.get("/stat/:email", verifyToken, allDashinfo);

module.exports = router;
