// services/userService.js
const { getUsersCollection } = require("../models/userModel");

const findUserByEmail = async (db, email) => {
  const usersCollection = getUsersCollection(db);
  return await usersCollection.findOne({ email });
};

const updateUser = async (db, user) => {
  const usersCollection = getUsersCollection(db);
  const query = { email: user.email };
  const updateDoc = { $set: { ...user, timestamp: Date.now() } };
  const options = { upsert: true };
  return await usersCollection.updateOne(query, updateDoc, options);
};

const addAllUser = async (db, user) => {
  const usersCollection = getUsersCollection(db);
  return await usersCollection.insertOne(user);
};

const findAllUsers = async (db) => {
  const usersCollection = getUsersCollection(db);
  return await usersCollection.find().toArray();
};

module.exports = { findUserByEmail, updateUser, findAllUsers, addAllUser };
