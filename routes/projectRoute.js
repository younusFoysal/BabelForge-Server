const express = require("express");
const router = express.Router();
const { addPoject } = require("../controllers/projectController");

router.post("/projects", addPoject);

module.exports = router;
