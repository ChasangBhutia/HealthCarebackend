const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const generateToken = require("../utils/generateToken");

module.exports.createUser = async (req, res) => {
  const { fullname, email, password, role } = req.body;
  if (!fullname || !email || !password || !role)
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  try {
    let user = await userModel.findOne({ email });
    if (user)
      return res
        .status(409)
        .json({ success: false, error: "User already exists! Please Login" });
    const hash = await bcrypt.hash(password, 10);
    let newUser = await userModel.create({
      fullname,
      email,
      password: hash,
      role,
    });
    let token = generateToken(newUser.email, newUser._id, newUser.role);
    res.cookie("token", token);
    return res
      .status(201)
      .json({ success: true, message: "User Created.", newUser });
  } catch (err) {
    console.log(`Error Creating user: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Error Creating User" });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, error: "User do not exist! Please Signup." });
    let result = await bcrypt.compare(password, user.password);
    if (!result)
      return res.status(400).json({ success: false, error: "Password wrong!" });
    let token = generateToken(user.email, user._id, user.role);
    res.cookie("token", token);
    return res
      .status(200)
      .json({ success: true, message: "User Logged In.", user });
  } catch (err) {
    console.log(`Error Logging: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Somthing went wrong!" });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "Logged out." });
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res
      .status(200)
      .json({ success: true, message: "Users found", users });
  } catch (err) {
    console.error(`Error fetching users: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};
