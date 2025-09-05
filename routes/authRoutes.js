const express = require("express");
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");
const {
  createUser,
  loginUser,
  logout,
  getAllUsers,
} = require("../controllers/authControllers");
const router = express.Router();

// POST /api/auth/register/ - Register a new user with name, email, and password.
router.post("/register", createUser);

// POST /api/auth/login/ - Log in a user and return a JWT token.
router.post("/login", loginUser);

// logout /api/auth/logout for logging put the user
router.post("/logout", logout);

// get all users /api/auth/users for getting all users
router.get("/users", isLoggedIn, isAdmin, getAllUsers);

module.exports = router;
