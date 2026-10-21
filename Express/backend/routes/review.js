const express = require("express");
const Review = require("../models/review");
const router = express.Router();


// all reviews
router.get("/", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

// one product reviews
router.get("/:productId", async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).sort({
    createdAt: -1,
  });
  res.json(reviews);
});
// get reviews for one product
router.get("/:productId", async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).sort({
    createdAt: -1,
  });
  res.json(reviews);
});

// add review
router.post("/", async (req, res) => {
  const { product, rating, comment, userName } = req.body;

  if (!product || !rating || !comment) {
    return res.status(400).json({ message: "All fields required" });
  }

  const review = await Review.create({
    product,
    rating,
    comment,
    userName: userName || "User",
  });

  res.status(201).json(review);
});

module.exports = router;