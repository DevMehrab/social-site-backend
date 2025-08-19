const mongoose = require("mongoose");
const colors = require("colors");
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected with mongodb".bgGreen.bold);
  } catch (error) {
    console.log(`MongoDB error: ${error} `.bgRed);
  }
}
module.exports = connectDB;
