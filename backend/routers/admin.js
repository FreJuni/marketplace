const express = require("express");
const adminController = require("../controllers/admin");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/isAdmin");

const router = express.Router();

// get all product
// GET admin/products
router.get(
  "/products",
  authMiddleware,
  adminMiddleware,
  adminController.getAllProducts
);

// product approved
//POST
router.post(
  "/product-approve/:id",
  authMiddleware,
  adminMiddleware,
  adminController.approveProduct
);

// product reject
// POST
router.post(
  "/product-reject/:id",
  authMiddleware,
  adminMiddleware,
  adminController.rejectProduct
);

// product roll back
// POST
router.post(
  "/product-rollback/:id",
  authMiddleware,
  adminMiddleware,
  adminController.rollBackProduct
);

// get user list
// GET
router.get("/users", authMiddleware, adminMiddleware, adminController.getUsers);

// ban user
// POST
router.post(
  "/users-ban/:id",
  authMiddleware,
  adminMiddleware,
  adminController.banUser
);

// unBan user
// POST
router.post(
  "/users-unban/:id",
  authMiddleware,
  adminMiddleware,
  adminController.unbanUser
);

module.exports = router;
