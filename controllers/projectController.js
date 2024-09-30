const { ObjectId } = require("mongodb");
const { addProjects, deleteProjects, updateProjects } = require("../services/projectService");

const addPoject = async (req, res) => {
  const db = req.app.locals.db;
  const projects = req.body;
  const result = await addProjects(db, projects);
  res.send(result);
};


// delete project
const deleteProject = async (req, res) => {
  const db = req.app.locals.db;
  const projectId = req.params.id;
  const result = await deleteProjects(db, projectId);
  res.send(result);

}


// update project
const updateProject = async (req, res) => {

  const db = req.app.locals.db;
  const project = req.body;
  const projectId = req.params.id;
  const filter = { _id: new ObjectId(projectId) };
  const updateProject = {
    $set: {
      pname: project.pname,
      pdes: project.pdes,
      pimg: project.pimg,
      pcategory: project.pcategory,
      pmanager: project.pmanager,
      psdate: project.psdate,
      pedate: project.pedate,
      purl: project.purl,
    }
  }

  const result = await updateProjects(db, filter, updateProject);
  res.send(result);


}

module.exports = { addPoject, deleteProject, updateProject };
