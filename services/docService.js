// services/documentService.js
const { ObjectId } = require("mongodb");
const { getDocumentCollection, createDocument } = require("../models/docModel");

const addDocumentService = async (db, { content, email }) => {
    const documentCollection = getDocumentCollection(db);
    
    const documentData = {
        content,
        email: email,
        createdAt: new Date(),
    };
    
    return documentCollection.insertOne(documentData); 
};
const getDocumentByIdService = async (db, id) => {
  const documentCollection = getDocumentCollection(db);
  return documentCollection.findOne({ _id: new ObjectId(id) });
};

const deleteDocumentService = async (db, id) => {
    const documentCollection = getDocumentCollection(db);
    return documentCollection.deleteOne({ _id: new ObjectId(id) });
  };

module.exports = { addDocumentService, getDocumentByIdService, deleteDocumentService };
