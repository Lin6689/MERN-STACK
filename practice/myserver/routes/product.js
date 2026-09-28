var express = require('express');
var router = express.Router();

const products = [
  { id: 1, name: "IMLY", category: "Food & Beverages", price: 150, inStock: true },
  { id: 2, name: "Kiwi", category: "Fresh Fruits", price: 80, inStock: true },
  { id: 3, name: "Avagandu", category: "Groceries", price: 250, inStock: false },
  { id: 4, name: "Wireless Mouse", category: "Electronics", price: 799, inStock: true },
  { id: 5, name: "Mechanical Keyboard", category: "Electronics", price: 2499, inStock: true },
  { id: 6, name: "Bluetooth Speaker", category: "Electronics", price: 1299, inStock: true },
  { id: 7, name: "Green Tea Bags", category: "Food & Beverages", price: 350, inStock: true },
  { id: 8, name: "Organic Honey", category: "Groceries", price: 499, inStock: false },
  { id: 9, name: "Running Shoes", category: "Footwear", price: 2999, inStock: true },
  { id: 10, name: "Cotton T-Shirt", category: "Apparel", price: 699, inStock: true },
  { id: 11, name: "Stainless Steel Water Bottle", category: "Home & Kitchen", price: 599, inStock: true },
  { id: 12, name: "Notebook", category: "Stationery", price: 120, inStock: true },
  { id: 13, name: "Gel Pens (Pack of 5)", category: "Stationery", price: 150, inStock: false },
  { id: 14, name: "Desk Lamp", category: "Home & Kitchen", price: 899, inStock: true },
  { id: 15, name: "Yoga Mat", category: "Fitness", price: 999, inStock: true }
];

/* GET users listing. */

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params; 
    const product = await Product.findById(id);
    res.status(200).json ({
      Message : "product fetched succesfully", data : product,
    });
  } catch(error) {
    console.log(error);
    res.status(500).json({
      message: "Product fetching failed",
      error: error.message,
    });
  }
})



module.exports = router;
