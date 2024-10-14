const express = require("express");
const { getwebHook } = require("../controllers/webController");

const router = express.Router();

router.post("/webhook/clerk", getwebHook);

module.exports = router;