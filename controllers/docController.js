// controllers/documentController.js
const { ObjectId } = require('mongodb');
const { addDocumentService, getDocumentByIdService } = require("../services/docService");
const { getDocumentCollection } = require('../models/docModel');

const addDocument = async (req, res) => {
    const db = req.app.locals.db;
    const { content, email } = req.body; // Get content and email from request body
    const data = { content, email };
    
    const result = await addDocumentService(db, data); // Pass email to service
    res.send({ docId: result.insertedId }); // Return the document ID
};

const getUserDocuments = async (req, res) => {
    const db = req.app.locals.db;
    const {email} = req.params; 
    
    try {
        const documentCollection = getDocumentCollection(db);
        const documents = await documentCollection.find({ email }).toArray(); // Fetch documents for the email
        res.send(documents);
    } catch (error) {
        console.error("Error fetching user documents:", error);
        res.status(500).send("Internal Server Error");
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

    res.status(200).json({ content: document });
  } catch (error) {
    console.error("Error retrieving document:", error);
    res.status(500).json({ message: "Failed to retrieve document", error });
  }
};

const updateDocument = async (req, res) => {
    const { id } = req.params;
    const { content, email } = req.body;

    try {
        const document = await Document.findById(id);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Check if the email matches the owner of the document
        if (document.email !== email) {
            return res.status(403).json({ error: 'You do not have permission to edit this document' });
        }

        // Update the document content
        document.content = content;

        await document.save();

        res.status(200).json({ message: 'Document updated successfully', document });
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ error: 'An error occurred while updating the document' });
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

module.exports = { addDocument, getDocumentById, deleteDocument, getUserDocuments, updateDocument };
