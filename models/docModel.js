const { ObjectId } = require('mongodb');

const getDocumentCollection = (db) => {
  return db.collection("documents");
};

module.exports = { getDocumentCollection };
