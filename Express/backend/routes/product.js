const express = require('express');
const Product = require('../models/product');
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const router = express.Router();


// ===================== SEED (sample products) =====================
router.get('/seed', async (req, res) => {
  try {
    const Category = require('../models/category'); // make sure this model exists

    // 1) Clear old data
    await Product.deleteMany({});
    await Category.deleteMany({});

    // 2) Create categories
    const categories = await Category.insertMany([
  { title: "Shirts" },
  { title: "Pants" },
  { title: "Jackets" },
  { title: "Shoes" },
  { title: "Accessories" },
  { title: "T-Shirts" },
  { title: "Watches" },
  { title: "Bags" },
  { title: "Winter Wear" },
  { title: "Sports" },
  { title: "furnic" },
  { title: "bas" },
  { title: "summer cap" },
  
]);
    // helper to find category id by title
    const cat = (name) => categories.find((c) => c.title === name)._id;

    // 3) Products with categories
    const sampleProducts = [
      {
        title: "Classic White Shirt",
        price: 1299,
        description: "Premium cotton formal shirt",
        category: cat("Shirts"),
        images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600" }],
      },
     
      {
        title: "Oversized Hoodie",
        price: 1599,
        description: "Soft fleece oversized hoodie",
        category: cat("Jackets"),
        images: [{ url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600" }],
      },
      {
        title: "Leather Sneakers",
        price: 2499,
        description: "Minimal white leather sneakers",
        category: cat("Shoes"),
        images: [{ url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600" }],
      },
      {
        title: "Wool Blend Coat",
        price: 3999,
        description: "Warm elegant winter coat",
        category: cat("Jackets"),
        images: [{ url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600" }],
      },
      {
        title: "Casual T-Shirt",
        price: 799,
        description: "Soft cotton everyday t-shirt",
        category: cat("T-Shirts"),
        images: [{ url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600" }],
      },
      {
        title: "Denim Jacket",
        price: 2299,
        description: "Classic blue denim jacket",
        category: cat("Jackets"),
        images: [{ url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600" }],
      },
      {
        title: "Chino Pants",
        price: 1499,
        description: "Comfortable slim chino pants",
        category: cat("Pants"),
        images: [{ url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600" }],
      },
      {
        title: "Knit Sweater",
        price: 1799,
        description: "Soft knitted winter sweater",
        category: cat("Jackets"),
        images: [{ url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600" }],
      },
      {
        title: "Running Shoes",
        price: 2799,
        description: "Lightweight performance running shoes",
        category: cat("Shoes"),
        images: [{ url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" }],
      },
      {
        title: "Linen Shirt",
        price: 1399,
        description: "Breathable summer linen shirt",
        category: cat("Shirts"),
        images: [{ url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600" }],
      },
      {
        title: "Cargo Pants",
        price: 1699,
        description: "Utility style cargo pants",
        category: cat("Pants"),
        images: [{ url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600" }],
      },
      {
        title: "Bomber Jacket",
        price: 2599,
        description: "Stylish bomber jacket",
        category: cat("Jackets"),
        images: [{ url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600" }],
      },
      {
        title: "Polo T-Shirt",
        price: 999,
        description: "Classic fitted polo t-shirt",
        category: cat("T-Shirts"),
        images: [{ url: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600" }],
      },
      {
        title: "Formal Trousers",
        price: 1599,
        description: "Office wear formal trousers",
        category: cat("Pants"),
        images: [{ url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600" }],
      },
      {
        title: "Canvas Backpack",
        price: 1899,
        description: "Durable everyday canvas backpack",
        category: cat("Accessories"),
        images: [{ url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600" }],
      },
      {
        title: "Leather Belt",
        price: 899,
        description: "Genuine leather formal belt",
        category: cat("Accessories"),
        images: [{ url: "https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=600" }],
      },
      {
        title: "Sunglasses",
        price: 1299,
        description: "UV protected stylish sunglasses",
        category: cat("Accessories"),
        images: [{ url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600" }],
      },
      {
        title: "Wrist Watch",
        price: 3499,
        description: "Minimal analog wrist watch",
        category: cat("Accessories"),
        images: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" }],
      },
      {
        title: "Baseball Cap",
        price: 699,
        description: "Adjustable cotton baseball cap",
        category: cat("Accessories"),
        images: [{ url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600" }],
      },
      {
        title: "Chelsea Boots",
        price: 2999,
        description: "Leather chelsea boots",
        category: cat("Shoes"),
        images: [{ url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600" }],
      },
      {
        title: "Flannel Shirt",
        price: 1499,
        description: "Warm checked flannel shirt",
        category: cat("Shirts"),
        images: [{ url: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600" }],
      },
      {
        title: "Track Pants",
        price: 1199,
        description: "Comfortable athletic track pants",
        category: cat("Pants"),
        images: [{ url: "https://images.unsplash.com/photo-1506629082955-511b1aa78283?w=600" }],
      },
      {
        title: "Graphic T-Shirt",
        price: 899,
        description: "Printed graphic cotton t-shirt",
        category: cat("T-Shirts"),
        images: [{ url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600" }],
      },
      {
        title: "Windbreaker",
        price: 2199,
        description: "Lightweight weather resistant jacket",
        category: cat("Jackets"),
        images: [{ url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600" }],
      },
      {
        title: "Oxford Shoes",
        price: 3299,
        description: "Classic formal oxford shoes",
        category: cat("Shoes"),
        images: [{ url: "https://images.unsplash.com/photo-1614252231338-798d7d0b5613?w=600" }],
      },
      {
        title: "Crewneck Sweatshirt",
        price: 1399,
        description: "Soft crewneck sweatshirt",
        category: cat("Jackets"),
        images: [{ url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600" }],
      },
      {
        title: "Relaxed Fit Shorts",
        price: 999,
        description: "Comfortable summer shorts",
        category: cat("Pants"),
        images: [{ url: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600" }],
      },
      {
        title: "Quilted Jacket",
        price: 2799,
        description: "Lightweight quilted jacket",
        category: cat("Jackets"),
        images: [{ url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600" }],
      },
      {
        title: "Merino Wool Scarf",
        price: 1099,
        description: "Soft merino wool scarf",
        category: cat("Accessories"),
        images: [{ url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600" }],
      },
      {
        title: "High Top Sneakers",
        price: 2399,
        description: "Casual high top sneakers",
        category: cat("Shoes"),
        images: [{ url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600" }],
      },
      {
        title: "Structured Blazer",
        price: 3599,
        description: "Tailored formal blazer",
        category: cat("Jackets"),
        images: [{ url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600" }],
      },
    ];

    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);

    res.json({
      success: true,
      message: `${sampleProducts.length} products added successfully`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===================== GET ALL PRODUCTS =====================
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'title');
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log("GET /product ERROR →", error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

// ===================== CREATE PRODUCT (Multer + Cloudinary) =====================
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log("BODY →", req.body);
    console.log("FILE →", req.file);

    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    let imageData = [];

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products',
      });

      imageData.push({
        url: result.secure_url,
        public_id: result.public_id,
      }); 

      fs.unlinkSync(req.file.path);
    }

    const product = await Product.create({
      title: req.body.title,
      price: Number(req.body.price) || 0,
      description: req.body.description || "",
      category: req.body.category || undefined,
      images: imageData,
    });

    const populatedProduct = await Product.findById(product._id).populate('category', 'title');

    res.status(201).json({
      message: "Product Created Successfully",
      product: populatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Product Creation failed",
      error: error.message,
    });
  }
});
// ===================== GET SINGLE PRODUCT =====================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.status(200).json({
      message: "Product fetched Successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Product fetching failed",
      error: error.message,
    });
  }
});

// ===================== UPDATE PRODUCT =====================
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Product updated Successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Product update failed",
      error: error.message,
    });
  }
});

// ===================== DELETE PRODUCT =====================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product deleted Successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Product delete failed",
      error: error.message,
    });
  }
});

module.exports = router;