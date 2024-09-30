const {
  addProjects,
  deleteProjects,
  getAllProjects,
  searchProject,
} = require("../services/projectService");

const addPoject = async (req, res) => {
  const db = req.app.locals.db;
  const projects = req.body;
  const result = await addProjects(db, projects);
  res.send(result);
};

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

const deleteProject = async (req, res) => {
  const db = req.app.locals.db;
  const projectId = req.params.id;
  const result = await deleteProjects(db, projectId);
  res.send(result);
};

module.exports = { addPoject, deleteProject, getProjects };
