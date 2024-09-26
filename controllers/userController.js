// controllers/userController.js
const { generateJwtToken } = require("../utils/helpers");
const {
  findUserByEmail,
  updateUser,
  findAllUsers,
  addAllUser,
} = require("../services/userService");
const bcrypt = require("bcrypt");

const createJwtToken = (req, res) => {
  const user = req.body;
  const token = generateJwtToken(user);
  console.log(token)
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true });
};

const logout = (req, res) => {
  res
    .clearCookie("token", {
      maxAge: 0,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true });
};

const createPaymentIntent = async (req, res) => {
  const salary = req.body.salary;
  const salaryInCent = parseFloat(salary) * 100;
  if (!salary || salaryInCent < 1) return;
  const { client_secret } = await stripe.paymentIntents.create({
    amount: salaryInCent,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: client_secret });
};

const addUser = async (req, res) => {
  const db = req.app.locals.db;
  const user = req.body;
  const hassPassword = bcrypt.hashSync(user.password, 16);
  // Check if user already exists
  const newuser = { ...user, password: hassPassword };
  //console.log(newuser)
  const existingUser = await findUserByEmail(db, user.email);
  if (existingUser) {
    return res.status(400).send({ message: "User already exists" });
  }
  // Add new user to the database
  const result = await addAllUser(db, newuser); // This will insert or update the user using upsert
  res.status(201).send(result);
};

const updateUserProfile = async (req, res) => {
  const db = req.app.locals.db;
  const user = req.body;
  const result = await updateUser(db, user);
  res.send(result);
};

const getUser = async (req, res) => {
  const db = req.app.locals.db;
  const email = req.params.email;
  const result = await findUserByEmail(db, email);
  res.send(result);
};

const getAllUsers = async (req, res) => {
  const db = req.app.locals.db;
  const result = await findAllUsers(db);
  res.send(result);
};

module.exports = {
  addUser,
  createJwtToken,
  logout,
  createPaymentIntent,
  updateUserProfile,
  getUser,
  getAllUsers,
};
