const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  try {
    if (isConnected) {
      return;
    }

    const MONGO_URI = process.env.MONGO_URI;
    const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "assignment2";

    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    const connect = await mongoose.connect(MONGO_URI, {
      dbName: MONGO_DB_NAME
    });

    isConnected = true;

    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.log("MongoDB connection error:", err.message);
    throw err;
  }
};

module.exports = connectDB;
