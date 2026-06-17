const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  try {
    if (isConnected) {
      return;
    }

    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    const connect = await mongoose.connect(MONGO_URI);

    isConnected = true;

    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.log("MongoDB connection error:", err.message);
    throw err;
  }
};

module.exports = connectDB;