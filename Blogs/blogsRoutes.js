const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/css", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/Blogs/CSS.html"));
});

// THIS CODE BELOW IS HAVING WRONG PATH DUE TO THE CASE SENSITIVITY IN LINUX MAYBE 
// router.get("/css", (req, res) => {
//   res.sendFile(path.join(__dirname, "../views/Blogs/CSS.html"));
// }); 

module.exports = router;
