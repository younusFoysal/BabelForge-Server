const express = require("express");
const router = express.Router();
const { addPoject, deleteProject } = require("../controllers/projectController");

router.post("/projects", addPoject);

router.delete("/projects/:id", deleteProject);

module.exports = router;
