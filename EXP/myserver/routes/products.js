var express = require("express");
var router = express.Router();


const products = 
[
  { "id": 1, "name": "Wireless Ergonomic Mouse", "category": "Electronics", "price": 29.99, "stock": 142 },
  { "id": 2, "name": "Mechanical Gaming Keyboard", "category": "Electronics", "price": 79.99, "stock": 85 },
  { "id": 3, "name": "Ultra-Wide 34-inch Monitor", "category": "Electronics", "price": 399.99, "stock": 30 },
  { "id": 4, "name": "Noise-Canceling Headphones", "category": "Electronics", "price": 149.99, "stock": 64 },
  { "id": 5, "name": "USB-C Multi-Port Hub", "category": "Accessories", "price": 24.99, "stock": 210 },
  { "id": 6, "name": "1080p Webcam with Microphone", "category": "Electronics", "price": 59.99, "stock": 95 },
  { "id": 7, "name": "External Solid State Drive 1TB", "category": "Storage", "price": 89.99, "stock": 120 },
  { "id": 8, "name": "Adjustable Laptop Stand", "category": "Accessories", "price": 34.99, "stock": 150 },
  { "id": 9, "name": "Bluetooth Desk Speaker", "category": "Audio", "price": 45.00, "stock": 78 },
  { "id": 10, "name": "LED Desk Lamp with USB Charger", "category": "Office", "price": 39.99, "stock": 110 },
  { "id": 11, "name": "Standing Desk Converter", "category": "Office", "price": 189.99, "stock": 25 },
  { "id": 12, "name": "Memory Foam Seat Cushion", "category": "Office", "price": 29.99, "stock": 160 },
  { "id": 13, "name": "Large Extended Mouse Pad", "category": "Accessories", "price": 15.99, "stock": 300 },
  { "id": 14, "name": "Smart Wi-Fi Plug (4-Pack)", "category": "Smart Home", "price": 39.99, "stock": 90 },
  { "id": 15, "name": "Smart LED Strip Lights 10m", "category": "Smart Home", "price": 27.99, "stock": 135 },
  { "id": 16, "name": "Portable Power Bank 20000mAh", "category": "Electronics", "price": 49.99, "stock": 115 },
  { "id": 17, "name": "Wireless Charging Pad", "category": "Accessories", "price": 19.99, "stock": 220 },
  { "id": 18, "name": "Cat 6 Ethernet Cable 50ft", "category": "Networking", "price": 16.99, "stock": 180 },
  { "id": 19, "name": "Wi-Fi 6 Mesh Router System", "category": "Networking", "price": 229.99, "stock": 40 },
  { "id": 20, "name": "Insulated Stainless Steel Water Bottle", "category": "Lifestyle", "price": 22.99, "stock": 250 },
  { "id": 21, "name": "Minimalist Leather Backpack", "category": "Lifestyle", "price": 69.99, "stock": 55 },
  { "id": 22, "name": "Daily Planner Notebook", "category": "Stationery", "price": 14.99, "stock": 190 },
  { "id": 23, "name": "Gel Ink Pens (12-Pack)", "category": "Stationery", "price": 9.99, "stock": 400 },
  { "id": 24, "name": "Reusable Cable Management Ties", "category": "Accessories", "price": 7.99, "stock": 500 },
  { "id": 25, "name": "Microfiber Cleaning Cloths (6-Pack)", "category": "Accessories", "price": 11.99, "stock": 320 },
  { "id": 26, "name": "Compact Air Purifier", "category": "Home", "price": 79.99, "stock": 45 },
  { "id": 27, "name": "Digital Kitchen Food Scale", "category": "Home", "price": 18.99, "stock": 130 },
  { "id": 28, "name": "Electric Coffee Mug Warmer", "category": "Home", "price": 21.99, "stock": 95 },
  { "id": 29, "name": "Fitness Activity Tracker Band", "category": "Electronics", "price": 39.99, "stock": 110 },
  { "id": 30, "name": "Privacy Screen Protector for Laptop", "category": "Accessories", "price": 25.99, "stock": 140 }
]


router.get("/", (req, res, next) => {
    res.json(products)
});

router.post("/", (req, res) => {
    const newProducts = req.body;
    res.status(404).json({Messaage : "product not found", product : newProducts});
});

router.put("/:id", (req, res) => {
    const index = products.findIndex((pdc) => pdc.id === (req.params.id) );
    if(index === -1) res.status(404).json({Messagee : "product not found"});

    products[index] = { ...products[index], ...req.body };
    res.json({Messaage : "products updated" , updated : products[index]});
});



module.exports = router;