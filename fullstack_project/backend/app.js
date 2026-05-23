const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const userRoutes = require("./routes/authRoute");

app.use(cors({
    origin: "https://nsdc-sem4-projects-t1fc-6racxqxl5-vyshakh-s-projects.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/v1/users", userRoutes);

app.use((err, req, res, next) => {
  console.error('APP_ERROR', err);
  res.status(500).json({ message: 'Server error' });
});

module.exports = app;