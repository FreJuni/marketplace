const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerAccount = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(400)
      .json({ isSucess: false, message: error.array()[0].msg });
  }
  const { name, email, password } = req.body;

  try {
    // check email already exist
    const userDoc = await User.findOne({ email: email });
    if (userDoc) {
      throw new Error("Email already exist.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    await User.create({
      name,
      email,
      password: hashPass,
    });

    return res.status(201).json({ isSucess: true, message: "User created." });
  } catch (err) {
    return res.status(409).json({ isSucess: false, message: err.message });
  }
};

exports.loginAccount = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(400)
      .json({ isSucess: false, message: error.array()[0].msg });
  }
  const { email, password } = req.body;

  try {
    // is email exist
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      throw new Error("E-mail doesn't exist.");
    }

    // account status check
    if (userDoc.status === "banned") {
      throw new Error("This account has been banned.");
    }

    // check password
    const checkPass = await bcrypt.compare(password, userDoc.password);
    if (!checkPass) {
      throw new Error("Please enter a valid information.");
    }

    // create jwt token
    const token = jwt.sign({ userId: userDoc._id }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });
    return res
      .status(201)
      .json({ token: token, isSucess: true, message: "Login Successful." });
  } catch (error) {
    res.status(401).json({ isSucess: false, message: error.message });
  }
};

exports.checkCurrentUser = async (req, res) => {
  try {
    const userDoc = await User.findById(req.userId).select("name email role");
    if (!userDoc) {
      throw new Error("Not authenticated.");
    }
    res
      .status(200)
      .json({ isSuccess: true, message: "Authenticated User.", userDoc });
  } catch (error) {
    res.status(401).json({ isSucess: false, message: error.message });
  }
};
