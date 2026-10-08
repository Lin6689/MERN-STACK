const express = require('express');
const Category = require('../models/category');
const { auth, isAdmin } = require("../middleware/auth");

const router = express.Router();

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.log("GET /categories ERROR →", error);
    res.status(500).json({
      message: "Category fetching failed",
      error: error.message,
    });
  }
});

// CREATE category
router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log("POST /categories ERROR →", error);
    res.status(500).json({
      message: "Category creation failed",
      error: error.message,
    });
  }
});

// UPDATE category
router.put("/:id", auth, isAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE category
router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;