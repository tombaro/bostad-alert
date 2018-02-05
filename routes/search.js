var express = require('express');
var router = express.Router();

var searchController = require('../controllers/searchController');

/* GET users listing. */
// router.get('/', searchController.index);
router.get('/create', searchController.searchCreate);
router.get('/', searchController.searchList);

module.exports = router;
