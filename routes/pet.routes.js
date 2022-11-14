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
//Pets already adopted
router.get("/adopted", (req, res, next) => {
  try {
    console.log("hello")
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

//Edit pet route
//we want to render the add pet but with the prefilled form of details of the pet

router.get('/:id/edit', async(req, res, next) => {
  try {
    const { id } = req.params;
    const editPet = await Pet.findById(id)

    // const canEdit = editPet.listedBy.id === currentUser.id
    res.render("edit-pet", { editPet })
  } catch (error) {
    next(error)
  }
})

router.get('/:id/delete', async(req, res, next) => {
  try {
    const { id } = req.params
    const deletePet = await Pet.findById(id)
    res.render('delete-reason')
  } catch (error) {
    next(error)
  }
})

// router.post('/:id/delete', async(req, res, next) => {
//   try {
    
//   } catch (error) {
//     next(error)
//   }
// })


router.post('/add', async (req, res, next) => {
  console.log(req.body)
    const {
    name,
    image,
    petType,
    sex,
    age,
    breed,
    vaccinated,
    neutered,
    chipped,
    description,
  } = req.body;
  // .listedBy = session.currentUser 
  try {
    const newPet = await Pet.create({
      name,
      image,
      petType,
      sex,
      age,
      breed,
      vaccinated,
      neutered,
      chipped,
      description,
      listedBy: session.currentUser
    });
    res.redirect(`/pets/${newPet._id}`);
  } catch (error) {
    next(error)
  }
})

router.post('/:id/edit', async (req, res, next) => {
  const { id } = req.params
  try {
    const updatePet = await Pet.findByIdAndUpdate(id, req.body, { new: true})
    res.redirect(`/pets/${id}`)
  } catch (error) {
    next(error)
  }
})


module.exports = router;
