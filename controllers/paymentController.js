
const { getPaymentCollection } = require("../models/paymentModel");
const { addPaymentService } = require("../services/paymentService");
const db = req.app.locals.db;
const addPayment = async(req,res)=>{
    
    const payment = req.body;
    const result = await addPaymentService(db, payment);
    res.send(result);
}

const getAllPayment = async(req,res)=>{
    const paymentCollection = getPaymentCollection(db);
    const result = await paymentCollection.find().toArray();
    res.send(result);
}

module.exports= {addPayment, getAllPayment}