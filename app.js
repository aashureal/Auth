require("module-alias/register");
require("dotenv").config();
const express = require("express");
const connectDB = require("@config/db");
const cookieParser = require("cookie-parser");

connectDB(); // Database Connection

const app = express();

// EJS Setup
app.set("view engine", "ejs");

// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.redirect("/account");
});

app.listen(3000);
