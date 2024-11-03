const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  getAllTasks,
  getTaskDetails,
  addTask,
  updateTask,
  deleteTask,
  getMyTasks,
  getEvents,
} = require("../controllers/taskController");

// Get all tasks
router.get("/tasks", verifyToken, getAllTasks);

// Get task details by ID
router.get("/tasks/:id", getTaskDetails);

// Get my tasks
router.get("/tasks/my-tasks/:email", verifyToken, getMyTasks);

// Get tasks for calendar events
router.get("/events/:email", getEvents);

// Add a new task
router.post("/tasks/add", addTask);

// Update a task
router.patch("/tasks/update/:id", verifyToken, updateTask);

// Delete a task
router.delete("/tasks/delete/:id", verifyToken, deleteTask);

module.exports = router;
