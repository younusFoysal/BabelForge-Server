// models/userModel.js
const getUserWebHookCollection = (db) => {
  return db.collection("clerkuser");
};

module.exports = { getUserWebHookCollection };
