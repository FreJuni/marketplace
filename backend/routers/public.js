const express = require("express");
const publicController = require("../controllers/public");

const router = express.Router();

// get all products
router.get("/products",publicController.getAllProducts )

// get product by filter
router.get("/products/filter",publicController.getProductByFilter)

// get product details
router.get("/details/:productId", publicController.productDetail)

// get all approve products
router.get("/approve-products", publicController.getApproveProduct)




module.exports = router;
