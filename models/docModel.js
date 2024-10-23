const { ObjectId } = require('mongodb');

const getDocumentCollection = (db) => {
  return db.collection("documents");
};

const createDocument = async (db, { content, email }) => {
    const documentsCollection = getDocumentsCollection(db);
    
    return documentsCollection.insertOne({ content, email });
};

module.exports = { getDocumentCollection, createDocument };
