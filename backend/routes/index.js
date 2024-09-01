const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  resetPassword,
} = require("../controllers/user");

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/resetpassword", resetPassword);
router.post("/getusers", getAllUsers);

module.exports = { router };
