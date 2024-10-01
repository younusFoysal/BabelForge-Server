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

// Create a team
const createTeam = async (req, res) => {
  const db = req.app.locals.db;
  const teamCollection = getTeamsCollection(db);
  const data = req.body;
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
  const query = { _id: new ObjectId(id) };

  // please use the same name while passing data to the server from frontend
  const { addMember, removeMember, addLink, removeLink, name, description, coverImage } = req.body;

  let updateFields = {};

  if (addMember) {
    updateFields.$addToSet = { members: addMember }; // Adds the member if not already in the array
  }
  if (removeMember) {
    updateFields.$pull = { members: removeMember }; // Removes the member from the array
  }

  if (addLink) {
    updateFields.$addToSet = { links: addLink }; // Adds the link only if it’s not already in the array
  }
  if (removeLink) {
    updateFields.$pull = { links: removeLink }; // Removes the link (string) from the links array
  }

  // Conditionally update name, description, and coverImage using $set
  if (name) {
    updateFields.$set = { name };
  }
  if (description) {
    updateFields.$set = { description };
  }
  if (coverImage) {
    updateFields.$set = { coverImage };
  }

  try {
    const result = await teamCollection.updateOne(query, updateFields);

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: 'Team not found' });
    }

    if (result.modifiedCount === 0) {
      return res.status(400).send({ message: 'No changes made or data already exists' });
    }

    res.send(result);
  } catch (error) {
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
};
