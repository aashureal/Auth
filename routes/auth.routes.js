const express = require("express");
const { registerUser } = require("../controllers/auth.controller");
const router = express.Router();

// Render Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

// Handle Register
router.post("/register", registerUser);

module.exports = router;
