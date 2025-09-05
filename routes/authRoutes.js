const express = require("express");
const {
  createUser,
  loginUser,
  logout,
} = require("../controllers/authControllers");
const router = express.Router();

// POST /api/auth/register/ - Register a new user with name, email, and password.
router.post("/register", createUser);

// POST /api/auth/login/ - Log in a user and return a JWT token.
router.post("/login", loginUser);

// logout /api/auth/logout for logging put the user
router.post("/logout", logout);

module.exports = router;
