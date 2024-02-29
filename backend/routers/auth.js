const express = require("express");
const authController = require("../controllers/auth");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// create user
router.post(
  "/register",
  body("name")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Name must be atleast 5 charactor."),
  body("email").trim().isEmail().withMessage("Please enter a valid email."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 charactor."),
  authController.registerAccount
);

// login user
router.post(
  "/login",
  body("email").trim().isEmail().withMessage("Please enter a valid email."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 charactor."),
  authController.loginAccount
);

// check user or not user
router.get(
  "/get-current-user",
  authMiddleware,
  authController.checkCurrentUser
);

module.exports = router;
