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

// Get all projects GET /api/projects
router.get("/projects", getProjects);

router.get("/projects/single/:id", getsingleProject);

router.get("/projects/my-projects", getMyProjects);

router.delete("/projects/:id", deleteProject);

// projects Update Api
router.patch("/projects/update/:id", updateProject);

module.exports = router;
