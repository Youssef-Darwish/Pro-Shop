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

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProduct);
module.exports = router;
