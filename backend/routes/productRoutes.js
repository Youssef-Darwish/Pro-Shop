const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
} = require("../controllers/productController");

router.route("/").get(getProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .post(protect, admin, createProduct)
  .put(protect, admin, updateProduct);
module.exports = router;
