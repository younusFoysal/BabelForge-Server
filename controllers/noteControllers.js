const { ObjectId } = require('mongodb');
const { getNoteCollection } = require('../models/noteModel');


// Get all notes.
const getAllNotes = async (req, res) => {
    const db = req.app.locals.db;
    const noteCollection = getNoteCollection(db);
    const result = await noteCollection.find().toArray();
    res.send(result);
};


// Create a note
const createNote = async (req, res) => {
    const db = req.app.locals.db;
    const noteCollection = getNoteCollection(db);
    const data = req.body;
    const result = await noteCollection.insertOne(data);
    res.send(result);
};

// Update note
const updateNote = async (req, res) => {
    const db = req.app.locals.db;
    const noteId = req.params.id;
    const noteCollection = getNoteCollection(db);

    const { email, title, details, category, date } = req.body;

    const query = { _id: new ObjectId(noteId) };

    const update = {
        $set: {
            ...(email !== undefined && { email }),
            ...(title !== undefined && { title }),
            ...(details !== undefined && { details }),
            ...(category !== undefined && { category }),
            ...(date !== undefined && { date })
        }
    };

    try {
        const result = await noteCollection.updateOne(query, update);
        if (result.matchedCount === 0) {
            return res.status(404).send({ message: "Note not found" });
        }
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
};

// Delete note
const deleteNote = async (req, res) => {
    const db = req.app.locals.db;
    const noteCollection = getNoteCollection(db);
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await noteCollection.deleteOne(query);
    res.send(result);
};

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
};
