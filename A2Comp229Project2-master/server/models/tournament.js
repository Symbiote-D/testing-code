/*<!--Name: Deshaun Jordan
Student Id: 300921366
Course: COMP_229 web dev sec 401
Instructor: Thiago Castilho 
Assignment: A2
*/  

let mongoose = require('mongoose');
//create a model class

let tournamentsModel = mongoose.Schema({
    name: String,
    number: Number,
    emailaddress: String
},
{//mongoDB collection name
    collection: "tournament"
});

module.exports = mongoose.model('Tournament', tournamentsModel)