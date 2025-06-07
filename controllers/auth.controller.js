const User = require("../models/User");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES || "7d",
      }
    );

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect after successful registration
    res.redirect("/account");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.loginUser = (req, res) => {};

module.exports.resetUser = (req, res) => {};
