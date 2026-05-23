require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

let isConnected = false;

async function connectDatabase() {

    if (isConnected) return;

    await connectDB();

    isConnected = true;
}

module.exports = async (req, res) => {

    try {

        await connectDatabase();

        return app(req, res);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};