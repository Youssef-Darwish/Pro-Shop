const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getOrders,
} = require("../controllers/orderController");

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
module.exports = router;
