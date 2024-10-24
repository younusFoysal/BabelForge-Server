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

// Get my tasks

const getMyTasks = async (req, res) => {
  const db = req.app.locals.db;
  const tasksCollection = getTasksCollection(db);
  const email = req.params.email;
  const query = {
    $or: [{ author: email }, { tassignTo: email }],
  };

  try {
    const result = await tasksCollection.find(query).toArray();

    if (result.length === 0) {
      return res.status(404).send({ message: 'No tasks found for the given email' });
    }
    // console.log(result);
    res.send(result);
  } catch (error) {
    return res.status(500).send({ message: 'Error retrieving tasks' });
  }
};

// Helper function to convert the date and time
// function convertToDateTime(dateStr, timeStr) {
//     const [year, month, day] = dateStr.split('-').map(Number);
//     let [hour, minute] = timeStr.split(':').map(Number);
//     const period = timeStr.slice(-2); // AM or PM

//     // Convert 12-hour format to 24-hour format
//     if (period === 'PM' && hour !== 12) hour += 12;
//     if (period === 'AM' && hour === 12) hour = 0;

//     return new Date(year, month - 1, day, hour, minute); // monthIndex is 0-based
// }

// Get tasks for calendar event
const getEvents = async (req, res) => {
  const db = req.app.locals.db;
  const tasksCollection = getTasksCollection(db);
  const email = req.params.email;
  const query = {
    $or: [{ author: email }, { tassignTo: email }],
  };

  try {
    const result = await tasksCollection.find(query).toArray();

    if (result.length === 0) {
      return res.status(404).send({ message: 'No tasks found for the given email' });
    }
    // console.log("events: ", result);
    const events = result.map(task => ({
      title: task?.tname,
      start: task?.tdate,
      end: task?.tdate,
      description: task?.tdes,
      status: task?.tproces,
      author: task?.author,
      allDay: true,
    }));
    res.send(events);
  } catch (error) {
    return res.status(500).send({ message: 'Error retrieving tasks' });
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

module.exports = { getAllTasks, getTaskDetails, addTask, updateTask, deleteTask, getMyTasks, getEvents };
