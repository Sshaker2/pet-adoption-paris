// ALL USER ROUTES PREFIXED WITH /user

const router = require("express").Router();
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");

//User profile

router.get("/:username", async (req, res, next) => {
  const { username } = req.params;

  try {
    const foundUser = await User.findOne({ username: username });
    const foundPet = await Pet.find({ listedBy: foundUser.id });
    console.log(foundPet);

    res.render("user-profile", { foundUser, foundPet });
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
