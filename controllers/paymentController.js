const { ObjectId } = require("mongodb");
const { getPaymentCollection } = require("../models/paymentModel");
const { addPaymentService } = require("../services/paymentService");

const addPayment = async (req, res) => {
  const db = req.app.locals.db;
  const payment = req.body;
  const result = await addPaymentService(db, payment);
  res.send(result);
};

const getAllPayment = async (req, res) => {
  const db = req.app.locals.db;
  const paymentCollection = getPaymentCollection(db);
  const result = await paymentCollection.find().toArray();
  res.send(result);
};

const getUserPayment = async (req, res) => {
  const db = req.app.locals.db;
  const email = req.params.email;
  const query = { email: email };
  const paymentCollection = getPaymentCollection(db);
  const result = await paymentCollection.find(query).toArray();
  res.send(result);
};

const getSinglePayment = async (req, res) => {
  const db = req.app.locals.db;
  const email = req.params.email;
  const query = { email: email };
  const paymentCollection = getPaymentCollection(db);

  try {
    const result = await paymentCollection.findOne(query);
    if (result) {
      res.send({ pakage: result.pakage });
    } else {
      res.status(404).send({ error: "No payment data found for this email" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error retrieving payment data" });
  }
};

module.exports = {
  addPayment,
  getAllPayment,
  getUserPayment,
  getSinglePayment,
};
