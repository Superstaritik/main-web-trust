const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const register = async (req, res) => {
  try {
    const { firstName, emailId, password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);
    console.log("Data being saved:", req.body);

    const user = await User.create(req.body);
    const reply = {
      firstName: user.firstName,
      emailId: user.emailId,
      _id: user._id,
    };
    const token = jwt.sign(
      { _id: user._id, emailId: user.emailId },
      process.env.JWT_KEY,
      { expiresIn: 3600 }
    );
    res.cookie("token", token, { maxAge: 3600 * 1000 });
    res.status(201).json({
      user: reply,
      message: "User Register Succefully",
    });
  } catch (err) {
    res.status(400).send("Error occured 1: " + err);
  }
};

const login = async (req, res) => {
  try {

    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const reply = {
      firstName: user.firstName,
      emailId: user.emailId,
      _id: user._id,
    };

    const token = jwt.sign(
      { _id: user._id, emailId: user.emailId },
      process.env.JWT_KEY,
      { expiresIn: 3600 }
    );

    res.cookie("token", token, { maxAge: 3600 * 1000, httpOnly: true });

    res.status(200).json({
      user: reply,
      message: "Login Successfully",
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {login,register};