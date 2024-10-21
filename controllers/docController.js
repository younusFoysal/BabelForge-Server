// controllers/documentController.js
const { ObjectId } = require('mongodb');
const { addDocumentService, getDocumentByIdService } = require("../services/docService");

const addDocument = async (req, res) => {
  const db = req.app.locals.db;
  const documentContent = req.body.content;

  try {
    const newDocument = {
      content: documentContent,
      createdAt: new Date(),
    };

    const result = await addDocumentService(db, newDocument);
    res.status(201).json({ message: "Document saved successfully", docId: result.insertedId });
  } catch (error) {
    console.error("Error saving document:", error);
    res.status(500).json({ message: "Failed to save document", error });
  }
};

const getDocumentById = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    const document = await getDocumentByIdService(db, id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({ content: document.content });
  } catch (error) {
    console.error("Error retrieving document:", error);
    res.status(500).json({ message: "Failed to retrieve document", error });
  }
};

const deleteDocument = async (req, res) => {
    const db = req.app.locals.db;
    const { id } = req.params;
  
    try {
      const result = await deleteDocumentService(db, id);
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      res.status(200).json({ message: "Document deleted successfully" });
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ message: "Failed to delete document", error });
    }
  };

module.exports = { addDocument, getDocumentById, deleteDocument };
