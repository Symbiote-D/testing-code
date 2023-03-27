/*<!--Name: Deshaun Jordan
Student Id: 300921366
Course: COMP_229 web dev sec 401
Instructor: Thiago Castilho 
Assignment: A2
*/  

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
