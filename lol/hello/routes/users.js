var express = require('express');
var router = express.Router();


  const fruits = [
  { id: 1, fruit: "Lemon", category: "Citrus", sournessLevel: 9, color: "Yellow" },
  { id: 2, fruit: "Lime", category: "Citrus", sournessLevel: 9, color: "Green" },
  { id: 3, fruit: "Cranberry", category: "Berry", sournessLevel: 8, color: "Red" },
  { id: 4, fruit: "Rhubarb", category: "Vegetable/Fruit", sournessLevel: 9, color: "Red/Pink" },
  { id: 5, fruit: "Green Apple", category: "Pome", sournessLevel: 6, color: "Green" },
  { id: 6, fruit: "Grapefruit", category: "Citrus", sournessLevel: 7, color: "Pink/Yellow" },
  { id: 7, fruit: "Tamarind", category: "Tropical", sournessLevel: 8, color: "Brown" },
  { id: 8, fruit: "Kumquat", category: "Citrus", sournessLevel: 7, color: "Orange" },
  { id: 9, fruit: "Sour Cherry", category: "Stone Fruit", sournessLevel: 7, color: "Red" },
  { id: 10, fruit: "Passion Fruit", category: "Tropical", sournessLevel: 6, color: "Purple" },
  { id: 11, fruit: "Gooseberry", category: "Berry", sournessLevel: 8, color: "Green" },
  { id: 12, fruit: "Red Currant", category: "Berry", sournessLevel: 8, color: "Red" },
  { id: 13, fruit: "Black Currant", category: "Berry", sournessLevel: 7, color: "Black" },
  { id: 14, fruit: "Yuzu", category: "Citrus", sournessLevel: 8, color: "Yellow" },
  { id: 15, fruit: "Calamansi", category: "Citrus", sournessLevel: 9, color: "Green/Yellow" },
  { id: 16, fruit: "Pomelo", category: "Citrus", sournessLevel: 5, color: "Yellow/Green" },
  { id: 17, fruit: "Starfruit (Unripe)", category: "Tropical", sournessLevel: 7, color: "Green" },
  { id: 18, fruit: "Bitter Melon", category: "Gourd/Fruit", sournessLevel: 6, color: "Green" },
  { id: 19, fruit: "Unripe Mango", category: "Tropical", sournessLevel: 8, color: "Green" },
  { id: 20, fruit: "Unripe Papaya", category: "Tropical", sournessLevel: 7, color: "Green" },
  { id: 21, fruit: "Seville Orange", category: "Citrus", sournessLevel: 8, color: "Orange" },
  { id: 22, fruit: "Finger Lime", category: "Citrus", sournessLevel: 9, color: "Green/Pink" },
  { id: 23, fruit: "Blood Orange", category: "Citrus", sournessLevel: 5, color: "Deep Red" },
  { id: 24, fruit: "Raspberry (Tart)", category: "Berry", sournessLevel: 6, color: "Red" },
  { id: 25, fruit: "Quince", category: "Pome", sournessLevel: 7, color: "Yellow" },
  { id: 26, fruit: "Pineapple (Tart)", category: "Tropical", sournessLevel: 6, color: "Yellow" }
];


router.get('/', function(req, res, next) {
  res.json(fruits);
});


router.post('/', (req, res) => {
  const newFruits = req.body;
  res.status(201).json({ Message : " fruits added", data : newFruits});

     res.json(fruits);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const fruit = fruits.find((std) => std.id === id);
  
  if(!fruit) return  res.status(404).json({ Message : "fruits not found"});

  res.json(fruit);
})

router.put('/:id', (req, res) => {
  const index = fruits.findIndex((std) => std.id === Number(req.params.id));
  if(index === -1 ) return res.status(404).json({ message : "fruits not found"});

  fruits[index] = {...fruits[index], ...req.body};

  res.json(fruits);
})


module.exports = router;
