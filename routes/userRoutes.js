const express = require("express");
const router = express.Router();

const {
  updateUserProfile,
  getUser,
  getAllUsers,
  UpdatePackage,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

router.put("/user", verifyToken, updateUserProfile);
router.get("/user/:email", verifyToken, getUser);
router.get("/users", verifyToken, getAllUsers);
router.patch("/users/update/:email", verifyToken, updateUserProfile);
router.put("/users/update/:email", verifyToken, UpdatePackage);

module.exports = router;
