const express = require('express');
const Category = require('../models/category');

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
router.post('/', async (req, res) => {
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

module.exports = router;