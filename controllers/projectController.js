const { addProjects } = require("../services/projectService");

const addPoject = async (req, res) => {
  const db = req.app.locals.db;
  const projects = req.body;
  const result = await addProjects(db, projects);
  res.send(result);
};

module.exports = { addPoject };
