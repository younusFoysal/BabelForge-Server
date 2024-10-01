const express = require("express");
const router = express.Router();
const {
  addPoject,
  deleteProject,
  updateProject,
  getProjects,
  getsingleProject,
  getMyProjects,
} = require("../controllers/projectController");

router.post("/projects", addPoject);

router.get("/projects/:id", getsingleProject);

router.get("/projects/my-projects/:email", getMyProjects);

router.delete("/projects/:id", deleteProject);

// Get all projects GET /api/projects
router.get("/projects", getProjects);

// projects Update Api
router.patch("/projects/update/:id", updateProject);

module.exports = router;
