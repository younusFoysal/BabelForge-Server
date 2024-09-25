// controllers/memberController.js
const { getmembersCollection } = require("../models/memberModel");
const { ObjectId } = require("mongodb");

const {
  addMember,
  findAllmembers,
  deleteMember,
} = require("../services/useMemberService");

// Get all members
const getAllmember = async (req, res) => {
  const db = req.app.locals.db;
  const members = await findAllmembers(db);
  res.send(members);
};

// Add a new member
const addmember = async (req, res) => {
  const db = req.app.locals.db;
  const member = req.body;
  const result = await addMember(db, member);
  res.status(201).send(result);
};

// Delete a member
const deletmember = async (req, res) => {
  const db = req.app.locals.db;
  const memberId = req.params.id;
  const newId = { _id: new ObjectId(memberId) };
  const result = await deleteMember(db, newId);
  res.send(result);
};

module.exports = { getAllmember, addmember, deletmember };
