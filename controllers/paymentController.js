
const { addPaymentService } = require("../services/paymentService");

const addPayment = async(req,res)=>{
    const db = req.app.locals.db;
    const payment = req.body;
    const result = await addPaymentService(db, payment);
    res.send(result);
}

module.exports= {addPayment}