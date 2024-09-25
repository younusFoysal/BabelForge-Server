const { getmembersCollection } = require("../models/memberModel");

const addMember = async (db, user) => {
  const memberCollections = getmembersCollection(db);
  return await memberCollections.insertOne(user);
};

const findAllmembers = async (db) => {
  const memberCollections = getmembersCollection(db);
  return await memberCollections.find().toArray();
};

const deleteMember = async (db, id) => {
  const memberCollections = getmembersCollection(db);
  return await memberCollections.deleteOne(id);
};

module.exports = { addMember, findAllmembers, deleteMember };
