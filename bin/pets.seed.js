//clear the db
//create my user
// get the user id
// map over the cats and add the user id to every cat
//insert the cat into the db
const Pet = require("./../models/Pet.model")
const pets = require("./../pets.json")
const User = require("./../models/User.model")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Favorite = require("../models/Favorite.model")
const Session = require("../models/Session.model")
require("dotenv").config()
require("../db")



const superUser = {
    username: "admin",
    email: "admin@admin.com",
    password: process.env.SUPERUSER_PW,
    phoneNumber: "6705944853",
}

seed()

async function createUser() {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(superUser.password, salt)
    superUser.password = hashedPassword
    const newUser = await User.create(superUser)
    const userId = newUser._id
    const petsWithId = pets.map(ele => {
        ele.listedBy = userId
        return ele
    })
    return petsWithId
}


async function seed() {
    await clearDatabase()
    const petsWithId = await createUser()
    console.log(petsWithId)
    const allPets = await Pet.create(petsWithId)
    console.log(`created ${allPets.length}`)
    mongoose.disconnect()
}


async function clearDatabase() {
    await Pet.deleteMany()
    await User.deleteMany()
    await Favorite.deleteMany()
    await Session.deleteMany()
}
