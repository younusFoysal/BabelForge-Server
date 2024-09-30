const getUsersCollection = (db) => {
  return db.collection("projects");
};

module.exports = { getUsersCollection };
