const express = require("express");
// const { verifyToken, verifyAdmin, verifyHost } = require('../middleware/auth');
const {
  getAllTeams,
  getMyTeams,
  getOneTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  getTeamsOfProject,
} = require("../controllers/teamController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Get all created teams.
router.get("/teams", verifyToken, getAllTeams);

// Get the teams you are in.
router.get("/teams/my-teams/:email", verifyToken, getMyTeams);

// Get that one specific team from your teams.
router.get("/teams/one-team/:id", getOneTeam);

// Get teams under a project
router.get("/teams/of-project/:id", getTeamsOfProject);

// Create a team
router.post("/teams", createTeam);

// Update team
router.patch("/teams/:id", verifyToken, updateTeam);

// Delete team
router.delete("/teams/:id", deleteTeam);

module.exports = router;
