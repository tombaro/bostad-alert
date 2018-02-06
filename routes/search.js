var express = require('express');
var router = express.Router();

var searchController = require('../controllers/searchController');

/* GET search listings. */
// router.get('/', searchController.index);
router.get('/create', searchController.searchCreate);
router.get('/', searchController.searchList);

module.exports = router;
