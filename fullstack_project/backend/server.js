require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

let isConnected = false;

const connectDatabase = async () => {

    if (isConnected) return;

    await connectDB();

    isConnected = true;
};

module.exports = async (req, res) => {

    try {

        await connectDatabase();

        return app(req, res);

    } catch (error) {

        console.error("SERVER ERROR:", error);

        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};