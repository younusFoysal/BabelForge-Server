// services/documentService.js
const { ObjectId } = require("mongodb");
const { getDocumentCollection, createDocument } = require("../models/docModel");

const addDocumentService = async (db, { content, email }) => {
    const documentCollection = getDocumentCollection(db);
    
    const documentData = {
        email,
        createdAt: new Date(),
    };
    
    return documentCollection.insertOne(documentData); 
};
const getDocumentByIdService = async (db, id) => {
  const documentCollection = getDocumentCollection(db);
  return documentCollection.findOne({ _id: new ObjectId(id) });
};

const updateDocumentService = async (db, id, updatedData) => {
  const documentCollection = db.collection('documents');
  return await documentCollection.updateOne(
      { _id: new ObjectId(id) }, 
      { $set: updatedData } 
  );
};

const deleteDocumentService = async (db, id) => {
    const documentCollection = getDocumentCollection(db);
    return documentCollection.deleteOne({ _id: new ObjectId(id) });
  };

module.exports = { addDocumentService, getDocumentByIdService, deleteDocumentService, updateDocumentService };
