const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: 'https://authapp-frontend-beige.vercel.app/', // your actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/authRoute");

app.use("/api/v1/users", userRoutes);

module.exports = app;