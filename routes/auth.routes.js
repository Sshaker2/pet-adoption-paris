const express = require("express");
const router = express.Router();
const uploader = require("../config/cloudinary");

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// GET /auth/signup
router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup", { title: 'Sign Up', style: ['layout.css', 'signup.css']});
});

// GET /auth/login
router.get("/login", isLoggedOut, (req, res) => {
  // const { showRedirectMsg } = req.session;
  res.render("auth/login", { title: 'Login', style: ['layout.css', 'login.css']});
});

// POST /auth/signup
router.post("/signup", uploader.single("picture"), (req, res, next) => {
  const { username, password, email, phoneNumber } = req.body;

  // Check that username, email, and password are provided
  if (
    username === "" ||
    email === "" ||
    password === "" ||
    phoneNumber === ""
  ) {
    res.status(400).render("auth/signup", {
      errorMessage:
        "All fields are mandatory. Please provide your username, email , password and phone number.",
        title: 'Sign Up', style: ['layout.css', 'signup.css']
    });

    return;
  }

  //   ! This regular expression checks password for special characters and minimum length

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(400).render("auth/signup", {
      errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
      title: 'Sign Up',
      style: ['layout.css', 'signup.css'],
    });
    return;
  }

  // Create a new user - start by hashing the password
  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      // Create a user and save it in the database
      return User.create({
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        profilePic: req.file?.path,
      });
    })
    .then((user) => {
      res.redirect("/auth/login");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", {
          errorMessage: error.message,
          title: 'Sign Up',
          style: ['layout.css', 'signup.css'],
        });
      } else if (error.code === 11000) {
        res.status(500).render("auth/signup", {
          errorMessage: "Username and email need to be unique. Provide a valid username or email.",
          title: 'Sign Up',
          style: ['layout.css', 'signup.css'],
        });
      } else {
        next(error);
      }
    });
});

// POST /auth/login
router.post("/login", isLoggedOut, (req, res, next) => {
  const { username, password } = req.body;

  // Check that username, email, and password are provided
  if (username === "" || password === "") {
    res.status(400).render("auth/login", {
      errorMessage: "All fields are mandatory. Please provide username, email and password.",
      title: 'Log In',
      style: ['layout.css', 'login.css'],
    });
    return;
  }

  // Search the database for a user with the email submitted in the form
  User.findOne({ username })
    .then((user) => {
      // If the user isn't found, send an error message that user provided wrong credentials
      if (!user) {
        res.status(400).render("auth/login", {
          errorMessage: "Wrong credentials.",
          title: 'Log In',
          style: ['layout.css', 'login.css'],
        });
        return;
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt
        .compare(password, user.password)
        .then((isSamePassword) => {
          if (!isSamePassword) {
            res.status(400).render("auth/login", {
              errorMessage: "Wrong credentials.",
              title: 'Log In',
              style: ['layout.css', 'login.css'],
            });
            return;
          }

          // Add the user object to the session object
          req.session.currentUser = user.toObject();
          // Remove the password field
          delete req.session.currentUser.password;
          res.redirect("/");
        })
        .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
    })
    .catch((err) => next(err));
});

// GET /auth/logout
router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("auth/logout", { errorMessage: err.message });
      return;
    }

    res.redirect("/");
  });
});

module.exports = router;
