const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/css", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/blogs/css.html"));
});

router.get("/html", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/html.html"));
});

module.exports = router;
