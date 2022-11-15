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
    res.render("user-profile", { foundUser, foundPet, title: foundUser.username, style: ['layout.css', 'user-profile.css'] });
  } catch (error) {
    next(error);
  }
});

//Favourites
router.get("/:username/favorites", (req, res, next) => {
  const { username } = req.params
  try {
    res.render("favorites", { title: `Favorites of ${username}`, style: ['layout.css', 'favorites.css']});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
