const { ObjectId } = require('mongodb');
const { getTeamsCollection } = require('../models/teamModel');

// Get all created teams.
const getAllTeams = async (req, res) => {
  const db = req.app.locals.db;
  const teamCollection = getTeamsCollection(db);
  const result = await teamCollection.find().toArray();
  res.send(result);
};

// Get the teams you are in.
const getMyTeams = async (req, res) => {
  const db = req.app.locals.db;
  const teamCollection = getTeamsCollection(db);
  const email = req.params.email;
  const query = { tmembers: email };
  const result = await teamCollection.find(query).toArray();
  if (result.length === 0) {
    return res.status(404).send({ message: 'No teams found with that member' });
  }
  res.send(result);
};

// Get that one specific team from your teams.
const getOneTeam = async (req, res) => {
  const db = req.app.locals.db;
  const teamCollection = getTeamsCollection(db);
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await teamCollection.findOne(query);
  res.send(result);
};

// Get teams under a project
const getTeamsOfProject = async (req, res) => {
  const db = req.app.locals.db;
  const teamCollection = getTeamsCollection(db);
  const projectId = req.params.id;
  // console.log(projectId);
  const query = { tproject: projectId }
  const result = await teamCollection.find(query).toArray();
  res.send(result);
}

// Create a team
const createTeam = async (req, res) => {
  const db = req.app.locals.db;
  const teamCollection = getTeamsCollection(db);
  const data = req.body;

  // Add a timestamp only if 'createdAt' is not present in the incoming data
  if (!data.createdAt) {
    data.createdAt = new Date();
  }

  const result = await teamCollection.insertOne(data);
  // console.log(data);
  // console.log(result);
  res.send(result);
};

// Update team
const updateTeam = async (req, res) => {
  const db = req.app.locals.db;
  const teamCollection = getTeamsCollection(db);
  const id = req.params.id;
  console.log(`Updating team with ID: ${id}`);
  const query = { _id: new ObjectId(id) };

  const { addMember, removeMember, addLink, removeLink, tname, tdes, tpic, tcategory } = req.body;
  console.log('Request body:', req.body);

  let updateFields = { $set: {} }; // Initialize $set to store multiple fields

  // Handle member updates
  if (addMember) {
    updateFields.$addToSet = { tmembers: addMember }; // Adds the member if not already in the array
  }
  if (removeMember) {
    updateFields.$pull = { tmembers: removeMember }; // Removes the member from the array
  }

  // Handle link updates
  if (addLink) {
    updateFields.$addToSet = { links: addLink }; // Adds the link only if it’s not already in the array
  }
  if (removeLink) {
    updateFields.$pull = { links: removeLink }; // Removes the link (string) from the links array
  }

  // Conditionally update name, description, and other fields
  if (tname) {
    updateFields.$set.tname = tname;
  }
  if (tdes) {
    updateFields.$set.tdes = tdes;
  }
  if (tpic) {
    updateFields.$set.tpic = tpic;
  }
  if (tcategory) {
    updateFields.$set.tcategory = tcategory;
  }

  // Remove $set if it's empty
  if (Object.keys(updateFields.$set).length === 0) {
    delete updateFields.$set;
  }

  try {
    const result = await teamCollection.updateOne(query, updateFields);

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Team not found" });
    }

    if (result.modifiedCount === 0) {
      return res
        .status(400)
        .send({ message: "No changes made or data already exists" });
    }

    res.send({ message: 'Team updated successfully', result });
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).send({ message: 'Error updating team', error });
  }
};


// Delete team
const deleteTeam = async (req, res) => {
  const db = req.app.locals.db;
  const teamCollection = getTeamsCollection(db);
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await teamCollection.deleteOne(query);
  res.send(result);
};

module.exports = {
  getAllTeams,
  getMyTeams,
  getOneTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  getTeamsOfProject
};
