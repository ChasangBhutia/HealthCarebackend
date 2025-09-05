const jwt = require("jsonwebtoken");

const generateToken = (email, id, role) => {
  return jwt.sign({ email, id, role }, process.env.JWT_SECRET_KEY);
};

module.exports = generateToken;
