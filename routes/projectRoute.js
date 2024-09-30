const express = require("express");
const router = express.Router();
const {
  addPoject,
  deleteProject,
  getProjects,
  getsingleProject,
} = require("../controllers/projectController");

router.post("/projects", addPoject);

router.get("/projects/:id", getsingleProject);

router.delete("/projects/:id", deleteProject);
// Get all projects GET /api/projects
router.get("/projects", getProjects);

module.exports = router;
