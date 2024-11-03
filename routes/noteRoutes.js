const express = require("express");
const {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
  getMyNotes,
} = require("../controllers/noteControllers");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

// Get all notes.
router.get("/notes", getAllNotes);

// Get my notes
router.get("/notes/my-notes/:email", getMyNotes);

// Create a note
router.post("/notes", createNote);

// Update a note
router.patch("/notes/update/:id", verifyToken, updateNote);

// Delete a note
router.delete("/notes/:id", verifyToken, deleteNote);

module.exports = router;
