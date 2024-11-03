const express = require("express");
const { jwtdocs } = require("../controllers/jwtController");

const router = express.Router();

router.post("/jwttoken", jwtdocs);

module.exports = router;
