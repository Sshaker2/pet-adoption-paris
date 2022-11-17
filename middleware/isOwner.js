const Pet = require("../models/Pet.model");

module.exports = async (req, res, next) => {
    const id = req.params.id
    const foundPet = await Pet.findById(id)
    if (foundPet.listedBy.toString() === req.session.currentUser._id.toString()) {
      return next();
    } else {
        res.redirect(`/pets/${id}`)
    }
  };
