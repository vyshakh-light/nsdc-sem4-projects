require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

let isConnected = false;

async function connectDatabase() {
    if (isConnected) return;
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URL exists:", !!process.env.MONGO_URL);
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
    await connectDB();
    isConnected = true;
    console.log("MongoDB connected successfully");
}

module.exports = async (req, res) => {
    try {
        console.log("Request received:", req.method, req.url);
        await connectDatabase();
        return app(req, res);
    } catch (error) {
        console.error("CRASH ERROR:", error.message);
        console.error("STACK:", error.stack);
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
            stack: error.stack
        });
    }
};