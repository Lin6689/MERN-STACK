var express = require('express');
var router = express.Router();


const spiders = [
  {
    id: 1,
    name: "jung te haa",
    password: "98982kgchavanu",
  }, 
   {
    id: 2,
    name: "jung te haa",
    password: "98982kgchavanu",
  },
  {
    id: 3,
    name: "jung te haa",
    password: "98982kgchavanu",
  },
  {
    id: 4,
    name: "jung te haa",
    password: "98982kgchavanu",
  },
  {
    id: 5,
    name: "jung te haa",
    password: "98982kgchavanu",
  },

]


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(spiders);
});
router.post("/", (req, res) => {
  const newSpiders = req.body;
  res.status(201).json({ message: "Student created", data: newSpiders });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const spider = spiders.find((spd) => spd.id === id);

  

})

module.exports = router;
