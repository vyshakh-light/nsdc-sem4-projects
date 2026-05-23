const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const userRoutes = require("./routes/authRoute");

app.use(cors());
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