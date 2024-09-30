const getProjectsCollection = (db) => {
  return db.collection("projects");
};

module.exports = { getProjectsCollection };
