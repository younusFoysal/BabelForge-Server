const { ObjectId } = require("mongodb");
const { getProjectsCollection } = require("../models/projectModel");

const addProjects = async (db, project) => {
  const projectsCollection = getProjectsCollection(db);
  return await projectsCollection.insertOne(project);
};

// delete projects
const deleteProjects = async (db, projectId) => {
  const projectsCollection = getProjectsCollection(db);
  return await projectsCollection.deleteOne({ _id: new ObjectId(projectId) });
};

// update projects
const updateProjects = async (db, filter, updateProject) => {
  const projectsCollection = getProjectsCollection(db);
  return await projectsCollection.updateOne(filter, updateProject);
};



module.exports = { addProjects, deleteProjects, updateProjects };
