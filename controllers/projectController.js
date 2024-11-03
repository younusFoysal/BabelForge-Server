const { ObjectId } = require("mongodb");
const {
  addProjects,
  deleteProjects,
  updateProjects,
  getAllProjects,
  SingleProject,
  findMyProjects,
  searchAndFilterProject,
} = require("../services/projectService");
const { getProjectsCollection } = require("../models/projectModel");
const { getUsersCollection } = require("../models/userModel");

const addPoject = async (req, res) => {
  const db = req.app.locals.db;
  const projects = req.body;
  const result = await addProjects(db, projects);
  res.send(result);
};

const getProjects = async (req, res) => {
  const db = req.app.locals.db;
  const { name, category, email } = req.query;

  let result;
  if (name?.length && category?.length) {
    result = await searchAndFilterProject(db, name, category, email);
  } else if (name?.length) {
    result = await searchAndFilterProject(db, name, "", email);
  } else if (category?.length) {
    result = await searchAndFilterProject(db, "", category, email);
  } else {
    result = await getAllProjects(db);
  }
  res.send(result);
};

const getMyProjects = async (req, res) => {
  const db = req.app.locals.db;
  const { name, email } = req.query;

  let query = {};

  if (name?.length) {
    query = {
      pname: { $regex: name, $options: "i" },
      pallmembers: email,
    };
  } else {
    query = { pallmembers: email };
  }

  const result = await findMyProjects(db, query);

  res.send(result);
};

const getsingleProject = async (req, res) => {
  const db = req.app.locals.db;
  const id = req.params.id;
  const result = await SingleProject(db, id);
  res.send(result);
};

const getProjectMembers = async (req, res) => {
  const projectId = req.params.id;

  const db = req.app.locals.db;
  const projectsCollection = getProjectsCollection(db);
  const usersCollection = getUsersCollection(db);
  const project = await projectsCollection.findOne({
    _id: new ObjectId(projectId),
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const pallmembersEmails = project.pallmembers;

  const users = await usersCollection
    .find({ email: { $in: pallmembersEmails } })
    .toArray();

  res.send(users);
};

const deleteProject = async (req, res) => {
  const db = req.app.locals.db;
  const projectId = req.params.id;
  const result = await deleteProjects(db, projectId);
  res.send(result);
};

const updateProject = async (req, res) => {
  const db = req.app.locals.db;
  const projectId = req.params.id;
  const project = req.body;

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
    addMember,
  } = project;

  let updateFields = {
    $set: {},
  };

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

  if (addTeam) {
    if (!updateFields.$addToSet) updateFields.$addToSet = {};
    updateFields.$addToSet.pteams = addTeam;
  }

  if (addMember) {
    updateFields.$addToSet = { pallmembers: addMember };
  }

  if (removeTeam) {
    if (!updateFields.$pull) updateFields.$pull = {};
    updateFields.$pull.pteams = removeTeam;
  }

  try {
    const result = await updateProjects(
      db,
      { _id: new ObjectId(projectId) },
      updateFields
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Project not found" });
    }

    if (result.modifiedCount === 0) {
      return res
        .status(400)
        .send({ message: "No changes made or data already exists" });
    }

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Error updating project", error });
  }
};

module.exports = {
  addPoject,
  deleteProject,
  getProjects,
  getsingleProject,
  updateProject,
  getMyProjects,
  getProjectMembers,
};
