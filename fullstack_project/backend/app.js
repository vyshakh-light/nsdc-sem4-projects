const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/authRoute");

app.use("/api/v1/users", userRoutes);

module.exports = app;