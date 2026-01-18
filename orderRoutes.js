const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");

const { validateBody } = require("../middleware/validateMiddleware");
const { createOrderSchema, updateOrderSchema } = require("../middleware/orderValidation");

const router = express.Router();

router.post("/", validateBody(createOrderSchema), createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", validateBody(updateOrderSchema), updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
