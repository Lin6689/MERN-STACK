var express = require("express");
var router = express.Router();

const students = [
  {
    id: 1,
    name: "Aarav Sharma",
    age: 10,
    grade: "10th",
    email: "aarav.sharma@example.com",
  },
  {
    id: 2,
    name: "Mia Johnson",
    age: 11,
    grade: "11th",
    email: "mia.johnson@example.com",
  },
  {
    id: 3,
    name: "Liam Williams",
    age: 12,
    grade: "12th",
    email: "liam.williams@example.com",
  },
  {
    id: 4,
    name: "Sophia Brown",
    age: 10,
    grade: "10th",
    email: "sophia.brown@example.com",
  },
  {
    id: 5,
    name: "Noah Jones",
    age: 11,
    grade: "11th",
    email: "noah.jones@example.com",
  },
  {
    id: 6,
    name: "Isabella Garcia",
    age: 12,
    grade: "12th",
    email: "isabella.garcia@example.com",
  },
  {
    id: 7,
    name: "Elijah Miller",
    age: 10,
    grade: "10th",
    email: "elijah.miller@example.com",
  },
  {
    id: 8,
    name: "Neha Joshi",
    age: 14,
    grade: "8th",
    email: "neha.joshi@example.com",
  },
  {
    id: 9,
    name: "Vikram Rao",
    age: 18,
    grade: "12th",
    email: "vikram.rao@example.com",
  },
  {
    id: 10,
    name: "Tanya Kapoor",
    age: 13,
    grade: "10th",
    email: "tanya.kapoor@example.com",
  },
];

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.json(students);
});

router.post("/", (req, res) => {
  const newStudent = req.body;
  res.status(201).json({ message: "Student created", data: newStudent });
});

// get student by id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((std) => std.id === id);

  if (!student) return res.status(404).json({ message: "Student not found" });

  res.json(student);
});

// dynamic routes with params
router.get("/email/:emailId", function (req, res, next) {
  const { emailId } = req.params;
  const filterdStudent = students.filter((stu) => stu.email === emailId);
  res.json(filterdStudent);
});

// DELETE by ID
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = students.findIndex((std) => std.id === id);
  if (index === -1)
    return res.status(404).json({ message: "Student not found" });

  const deleted = students.splice(index, 1);

  res.json({
    message: "Student deleted",
    deleted: deleted[0],
    remaining: students,
  });
});

// DELETE by email
router.delete("/by-email/:emailId", (req, res) => {
  const { emailId } = req.params;

  const remaining = students.filter((stu) => stu.email !== emailId);

  res.json({
    message: "Student deleted by email",
    remaining,
  });
});

//PUT
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = students.findIndex((std) => std.id === id);
  if (index === -1)
    return res.status(404).json({ message: "Student not found" });

  const updatedData = req.body;

  students[index] = { ...students[index], ...updatedData };

  res.json({
    message: "Student updated successfully",
    data: students[index],
  });
});

module.exports = router;