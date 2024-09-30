const express = require("express");
const router = express.Router();
const {
  addPoject,
  deleteProject,
  getProjects,
} = require("../controllers/projectController");

router.post("/projects", addPoject);

router.delete("/projects/:id", deleteProject);

// Get all projects GET /api/projects
router.get("/projects", getProjects);

module.exports = router;
