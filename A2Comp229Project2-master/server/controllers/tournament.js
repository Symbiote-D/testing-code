/*<!--Name: Deshaun Jordan
Student Id: 300921366
Course: COMP_229 web dev sec 401
Instructor: Thiago Castilho 
Assignment: A2
*/  

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let jwt = require('jsonwebtoken');

//create reference to the model (dbschema )
let TournamentList = require("../models/tournament");
const { name } = require("ejs");

module.exports.displayTournamentList = (req, res, next) => {
  TournamentList.find((err, tournamentList) => {
    if (err) {
      return console.error(err);
    } else {
      //console.log(listsList);
      tournamentList.sort(x=>x.name);
      res.render("tournament/list", { title: "Business Tournaments List", TournamentList: tournamentList,
      displayName: req.user ? req.user.displayName : ''});
    }
  });
};

//add page
module.exports.addPage = (req, res, next) => {
  res.render("tournament/add", {
    title: "Add tournament",
    displayName: req.user ? req.user.displayName : "",
  });
};

//add page
module.exports.addProcessPage = (req, res, next) => {
  let newTournament = TournamentList({
    "name": req.body.name,
    "number": req.body.number,
    "emailaddress": req.body.emailaddress,
  });
  TournamentList.create(newTournament, (err, TournamentList) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the lists list
      res.redirect("/tournament-list");
    }
  });
};

//get edit page
module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id; 

  TournamentList.findById(id, (err, listToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("tournament/edit", { title: "Edit List", TournamentList: listToEdit, 
      displayName: req.user ? req.user.displayName : ''});
    }
  });
};

//edit page
module.exports.processingEditPage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updateLists = TournamentList({
    "_id": id,
    "name": req.body.name,
    "number": req.body.number,
    "emailaddress": req.body.emailaddress,
  });
  TournamentList.updateOne({ _id: id }, updateLists, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the lists list
      res.redirect("/tournament-list");
    }
  });
};

//delete page
module.exports.deletePage = (req, res, next) => {
  let id = req.params.id;
  
  TournamentList.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh lists list
      res.redirect("/tournament-list");
    }
  });
};
