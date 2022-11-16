// ALL USER ROUTES PREFIXED WITH /user

const router = require("express").Router();
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const Favorite = require("../models/Favorite.model");

//User profile

router.get("/profile", isLoggedIn, async (req, res, next) => {
  const loggedUser = req.session.currentUser
  console.log(loggedUser)
  try {
    const foundUser = await User.findOne({
      username: loggedUser.username})
      const foundPet = await Pet.find({ listedBy: foundUser.id });
      res.render("user-profile", { foundUser, foundPet, title: foundUser.username, style: ['layout.css', 'user-profile.css'] });
  } catch (error) {
    next(error)
  }
})



//Favourites
router.get("/profile/favorites", async(req, res, next) => {
  try {
    const favorites = await Favorite.find({user: req.session.currentUser._id}).populate('favoritedPet')
    res.render("favorites", { title: `Favorites of ${req.session.currentUser.username}`, style: ['layout.css', 'favorites.css'], favorites});
  } catch (error) {
    next(error);
  }
});

router.post('/profile/favorites/:id/add', async(req,res,next) => {
  try {
    const { id } = req.params
    const favQ = {favoritedPet: id, user: req.session.currentUser._id}

    console.log(id, favQ)
    const newFav = await Favorite.findOneAndUpdate(favQ, favQ, { upsert: true})
     
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.post('/profile/favorites/:id/remove', async(req,res,next) => {
  try {
    const { id } = req.params
    await Favorite.findOneAndRemove({favoritedPet: id, user: req.session.currentUser._id})
   
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

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


module.exports = router;
