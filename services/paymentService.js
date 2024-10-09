const { getPaymentCollection } = require("../models/paymentModel")

const addPaymentService = (db, payment)=>{
    const paymentCollection = getPaymentCollection(db);
    return paymentCollection.insertOne(payment);
}

module.exports={addPaymentService}