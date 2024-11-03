const express = require("express");
const router = express.Router();

const {
  updateUserProfile,
  getUser,
  getAllUsers,
  UpdatePackage,
} = require("../controllers/userController");

router.put("/user", updateUserProfile);
router.get("/user/:email", getUser);
router.get("/users", getAllUsers);
router.patch("/users/update/:email", updateUserProfile);
router.put("/users/update/:email", UpdatePackage);

module.exports = router;
