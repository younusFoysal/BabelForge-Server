const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getAllTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');

// Get all tasks GET /api/tasks
router.get('/tasks', getAllTasks);

// Add a new task POST /api/tasks/add
router.post('/tasks/add', addTask);

// Update a task PATCH /api/tasks/update/:id
router.patch('/tasks/update/:id', updateTask);

// Delete a task DELETE /api/tasks/delete/:id
router.delete('/tasks/delete/:id', deleteTask);

module.exports = router;
