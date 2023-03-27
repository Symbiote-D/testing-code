/*<!--Name: Deshaun Jordan
Student Id: 300921366
Course: COMP_229 web dev sec 401
Instructor: Thiago Castilho 
Assignment: A2
*/  

let express = require('express');
let router = express.Router();
let mongoose = require("mongoose");

//connect to our tournament model
let jwt = require('jsonwebtoken');

let passport = require("passport");

// connect to our tournament Model
//let Tournament = require("../models/tournament");

let listsController = require("../controllers/tournament");

// helper function for guard purposes
function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* GET Route for the Business List page - READ Operation */
router.get("/", listsController.displayTournamentList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get("/add", requireAuth, listsController.addPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post("/add", requireAuth, listsController.addProcessPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get("/edit/:id", requireAuth, listsController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post("/edit/:id", requireAuth, listsController.processingEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get("/delete/:id", requireAuth, listsController.deletePage);

module.exports = router;
