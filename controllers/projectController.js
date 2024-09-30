const { addProjects, deleteProjects } = require("../services/projectService");

const addPoject = async (req, res) => {
  const db = req.app.locals.db;
  const projects = req.body;
  const result = await addProjects(db, projects);
  res.send(result);
};

const deleteProject = async (req, res) => {
  const db = req.app.locals.db;
  const projectId = req.params.id;
  const result = await deleteProjects(db, projectId);
  res.send(result);

}

module.exports = { addPoject , deleteProject};
