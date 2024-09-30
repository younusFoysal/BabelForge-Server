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

const getAllProjects = async (db) => {
  const projectsCollection = getProjectsCollection(db);
  return await projectsCollection.find().toArray();
};

const searchProject = async (db, name) => {
  const projectsCollection = getProjectsCollection(db);
  const query = {
    pname: name,
  };
  return await projectsCollection.findOne(query);
};

module.exports = { addProjects, deleteProjects, getAllProjects, searchProject };
