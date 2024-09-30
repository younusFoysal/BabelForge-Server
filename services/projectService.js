const { ObjectId } = require("mongodb");
const { getProjectsCollection } = require("../models/projectModel");

const addProjects = async (db, project) => {
  const projectsCollection = getProjectsCollection(db);
  return await projectsCollection.insertOne(project);
};

const deleteProjects = async (db, projectId) => {
  const projectsCollection = getProjectsCollection(db);
  return await projectsCollection.deleteOne({ _id: new ObjectId(projectId) });
};



module.exports = { addProjects, deleteProjects };
