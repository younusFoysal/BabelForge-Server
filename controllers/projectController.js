const { ObjectId } = require("mongodb");
const {
  addProjects,
  deleteProjects,
  updateProjects,
  getAllProjects,
  searchProject,
  SingleProject,
  findMyProjects,
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

// Get all the projects i am in.
const getMyProjects = async (req, res) => {
  const db = req.app.locals.db;
  const email = req.params.email;
  const query = { pallmembers: email };
  const result = await findMyProjects(db, query);
  if (result.length === 0) {
    res.send({ message: "No Team Found" })
  }
  res.send(result);
}

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


module.exports = { addPoject, deleteProject, getProjects, getsingleProject, updateProject, getMyProjects };
