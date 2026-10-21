const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const router = express.Router();

router.get("/dashboard", auth, role("admin"), (req, res) => {
  res.json({ message: "Welcome Admin Dashboard" });
});

module.exports = router;