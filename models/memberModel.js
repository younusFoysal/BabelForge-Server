// models/taskModel.js
const getmembersCollection = (db) => {
  return db.collection("teammembers"); // Assuming you have a 'tasks' collection
};

module.exports = { getmembersCollection };
