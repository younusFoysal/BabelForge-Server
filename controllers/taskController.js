const { getTasksCollection } = require('../models/taskModel');
const { ObjectId } = require('mongodb');

// Get all tasks
const getAllTasks = async (req, res) => {
    const db = req.app.locals.db;
    const tasksCollection = getTasksCollection(db);
    const tasks = await tasksCollection.find().toArray();
    res.send(tasks);
};

// Get task details by ID
const getTaskDetails = async (req, res) => {
    const db = req.app.locals.db;
    const tasksCollection = getTasksCollection(db);
    const taskId = req.params.id;

    try {
        const task = await tasksCollection.findOne({ _id: new ObjectId(taskId) });
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send(task);
    } catch (error) {
        return res.status(400).send({ message: 'Invalid Task ID format' });
    }
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
    const taskId = req.params.id;
    const updatedTask = req.body;
    const tasksCollection = getTasksCollection(db);

    const result = await tasksCollection.updateOne({ _id: new ObjectId(taskId) }, { $set: updatedTask });
    res.send(result);
};

// Delete a task
const deleteTask = async (req, res) => {
    const db = req.app.locals.db;
    const taskId = req.params.id;
    const tasksCollection = getTasksCollection(db);

    const result = await tasksCollection.deleteOne({ _id: new ObjectId(taskId) });
    res.send(result);
};

module.exports = { getAllTasks, getTaskDetails, addTask, updateTask, deleteTask };
