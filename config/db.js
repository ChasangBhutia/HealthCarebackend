const mongoose = require("mongoose");

const connectDB = async () => {
  const URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(URI);
    console.log("Database Connected successfully.");
  } catch (err) {
    console.log(`Error connecting mongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
