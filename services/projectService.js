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
}

const getAllProjects = async (db) => {
  const projectsCollection = getProjectsCollection(db);
  return await projectsCollection.find().toArray();
};

const SingleProject = async (db, id) => {
  const projectsCollection = getProjectsCollection(db);
  const query = {
    _id: new ObjectId(id),
  };
  return await projectsCollection.findOne(query);
};


const searchProject = async (db, name) => {
  const projectsCollection = getProjectsCollection(db);
  const query = {
    pname: name,
  };
  return await projectsCollection.findOne(query);
};


module.exports = {
  addProjects,
  deleteProjects,
  getAllProjects,
  searchProject,
  SingleProject,
  updateProjects
};
