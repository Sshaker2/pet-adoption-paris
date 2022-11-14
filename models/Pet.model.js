const { Schema, model } = require("mongoose");

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  petType: {
    type: String,
    enum: ["cat", "dog"],
    required: true,
  },
  sex: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  vaccinated: {
    type: String,
    enum: ["yes", "no"],
    required: true,
  },
  neutered: {
    type: String,
    enum: ["yes", "no"],
    required: true,
  },
  chipped: {
    type: String,
    enum: ["yes", "no"],
    required: true,
  },
  description: {
    type: String,
  },
  adopted: {
    type: Boolean,
  },
  listedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
