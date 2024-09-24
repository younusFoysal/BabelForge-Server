// controllers/taskController.js
const { getTasksCollection } = require('../models/taskModel');

// Get all tasks
const getAllTasks = async (req, res) => {
    const db = req.app.locals.db;
    const tasksCollection = getTasksCollection(db);
    const tasks = await tasksCollection.find().toArray();
    res.send(tasks);
};

// Add a new task
const addTask = async (req, res) => {
    const db = req.app.locals.db;
    const task = req.body;
    const tasksCollection = getTasksCollection(db);

    const result = await tasksCollection.insertOne(task);
    res.status(201).send(result);
};

// Update a task
const updateTask = async (req, res) => {
    const db = req.app.locals.db;
    const taskId = req.params.id; // Get task ID from URL
    const updatedTask = req.body;
    const tasksCollection = getTasksCollection(db);

    const result = await tasksCollection.updateOne({ _id: new ObjectId(taskId) }, { $set: updatedTask });
    res.send(result);
};

// Delete a task
const deleteTask = async (req, res) => {
    const db = req.app.locals.db;
    const taskId = req.params.id; // Get task ID from URL
    const tasksCollection = getTasksCollection(db);

    const result = await tasksCollection.deleteOne({ _id: new ObjectId(taskId) });
    res.send(result);
};

module.exports = { getAllTasks, addTask, updateTask, deleteTask };
