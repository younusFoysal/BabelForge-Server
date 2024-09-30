const express = require("express");
const router = express.Router();
const { addPoject, deleteProject, updateProject } = require("../controllers/projectController");

router.post("/projects", addPoject);


// Projects Delete api 
router.delete("/projects/:id", deleteProject);

// projects Update Api
router.patch("/projects/update/:id", updateProject);

module.exports = router;
