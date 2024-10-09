const express = require("express");
const router = express.Router();


router.get('/pricing',pricingCard);

router.patch('/pricingCard/update/:id',updatePricing);