const express = require("express");
const { adminDashboard } = require("../controllers/adminController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.get("/dashboard", verifyToken, adminDashboard);

module.exports = router;
