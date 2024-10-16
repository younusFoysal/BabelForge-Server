
const { ObjectId } = require("mongodb");
const { getPaymentCollection } = require("../models/paymentModel");
const { addPaymentService } = require("../services/paymentService");

const addPayment = async(req,res)=>{
    const db = req.app.locals.db;
    const payment = req.body;
    const result = await addPaymentService(db, payment);
    res.send(result);
}

const getAllPayment = async(req,res)=>{
    const db = req.app.locals.db;
    const paymentCollection = getPaymentCollection(db);
    const result = await paymentCollection.find().toArray();
    res.send(result);
}

const getUserPayment = async(req,res)=>{
    const db = req.app.locals.db;
    const email = req.params.email;
    console.log(email);
    
    const query = {email: email}
    const paymentCollection = getPaymentCollection(db);
    const result = await paymentCollection.find(query).toArray();
    res.send(result);

}

module.exports= {addPayment, getAllPayment, getUserPayment}