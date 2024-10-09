const express = require("express");
const { getAllPrice, updatePrice } = require("../controllers/pricingController");
const router = express.Router();


router.get('/pricing',getAllPrice);

router.patch('/update-pricing/:id',updatePrice);

module.exports=router
