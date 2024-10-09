
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

const getSinglePayment = async(req,res)=>{
    const db = req.app.locals.db;
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const paymentCollection = getPaymentCollection(db);
    const result = await paymentCollection.findOne(query);
    res.send(result);

}

module.exports= {addPayment, getAllPayment, getSinglePayment}