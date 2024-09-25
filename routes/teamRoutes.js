const express = require('express');
// const { verifyToken, verifyAdmin, verifyHost } = require('../middleware/auth');
const { getAllTeams, getMyTeams, getOneTeam, createTeam, updateTeam, deleteTeam, } = require('../controllers/teamController');
const router = express.Router();


// Get all created teams.
router.get('/teams', getAllTeams);

// Get the teams you are in.
router.get('/teams/my-teams/:email', getMyTeams);

// Get that one specific team from your teams.
router.get('/teams/one-team/:id', getOneTeam);

// Create a team
router.post('/teams', createTeam);

// Update team
router.patch('/teams/:id', updateTeam);

// Delete team
router.delete('/teams/:id', deleteTeam);

module.exports = router;