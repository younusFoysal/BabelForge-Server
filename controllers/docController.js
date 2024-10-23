// controllers/documentController.js
const { ObjectId } = require('mongodb');
const { addDocumentService, getDocumentByIdService, updateDocumentService, deleteDocumentService } = require("../services/docService");
const { getDocumentCollection } = require('../models/docModel');

const addDocument = async (req, res) => {
    const db = req.app.locals.db;
    const { email } = req.body; 
    const data = {title: "Untitled Document", content:"", email };
    
    const result = await addDocumentService(db, data); 
    res.send({ docId: result.insertedId });
};

const getUserDocuments = async (req, res) => {
    const db = req.app.locals.db;
    const {email} = req.params; 
    
    try {
        const documentCollection = getDocumentCollection(db);
        const documents = await documentCollection.find({ email }).toArray(); 
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
  const db = req.app.locals.db;
  const { id } = req.params; 
  const { title, content, email } = req.body;
  
    
  try {
      const document = await getDocumentByIdService(db, id); 
      if (!document) {
          return res.status(404).json({ message: "Document not found" });
      }

      if (document.email !== email) {
          return res.status(403).json({ message: "Unauthorized to update this document" });
      }

      const updatedData = { title, content };
      const result = await updateDocumentService(db, id, updatedData); 

      if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Document not found" });
      }

      res.status(200).json({ message: "Document updated successfully" });
  } catch (error) {
      console.error("Error updating document:", error);
      res.status(500).json({ message: "Failed to update document", error });
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
