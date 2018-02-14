var express = require('express');
var router = express.Router();

var searchController = require('../controllers/searchController');

/* GET search listings. */
// router.get('/', searchController.index);
router.get('/create', searchController.searchCreateForm);
router.post('/create', searchController.searchCreate);
router.get('/', searchController.searchList);
router.get('/:id', searchController.searchDetail);

module.exports = router;
