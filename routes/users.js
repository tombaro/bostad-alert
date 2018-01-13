var express = require('express');
var xray = require('x-ray');
var router = express.Router();



/* GET users listing. */
router.get('/', function (req, res, next) {
  

  res.render('respond with a resource');
});

module.exports = router;
