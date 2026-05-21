const mongoose = require('mongoose');
require("dotenv").config();
//connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("MongoDB connection error:", error.message);
        console.warn("Server will continue running without database connection");
    }
};

module.exports = connectDB;