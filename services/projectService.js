const { ObjectId } = require("mongodb");
const { getProjectsCollection } = require("../models/projectModel");



const addProjects = async (db, project) => {
  const projectsCollection = getProjectsCollection(db);
  return await projectsCollection.insertOne(project);
};

const findMyProjects = async (db, query) => {
  const projectCollection = getProjectsCollection(db);
  return await projectCollection.find(query).toArray();
}

// delete projects
const deleteProjects = async (db, projectId) => {
  const projectsCollection = getProjectsCollection(db);
  return await projectsCollection.deleteOne({ _id: new ObjectId(projectId) });
};

// update projects
const updateProjects = async (db, filter, updateProject) => {
  // console.log("update: ",updateProject);
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


const searchAndFilterProject = async (db, name, category, email) => {
  const projectsCollection = getProjectsCollection(db);
  // console.log("from service: ", name, category, email);
  let query = {};

  if (name.length && category.length) {
    query = {
      pname: { $regex: name, $options: 'i' },
      pcategory: category,
      pallmembers: email
    };
  }
  else if (name.length) {
    query = {
      pname: { $regex: name, $options: 'i' },
      pallmembers: email
    };
  }
  else if (category.length) {
    query = {
      pcategory: category,
      pallmembers: email
    };
  }
  return await projectsCollection.find(query).toArray();
};


module.exports = {
  addProjects,
  deleteProjects,
  getAllProjects,
  searchAndFilterProject,
  SingleProject,
  updateProjects,
  findMyProjects
};
