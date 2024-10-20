const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getAllTasks, getTaskDetails, addTask, updateTask, deleteTask, getMyTasks } = require('../controllers/taskController');

// Get all tasks
router.get('/tasks', getAllTasks);

// Get task details by ID
router.get('/tasks/:id', getTaskDetails);

// Get my tasks
router.get('/tasks/my-tasks/:email', getMyTasks);

// Add a new task
router.post('/tasks/add', addTask);

// Update a task
router.patch('/tasks/update/:id', updateTask);

// Delete a task
router.delete('/tasks/delete/:id', deleteTask);

module.exports = router;
