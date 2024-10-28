const { ObjectId } = require('mongodb');
const {
  addProjects,
  deleteProjects,
  updateProjects,
  getAllProjects,
  SingleProject,
  findMyProjects,
  searchAndFilterProject,
} = require('../services/projectService');
const { getProjectsCollection } = require('../models/projectModel');
const { getUsersCollection } = require('../models/userModel');

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
  const { name, category, email } = req.query;
  // console.log(name.length, category.length, email.length);

  let result;
  if (name?.length && category?.length) {
    result = await searchAndFilterProject(db, name, category, email);
  } else if (name?.length) {
    result = await searchAndFilterProject(db, name, '', email);
  } else if (category?.length) {
    result = await searchAndFilterProject(db, '', category, email);
  } else {
    result = await getAllProjects(db);
  }
  res.send(result);
};


// Get all the projects i am in.
const getMyProjects = async (req, res) => {
  const db = req.app.locals.db;
  const { name, email } = req.query;
  // console.log(name, email);
  let query = {};

  if (name?.length) {
    query = {
      pname: { $regex: name, $options: 'i' },
      pallmembers: email,
    };
  } else {
    query = { pallmembers: email };
  }


  const result = await findMyProjects(db, query);

  res.send(result);
};

// single project api
const getsingleProject = async (req, res) => {
  const db = req.app.locals.db;
  const id = req.params.id;
  const result = await SingleProject(db, id);
  res.send(result);
};

// Get project members
const getProjectMembers = async (req, res) => {
  const projectId = req.params.id;
  // console.log("id: ", projectId);
  const db = req.app.locals.db;
  const projectsCollection = getProjectsCollection(db);
  const usersCollection = getUsersCollection(db);
  const project = await projectsCollection.findOne({ _id: new ObjectId(projectId) });

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  // console.log("project: ", project);
  const pallmembersEmails = project.pallmembers;

  // console.log("members: ", pallmembersEmails);

  const users = await usersCollection.find({ email: { $in: pallmembersEmails } }).toArray();

  res.send(users);
}

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
  const projectId = req.params.id;
  const project = req.body;
  // console.log(project);
  const {
    addTeam,
    removeTeam,
    purl,
    pedate,
    psdate,
    pmanager,
    pcategory,
    pimg,
    pdes,
    pname,
    favorite,
    pallmembers,
    addMember
  } = project;

  let updateFields = {
    $set: {},
  };

  // console.log("pi c", projectId);
  // console.log("pi c", addMember);

  // Conditionally update fields using $set
  if (pname) updateFields.$set.pname = pname;
  if (pdes) updateFields.$set.pdes = pdes;
  if (pimg) updateFields.$set.pimg = pimg;
  if (pcategory) updateFields.$set.pcategory = pcategory;
  if (pmanager) updateFields.$set.pmanager = pmanager;
  if (psdate) updateFields.$set.psdate = psdate;
  if (pedate) updateFields.$set.pedate = pedate;
  if (purl) updateFields.$set.purl = purl;

  if (favorite !== undefined) {
    updateFields.$set.favorite = favorite;
  }

  // Add or remove team members if applicable
  if (addTeam) {
    if (!updateFields.$addToSet) updateFields.$addToSet = {};
    updateFields.$addToSet.pteams = addTeam; // Adds the team if not already in the array
  }

  if (addMember) {
    updateFields.$addToSet = { pallmembers: addMember }; // Adds the member if not already in the array
  }

  if (removeTeam) {
    if (!updateFields.$pull) updateFields.$pull = {};
    updateFields.$pull.pteams = removeTeam; // Removes the team from the array
  }

  try {
    // console.log(projectId);
    const result = await updateProjects(
      db,
      { _id: new ObjectId(projectId) },
      updateFields
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: 'Project not found' });
    }

    if (result.modifiedCount === 0) {
      return res.status(400).send({ message: 'No changes made or data already exists' });
    }

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: 'Error updating project', error });
  }
};

module.exports = {
  addPoject,
  deleteProject,
  getProjects,
  getsingleProject,
  updateProject,
  getMyProjects,
  getProjectMembers
};
