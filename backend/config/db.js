const mongoose = require("mongoose");

const connectDB = async () => {
  const fs = require('fs');
  const logFile = require('path').join(__dirname, '../backend_debug.log');

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] MongoDB Connected Successfully\n`);
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] MongoDB Connection Error: ${err.message}\n`);
    process.exit(1);
  }
};

module.exports = connectDB;
