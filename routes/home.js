const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("GENRES BITCH");
});

module.exports = router;
