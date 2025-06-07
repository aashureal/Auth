const express = require("express");
const router = express.Router();

// Render Profile Page
router.get("/", async (req, res) => {
  res.render("account");
});

module.exports = router;
