const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, (req, res) => {
  res.json({
    message: "This is your profile",
    user: req.user,
  });
});

module.exports = router;
