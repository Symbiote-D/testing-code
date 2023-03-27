let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

//create the user model instance
let userModel = require("../models/user");
let User = userModel.User; //alias

//home page
module.exports.displayHomepage = (req, res, next) => {
  res.render("home", { title: "Home Page" });
};

//about page
module.exports.displayAboutpage = (req, res, next) => {
  res.render("about", { title: "About Me Page" });
};

//projects
module.exports.displayProductspage = (req, res, next) => {
  res.render("projects", { title: "Projects Page" });
};

//services
module.exports.displayServicespage = (req, res, next) => {
  res.render("services", { title: "Services Page" });
};

//tournament
module.exports.displayTournamentpage = (req, res, next) => {
  res.render("tournament", { title: "Tournament Page" });
};

//login
module.exports.displayLoginPage = (req, res, next) => {
  // check if the user is already logged in
  if (!req.user) {
    res.render("auth/login", {
      title: "Login Page",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

// login authentication
module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server err?
    if (err) {
      return next(err);
    }
    // is there a user login error?
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      // server error?
      if (err) {
        return next(err);
      }
      const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });

      return res.redirect("/tournament-list");
    });
  })(req, res, next);
};

//register
module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is not already logged in
  if (!req.user) {
    res.render("auth/register", {
      title: "Register Page",
      messages: req.flash("registerMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

//Register authentication
module.exports.processRegisterPage = (req, res, next) => {
  // instantiate a user object
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName,
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Registration Error: User Already Exists!"
        );
        console.log("Error: User Already Exists!");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : "",
      });
    } else {
      // if no error exists, then registration is successful

      // redirect the user and authenticate them

      return passport.authenticate("local")(req, res, () => {
        res.redirect("/tournament-list");
      });
    }
  });
};


//execute Logout
module.exports.performLogout = (req, res, next) => {
  req.logout(function(err){
    if(err) {
        return next(err);
    }
    res.redirect('/');
});
};
