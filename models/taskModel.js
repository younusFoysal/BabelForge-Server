// models/taskModel.js
const getTasksCollection = (db) => {
    return db.collection('tasks'); // Assuming you have a 'tasks' collection
};

module.exports = { getTasksCollection };
