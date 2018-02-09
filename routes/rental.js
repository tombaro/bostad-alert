var express = require('express');
var router = express.Router();

var rentalController = require('../controllers/rentalController');

/* GET rentals. */
// router.get('/', rentalController.index);
router.get('/create', rentalController.rentalCreate);
router.get('/', rentalController.rentalList);

module.exports = router;
