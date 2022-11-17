// ALL PET ROUTES PREFIXED WITH /pets

const isLoggedIn = require("../middleware/isLoggedIn");

const uploader = require("../config/cloudinary");

const isOwner = require("../middleware/isOwner");
const Favorite = require("../models/Favorite.model");

const Pet = require("../models/Pet.model");

const router = require("express").Router();

//Adopt Page

router.get("/", async (req, res, next) => {
  try {
    const allPets = await Pet.find({ adopted: false });
    const userFavs = await Favorite.find({
      user: req.session.currentUser?._id,
    });

    userFavs.forEach((fav) => {
      allPets.find(
        (pet) => pet.id === fav.favoritedPet.toString()
      ).faved = true;
    });
    res.render("pets", {
      allPets,
      script: ["pets.js"],
      title: "Pets",
      style: ["layout.css", "pets.css"],
    });
  } catch (error) {
    next(error);
  }
});

//Individual Pet Page
//Pets already adopted
router.get("/adopted", async (req, res, next) => {
  try {
    const adoptedPets = await Pet.find({ adopted: true });
    res.render("already-adopted", {
      adoptedPets,
      title: "Already Adopted",
      style: ["layout.css", "already-adopted.css"],
    });
  } catch (error) {
    next(error);
  }
});
// router.use(isLoggedIn)

//Add a Pet
router.get("/add", isLoggedIn, (req, res, next) => {
  try {
    res.render("add-pet", {
      title: "Add a Pet",
      style: ["layout.css", "add-pet.css"],
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const onePet = await Pet.findById(id).populate("listedBy");

    if (req.session.currentUser?.username === onePet.listedBy.username) {
      return res.render("one-pet", {
        onePet,
        script: ["one-pet.js"],
        title: onePet.name,
        style: ["layout.css", "one-pet.css"],
        isOwner: true,
      });
    }
    res.render("one-pet", {
      onePet,
      script: true,
      title: onePet.name,
      style: ["layout.css", "one-pet.css"],
    });
  } catch (error) {
    next(error);
  }
});

//Edit pet route
//we want to render the add pet but with the prefilled form of details of the pet

router.get("/:id/edit", isLoggedIn, isOwner, async (req, res, next) => {
  try {
    const { id } = req.params;
    const editPet = await Pet.findById(id);
    // const canEdit = editPet.listedBy.id === currentUser.id
    res.render("edit-pet", {
      editPet,
      title: `Edit ${editPet.name}`,
      style: ["layout.css", "edit-pet.css"],
    });
  } catch (error) {
    next(error);
  }
});

router.post("/add", uploader.single("picture"), async (req, res, next) => {
  const {
    name,
    // image,
    petType,
    sex,
    age,
    breed,
    vaccinated,
    neutered,
    chipped,
    description,
  } = req.body;
  const listedBy = req.session.currentUser;

  try {
    const newPet = await Pet.create({
      name,
      image: req.file.path,
      petType,
      sex,
      age,
      breed,
      vaccinated,
      neutered,
      chipped,
      description,
      adopted: false,
      listedBy,
    });

    res.redirect(`/pets/${newPet.id}`);
  } catch (error) {
    next(error);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const { deleteReason } = req.body;
    const { id } = req.params;

    if (deleteReason === "alreadyAdopted") {
      await Pet.findByIdAndUpdate(id, { adopted: true });
      res.redirect("/pets/adopted");
    } else {
      await Pet.findByIdAndRemove(id);
      res.redirect("/user/profile");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  console.log("HIIII");
  const { id } = req.params;
  try {
    const updatePet = await Pet.findByIdAndUpdate(id, req.body, { new: true });
    res.redirect(`/pets/${id}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
