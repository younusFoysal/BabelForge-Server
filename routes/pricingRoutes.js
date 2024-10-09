const express = require("express");
const { getAllPrice } = require("../controllers/pricingController");
const router = express.Router();


router.get('/pricing',getAllPrice);

module.exports=router
