// ALL PET ROUTES PREFIXED WITH /pets

const router = require("express").Router();

//Adopt Page

router.get("/", (req, res, next) => {
  try {
    res.render("pets");
  } catch (error) {
    next(error);
  }
});

//Individual Pet Page

router.get("/:petId", (req, res, next) => {
  try {
    res.render("one-pet");
  } catch (error) {
    next(error);
  }
});

//Pets already adopted
router.get("/adopted", (req, res, next) => {
  try {
    res.render("already-adopted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
