const express = require("express");
const Product = require("../models/product");
const Category = require("../models/category");
const upload = require("../middleware/upload");
const router = express.Router();

// seed 3 products
router.get("/seed", async (req, res) => {
  await Product.deleteMany({});
  await Category.deleteMany({});

  const cat = await Category.create({ title: "Fashion" });

  await Product.insertMany([
    {
    title: "White Shirt",
    price: 999,
    description: "Cotton shirt",
    image: "https://picsum.photos/id/1011/400/300",
  },
  {
    title: "Black Jeans",
    price: 1499,
    description: "Slim jeans",
    image: "https://picsum.photos/id/1015/400/300",
  },
  {
    title: "Sneakers",
    price: 1999,
    description: "Casual shoes",
    image: "https://picsum.photos/id/103/400/300",
  },
 {
    title: "Cap",
    price: 499,
    description: "Cotton baseball cap",
    image: "https://picsum.photos/id/201/400/300",
  },
  ]);

  res.json({ message: "Seeded successfully" });
});

router.get("/", async (req, res) => {
  const products = await Product.find().populate("category", "title");
  res.json(products);
});
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const product = await Product.create({
      title: req.body.title,
      price: Number(req.body.price) || 0,
      description: req.body.description || "",
      image: req.file ? `http://localhost:3000/uploads/${req.file.filename}` : "",
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
}); 
// delete
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;