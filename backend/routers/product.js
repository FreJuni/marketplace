const express = require("express");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const productController = require("../controllers/product");
const bidController = require("../controllers/bid");
const notifactionController = require("../controllers/notification");

const router = express.Router();

// add product
router.post(
  "/create-product",
  authMiddleware,
  [
    body("name").notEmpty().trim().withMessage("product name must contain"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("product description must contain"),
    body("price").notEmpty().trim().withMessage("product price must contain"),
    body("usedFor")
      .notEmpty()
      .trim()
      .withMessage("product usedFor must contain"),
    body("category")
      .notEmpty()
      .trim()
      .withMessage("product category must contain"),
    body("details")
      .isArray([""])
      .withMessage("product details must be arrayed."),
  ],
  productController.addNewProduct
);

// get all products
router.get("/products", authMiddleware, productController.getAllProducts);

// get old product
router.get("/product/:id", authMiddleware, productController.getOldProduct);

// post update product
router.post(
  "/update-product/:id",
  authMiddleware,
  [
    body("name").notEmpty().trim().withMessage("product name must contain"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("product description must contain"),
    body("price").notEmpty().trim().withMessage("product price must contain"),
    body("usedFor")
      .notEmpty()
      .trim()
      .withMessage("product usedFor must contain"),
    body("category")
      .notEmpty()
      .trim()
      .withMessage("product category must contain"),
    body("details")
      .isArray([""])
      .withMessage("product details must be arrayed."),
  ],
  productController.updateProduct
);

//delete product
router.post(
  "/delete-product/:id",
  authMiddleware,
  productController.deleteProduct
);

// upload product images
router.post("/upload", authMiddleware, productController.uploadProductImages);

// get saved product images
router.get(
  "/product-images/:id",
  authMiddleware,
  productController.getSavedProductImages
);

// delete product image
// DELETE /products/images/destroy/:productId/:imgToDelete
router.delete(
  "/products/images/destroy/:productId/:imgToDelete",
  authMiddleware,
  productController.deleteProductImages
);

// saved products
router.post("/save-products/:id",authMiddleware,productController.savedProducts);

// get save products
router.get("/save-products",authMiddleware,productController.getSavedProducts);

// unsave products
router.post("/unsave-products/:productId",authMiddleware,productController.unSavedProducts);

// save new bid
router.post("/add-bid",authMiddleware, [
  body("text").isLength({min : 3}).trim().withMessage("Message must atleast 3 charactor."),
  body("phone_number")
    .trim()
    .isLength({min : 11})
    .withMessage("Phone number must contain."),
],authMiddleware,bidController.saveNewBid);

// get all bids
router.get("/get-bid/:product_id",bidController.getAllBids);

// push notify
router.post("/notify/",authMiddleware,notifactionController.pushNotification);

// get all notification
router.get("/notification",authMiddleware,notifactionController.getAllNotification);

// get all pending proudct
router.get("/pending-products",productController.pendingProducts);

// read noti
router.post("/read-noti/:id",authMiddleware,notifactionController.readNotification);

// delete noti
router.delete("/delete-noti/:id",authMiddleware,notifactionController.deleteNotification);

// delete all noti
router.delete("/delete-all-noti",authMiddleware,notifactionController.deleteAllNotification);

module.exports = router;
