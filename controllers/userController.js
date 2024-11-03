const {
  findUserByEmail,
  updateUser,
  findAllUsers,
} = require("../services/userService");

const { getUsersCollection } = require("../models/userModel");

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
  // console.log(email);
  res.send(result);
};

const getAllUsers = async (req, res) => {
  const db = req.app.locals.db;
  const result = await findAllUsers(db);
  res.send(result);
};

const UpdatePackage = async (req, res) => {
  const db = req.app.locals.db;
  const usersCollection = getUsersCollection(db);
  const email = req.params.email;
  const updateFields = req.body;
  const query = { email };

  let updateDoc = { $set: { ...updateFields } };

  const result = await usersCollection.updateOne(query, updateDoc);

  res.send(result);
};

module.exports = {
  updateUserProfile,
  getUser,
  getAllUsers,
  UpdatePackage,
};
