const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin, verifyHost } = require('../middleware/auth');
const {
    createJwtToken,
    logout,
    createPaymentIntent,
    updateUserProfile,
    getUser,
    getAllUsers
} = require('../controllers/userController');

router.post('/jwt', createJwtToken);
router.get('/logout', logout);
router.post('/create-payment-intent', verifyToken, createPaymentIntent);
router.put('/user', updateUserProfile);
router.get('/user/:email', getUser);
router.get('/users', getAllUsers);
router.patch('/users/update/:email', verifyToken, updateUserProfile);

module.exports = router;
