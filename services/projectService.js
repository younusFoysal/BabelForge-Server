const { getUsersCollection } = require("../models/projectModel");

const addProjects = async (db, project) => {
  const usersCollection = getUsersCollection(db);
  return await usersCollection.insertOne(project);
};

module.exports = { addProjects };
