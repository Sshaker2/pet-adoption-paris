module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.session.currentUser) {
    let redirectMessage;
    if (req.originalUrl === "/pets/add") {
      redirectMessage = "Please Login to add a Pet";
    }
    return res.render("auth/login", { redirectMessage, title: 'Add a Pet', style: ['layout.css', 'login.css'] });
  }

  next();
};
