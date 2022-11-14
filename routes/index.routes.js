const express = require("express");
const router = express.Router();

router.use("/pets", require("./pet.routes"));
// router.use("/user", require("./user.routes"));
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("home");
});

//About Page
router.get("/about", (req, res, next) => {
  res.render("about");
});

module.exports = router;
