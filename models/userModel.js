// models/userModel.js
const getUsersCollection = (db) => {
    return db.collection('users');
};

module.exports = { getUsersCollection };
