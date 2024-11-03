const express = require("express");
const router = express.Router();
const {
  addPoject,
  deleteProject,
  updateProject,
  getProjects,
  getsingleProject,
  getMyProjects,
  getProjectMembers,
} = require("../controllers/projectController");
const { verifyToken } = require("../middleware/auth");

router.post("/projects", addPoject);

router.get("/projects", verifyToken, getProjects);

router.get("/projects/single/:id", verifyToken, getsingleProject);

router.get("/projects/members/:id", verifyToken, getProjectMembers);

router.get("/projects/my-projects", verifyToken, getMyProjects);

router.delete("/projects/:id", verifyToken, deleteProject);

router.patch("/projects/update/:id", verifyToken, updateProject);

module.exports = router;
