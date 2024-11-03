// models/taskModel.js
const getTasksCollection = db => {
  return db.collection('tasks');
};

module.exports = { getTasksCollection };
