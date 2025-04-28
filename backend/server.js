require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware to handle Cors

app.use(
  cosr({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DEŞETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server runNing on port ${PORT}`));
