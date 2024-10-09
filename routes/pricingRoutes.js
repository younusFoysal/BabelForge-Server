const express = require("express");
const { getAllPrice, updatePrice, getSinglePrice } = require("../controllers/pricingController");
const router = express.Router();


router.get('/pricing',getAllPrice);

router.get('/pricing-single/:id',getSinglePrice)

router.patch('/update-pricing/:id',updatePrice);

module.exports=router
