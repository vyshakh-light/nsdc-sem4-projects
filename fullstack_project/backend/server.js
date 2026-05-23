//import express and other dependencies
const express = require('express');
require("dotenv").config();

const app = require('./app');
const connectDB = require('./config/db');

//connect to database
connectDB();

//export app for Vercel
module.exports = app;