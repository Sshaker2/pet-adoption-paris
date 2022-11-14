// ALL PET ROUTES PREFIXED WITH /pets

const { findById } = require("../models/Pet.model");
const Pet = require("../models/Pet.model");

const router = require("express").Router();

//Adopt Page

router.get("/", async (req, res, next) => {
  try {
    const allPets = await Pet.find();
    res.render("pets", { allPets });
  } catch (error) {
    next(error);
  }
});

//Individual Pet Page

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  try {
    const onePet = await Pet.findById(id);
    res.render("one-pet", { onePet });
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

//Add a Pet
router.get("/add", (req, res, next) => {
  try {
    res.render("add-pet");
  } catch (error) {
    next(error);
  }
});

// router.post("/", async (req, res, next) => {
//   const {
//     name,
//     images,
//     petType,
//     sex,
//     age,
//     breed,
//     vaccinated,
//     neutered,
//     chipped,
//     description,
//   } = req.body;
//   try {
//     const newPet = await Pet.create({
//       name,
//       images,
//       petType,
//       sex,
//       age,
//       breed,
//       vaccinated,
//       neutered,
//       chipped,
//       description,
//     });
//     res.redirect(`/pets/${newPet._id}`);
//   } catch (error) {}
// });

module.exports = router;
