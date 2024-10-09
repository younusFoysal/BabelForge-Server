const express = require("express");
const { adminDashboard } = require("../controllers/adminController");
const router = express.Router();


router.get("/dashboard", adminDashboard);

module.exports = router;