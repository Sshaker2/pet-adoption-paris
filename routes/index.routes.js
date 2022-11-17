const express = require("express");
const router = express.Router();

router.use("/pets", require("./pet.routes"));

router.use("/user", require("./user.routes"));



/* GET home page */
router.get("/", (req, res, next) => {
  // req.session.showRedirectMsg = false;
  res.render("home", { title: "Rescue Me", style: ["layout.css", "home.css"] });
});

//About Page
router.get("/about", (req, res, next) => {
  res.render("about", { title: "About", style: ["layout.css", "about.css"] });
});

module.exports = router;
