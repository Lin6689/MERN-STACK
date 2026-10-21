const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/product");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Place order
router.post("/", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.body.product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const qty = Number(req.body.quantity) || 1;

    if (product.stock < qty) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    product.stock = product.stock - qty;
    await product.save();

    const order = await Order.create({
      ...req.body,
      user: req.user.userId,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// My orders
router.get("/my", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate("product", "title price images image")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Single order
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "product",
      "title price images image"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;