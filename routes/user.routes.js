// ALL USER ROUTES PREFIXED WITH /user

const router = require("express").Router();

//User profile

router.get("/:username", (req, res, next) => {
  try {
    res.render("user-profile");
  } catch (error) {
    next(error);
  }
});

//Favourites
router.get("/:username/favorites", (req, res, next) => {
  try {
    res.render("favorites");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
