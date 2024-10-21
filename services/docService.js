// services/documentService.js
const { ObjectId } = require("mongodb");
const { getDocumentCollection } = require("../models/docModel");

const addDocumentService = async (db, document) => {
  const documentCollection = getDocumentCollection(db);
  return documentCollection.insertOne(document);
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
