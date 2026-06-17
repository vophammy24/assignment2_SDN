const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = process.env.URI;

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(MONGO_URI);

        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (err) {
        console.log("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;