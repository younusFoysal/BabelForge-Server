
const { getPricingCollection } = require("../models/pricingModel");


const getAllPrice = async(req,res)=>{
    const db = req.app.locals.db;
    const priceCollection = getPricingCollection(db);
    const result = await priceCollection.find().toArray();
    res.send(result);
}

module.exports={
    getAllPrice
}