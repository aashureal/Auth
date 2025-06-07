require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

connectDB(); // Database Connection

const app = express();

// EJS Setup
app.set("view engine", "ejs");

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hey");
});

// Routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/account", require("./routes/account.routes"));

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
