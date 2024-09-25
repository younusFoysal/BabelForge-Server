const express = require("express");
const router = express.Router();
const {
  getAllmember,
  addmember,
  updatemember,
  deletmember,
} = require("../controllers/memberController");
// Get all tasks GET /api/tasks
router.get("/members", getAllmember);

// Add a new task POST /api/tasks/add
router.post("/member/add", addmember);

// Update a task PATCH /api/tasks/update/:id
router.patch("/member/update/:id", updatemember);

// Delete a task DELETE /api/tasks/delete/:id
router.delete("/member/delete/:id", deletmember);

module.exports = router;
