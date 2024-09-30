const {
  addProjects,
  deleteProjects,
  getAllProjects,
  searchProject,
  SingleProject,
} = require("../services/projectService");

// add new project
const addPoject = async (req, res) => {
  const db = req.app.locals.db;
  const projects = req.body;
  const result = await addProjects(db, projects);
  res.send(result);
};

// get all projects and search projects
const getProjects = async (req, res) => {
  const db = req.app.locals.db;
  const name = req.query.name;
  let result;
  if (name) {
    result = await searchProject(db, name);
  } else {
    result = await getAllProjects(db);
  }
  res.send(result);
};

// single project api
const getsingleProject = async (req, res) => {
  const db = req.app.locals.db;
  const id = req.params.id;
  const result = await SingleProject(db, id);
  res.send(result);
};

// delete project
const deleteProject = async (req, res) => {
  const db = req.app.locals.db;
  const projectId = req.params.id;
  const result = await deleteProjects(db, projectId);
  res.send(result);
};

module.exports = { addPoject, deleteProject, getProjects, getsingleProject };
