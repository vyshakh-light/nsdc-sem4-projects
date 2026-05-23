//import express and other dependencies
const express = require('express');
require("dotenv").config();
const app = require('./app');
const connectDB = require('./config/db');
//connect to database
connectDB();
//middlewares to parse JSON (redundant if already in app.js, keeping app.js as source of truth for middleware)
// app.use(express.json());

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});