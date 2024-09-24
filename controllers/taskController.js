// controllers/taskController.js
const { getTasksCollection } = require('../models/taskModel');
const {ObjectId} = require("mongodb");

// Get all tasks
const getAllTasks = async (req, res) => {
    const db = req.app.locals.db;
    const tasksCollection = getTasksCollection(db);
    const tasks = await tasksCollection.find().toArray();
    //console.log(tasks)
    res.send(tasks);
};

// Add a new task
const addTask = async (req, res) => {
    const db = req.app.locals.db;
    const task = req.body;
    //console.log(task)
    const tasksCollection = getTasksCollection(db);

    const result = await tasksCollection.insertOne(task);
    res.status(201).send(result);
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const taskId = req.params.id;

        if (!ObjectId.isValid(taskId)) {
            return res.status(400).send({ error: "Invalid task ID" });
        }

        const updatedTask = req.body;
        //console.log(taskId, ObjectId, updatedTask)
        const tasksCollection = getTasksCollection(db);

        const result = await tasksCollection.updateOne(
            { _id: new ObjectId(taskId) },
            { $set: updatedTask }
        );
        //console.log(result)
        res.send(result);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send({ error: "An error occurred while updating the task" });
    }
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
