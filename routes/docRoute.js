// routes/documentRoutes.js
const express = require('express');
const { deleteDocument, addDocument, getDocumentById, getUserDocuments } = require('../controllers/docController');
const router = express.Router();

router.post('/documents', addDocument);
router.get('/documents/:id', getDocumentById);
router.get('/document/:email', getUserDocuments);
router.delete('/documents/:id', deleteDocument); 

module.exports = router;
